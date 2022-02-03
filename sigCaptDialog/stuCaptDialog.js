/**
 * Capture dialog using a STU device.
 **/
class StuCaptDialog {
	
    constructor(config) {
		this.config = config;		
		
		if (this.config.encrypt == undefined) {
		    this.config.encrypt = true;	
		}
		
		if (this.config.sizeMode == undefined) {
			this.config.sizeMode = "stu";
		}
	    
		this.mPenData = Array();
		this.onClearListeners = new Array();
	    this.onCancelListeners = new Array();
	    this.onOkListeners = new Array();
	}
	 
	
    /**
     * Connect to the first STU device found, and open the capture dialog.
	 * @param {string} - Name of the person who is going to sign.
	 * @param {string} - Reason for signing.
	 * @param {IntegrityType} - Hash method to maintain the signature integrity. None by default.
	 * @param {Hash} - Hash of an attached document. None by default.
     **/	 
    async open(sigObj, who, why, extraData, integrityType, documentHash) {	
	    this.sigObj = sigObj;
	
	    if (who) {
	        this.who = who;
		} else {
			this.who = 'Customer';
		}
		
		if (why) {
		    this.why = why;
		} else {
			this.why = 'Confirmed';
		}
		
		this.extraData = extraData;
		
	    if (integrityType) {
			this.integrityType = integrityType;
		} else {
			this.integrityType = Module.KeyType.None;
		}
		
		if (documentHash) {
			this.documentHash = documentHash;
		} else {
			this.documentHash = new Module.Hash(Module.HashType.None);	
		}
		
	    if (!this.currentDevice) {
	        let devices = await com.WacomGSS.STU.UsbDevice.requestDevices();
	        if (devices.length > 0) {
		        this.currentDevice = devices[0];		
	        } else {
		        throw "No STU devices found";
	        }
	    }
	
	    this.mTablet = new com.WacomGSS.STU.Tablet();		
		this.mTablet.addTabletHandler(this);
		
		if (this.config.encrypt) {
			this.mTablet.setEncryptionHandler(new MyEncryptionHandler());
	        this.mTablet.setEncryptionHandler2(new MyEncryptionHandler2());
		}
				
	    await this.mTablet.usbConnect(this.currentDevice);	
	    this.mCapability = await this.mTablet.getCapability();
	    this.mInformation = await this.mTablet.getInformation();
	    this.mInkThreshold = await this.mTablet.getInkThreshold();
	  
	    try {
		    await this.mTablet.setPenDataOptionMode(com.WacomGSS.STU.Protocol.PenDataOptionMode.TimeCountSequence);	
	    } catch (e) {
	    }
				    
		
        let canvasWidth = 0;
		let canvasHeight = 0;
		
		if ((this.config.sizeMode == "fixed") && (this.config.width) && (this.config.height)) {
			// fixed takes the values from the parameters
			canvasWidth = parseInt(this.config.width);
			canvasHeight = parseInt(this.config.height);
		} else if (this.config.attachTo) {
			const parentWidth = $("#"+this.config.attachTo).width();
			const parentHeight = $("#"+this.config.attachTo).height();
			
			const pixelWidth = (96*this.mCapability.tabletMaxX*0.01)/25.4;
	        const pixelHeight = (96*this.mCapability.tabletMaxY*0.01)/25.4;		  
			
		    if (this.config.sizeMode == "fit") {
				canvasWidth = parentWidth;
				canvasHeight = parentHeight;
			} else if (this.config.sizeMode == "strech") {
				if (pixelWidth > pixelHeight) {				
				    canvasWidth = parentWidth;
				    canvasHeight = (pixelHeight/pixelWidth) * canvasWidth;									
			    } else {
				    canvasHeight = parentHeight;
				    canvasWidth = (pixelWidth/pixelHeight)*canvasHeight;
				}
			} else {
				// asume stu dimensions
			    canvasWidth = pixelWidth;
                canvasHeight = pixelHeight;				
			}
        } else {
			// stu mode takes the size from the STU device
			canvasWidth = (96*this.mCapability.tabletMaxX*0.01)/25.4;
	        canvasHeight = (96*this.mCapability.tabletMaxY*0.01)/25.4;		  
		} 		        
			
	    this.mScaleX = canvasWidth / this.mCapability.tabletMaxX;
	    this.mScaleY = canvasHeight / this.mCapability.tabletMaxY;
						
		let useColor = true;				
	    let encodingFlag = com.WacomGSS.STU.Protocol.ProtocolHelper.simulateEncodingFlag(this.mTablet.getProductId(), this.mCapability.ecodingFlag);
	    // Disable color if the bulk driver isn't installed (supportsWrite())
	    if ((encodingFlag & com.WacomGSS.STU.Protocol.EncodingFlag.EncodingFlag_24bit) != 0) {
	        this.mEncodingMode = this.mTablet.supportsWrite() ? com.WacomGSS.STU.Protocol.EncodingMode.EncodingMode_24bit_Bulk : com.WacomGSS.STU.Protocol.EncodingMode.EncodingMode_24bit; 
	    } else if ((encodingFlag & com.WacomGSS.STU.Protocol.EncodingFlag.EncodingFlag_16bit) != 0) {
	        this.mEncodingMode = this.mTablet.supportsWrite() ? com.WacomGSS.STU.Protocol.EncodingMode.EncodingMode_16bit_Bulk : com.WacomGSS.STU.Protocol.EncodingMode.EncodingMode_16bit; 
	    } else {
	        // assumes 1bit is available
	        this.mEncodingMode = com.WacomGSS.STU.Protocol.EncodingMode.EncodingMode_1bit; 
			useColor = false;
	    }
		
		this.config.width = canvasWidth;
		this.config.height = canvasHeight;
		this.config.title = this.mInformation.modelName;
		this.config.borderColor = "#cccccc";
		this.config.source = {mouse:false, touch:false, pen:false, stu:true},
		this.sigCaptDialog = new SigCaptDialog(this.config);		
		this.sigCaptDialog.addEventListener("clear", this.onClearBtn.bind(this));
		this.sigCaptDialog.addEventListener("cancel", this.onCancelBtn.bind(this));
		this.sigCaptDialog.addEventListener("ok", this.onOkBtn.bind(this));
		
		await this.sigCaptDialog.open(this.sigObj, this.who, this.why, this.extraData, this.integrityType, this.documentHash);
						
		//store the background image in order to be reuse it when clear the screen
		let canvas = await this.drawImageToCanvas(this.sigCaptDialog.createScreenImage(useColor));
		let ctx = canvas.getContext("2d");						
		this.mDeviceBackgroundImage = com.WacomGSS.STU.Protocol.ProtocolHelper.resizeAndFlatten(canvas, 0, 0, canvasWidth, canvasHeight, 
	                                                                               this.mCapability.screenWidth, this.mCapability.screenHeight, this.mEncodingMode, com.WacomGSS.STU.Protocol.ProtocolHelper.Scale.Stretch, "white", false, false);																						
		// Initialize the screen
		await this.clearScreen();			
		
		if (this.config.encrypt) {
			if ((this.mTablet.isSupported(com.WacomGSS.STU.Protocol.ReportId.EncryptionStatus)) ||
	           (await com.WacomGSS.STU.Protocol.ProtocolHelper.supportsEncryption(this.mTablet.getProtocol()))) {						   
				await this.mTablet.startCapture(0xc0ffee);
                this.mIsEncrypted = true;
			}
		}

	    // Enable the pen data on the screen (if not already)
	    await this.mTablet.setInkingMode(com.WacomGSS.STU.Protocol.InkingMode.On);	  	  
    }
	
	/**
     * Add an event listener
     * @param {string} eventType - The type of the listener, can be "clear", "cancel" or "ok".
     * @param {function} listener - The function that will handle the event
     **/
    addEventListener(eventType, listener) {
	    switch (eventType) {
		    case "clear"  : this.onClearListeners.push(listener);  break;
		    case "cancel" : this.onCancelListeners.push(listener); break;
		    case "ok"     : this.onOkListeners.push(listener);     break;
	    }
    }
	
	async clearScreen() {	    
        this.sigCaptDialog.stopCapture();
		//await this.mTablet.setClearScreen();
	    await this.mTablet.writeImage(this.mEncodingMode, this.mDeviceBackgroundImage);		
	    this.sigCaptDialog.startCapture();
    }
	
	async disconnect() {	 
        // Ensure that you correctly disconnect from the tablet, otherwise you are 
        // likely to get errors when wanting to connect a second time.
        if (this.mTablet != null) {
	        if (this.mIsEncrypted) {
	            await this.mTablet.endCapture();
		        this.mIsEncrypted = false;
	        }		
		
	        await this.mTablet.setInkingMode(com.WacomGSS.STU.Protocol.InkingMode.Off);
	        await this.mTablet.setClearScreen();
	        await this.mTablet.disconnect();
        }	
    }
	
	tabletToScreen(penData) {
        // Screen means LCD screen of the tablet.
        return new Point(penData.x * this.mScaleX, penData.y * this.mScaleY);
    }
	
	clear() {
		if (this.sigCaptDialog) {
		    this.sigCaptDialog.clear();
		}
	}
	
	cancel() {
		if (this.sigCaptDialog) {
		    this.sigCaptDialog.cancel();
		}
	}
	
	accept() {
		if (this.sigCaptDialog) {
		    this.sigCaptDialog.accept();
		}
	}
	
	onClearBtn() {
		if (this.mPenData.length > 0) {
		    this.mPenData = new Array();
		    this.clearScreen();
		}
	}

    onCancelBtn() {
		this.disconnect();
	}		
	
	onOkBtn() {
		if (this.mPenData.length > 0) {
		    this.getCaptureData();
		    this.disconnect();
			this.onOkListeners.forEach(listener => listener());
		}
	}
	
	onPenDataOption(penData, time) {	
	    this.onPenData(penData, time);
    }
  
    onPenDataTimeCountSequence(penData, time) {
	    this.onPenData(penData, time);
    }
  
    onPenDataTimeCountSequenceEncrypted(penData, time) {
	    this.onPenDataTimeCountSequence(penData, time);
    }
  
    onPenDataEncryptedOption(penData, time) {
        this.onPenData(penData.penData1, time);
        this.onPenData(penData.penData2, time);	
    }

    onPenDataEncrypted(penData, time) {
        this.onPenData(penData.penData1, time);
        this.onPenData(penData.penData2, time);	
    }

    onPenData(penData, time) {
        //console.log(JSON.stringify(penData));	
        if (!penData.timeCount) {
            penData.timeCount = Math.trunc(time)%1000000;
	    }
		
        const pt = this.tabletToScreen(penData);
		const btnIndex = this.sigCaptDialog.getButton(pt);
		
		const isDown = (penData.pressure > this.mInkThreshold.onPressureMark);
        if (!this.mIsDown) {
            if (isDown) {
                // transition to down we save the button pressed
				this.mBtnIndex = btnIndex;
                if (this.mBtnIndex == -1) {
                    // We have put the pen down outside a buttom.
                    // Treat it as part of the signature.
		            this.mPenData.push(penData);
		  
		            var downEvent = new PointerEvent("pointerdown", {
			                   pointerId: 1,
                               pointerType: "pen",							   
                               isPrimary: true,
							   clientX: pt.x,
							   clientY: pt.y,
							   pressure: penData.pressure/this.mCapability.tabletMaxPressure
                             });
							 
					const point = InkBuilder.createPoint(downEvent);
                    point.timestamp = penData.timeCount;		 
					this.sigCaptDialog.draw("begin", point);		 							 
                }
            } else {
		        // hover point
		        this.mPenData.push(penData);	
	        }
        } else {
	        if (!isDown) {
                // transition to up
				if (this.mBtnIndex > -1) {
					if (btnIndex == this.mBtnIndex) {
						// The pen is over the same button that was pressed
						this.sigCaptDialog.clickButton(this.mBtnIndex);
					}
				} else {
				    var upEvent = new PointerEvent("pointerup", {
			                   pointerId: 1,
                               pointerType: "pen",							   
                               isPrimary: true,
							   clientX: pt.x,
							   clientY: pt.y,
							   pressure: penData.pressure/this.mCapability.tabletMaxPressure
                             });
							                    						
                    const point = InkBuilder.createPoint(upEvent);
                    point.timestamp = penData.timeCount;		 
					this.sigCaptDialog.draw("end", point);		 							 																		
					this.mPenData.push(penData);	
				}					
            } else {
				// continue inking
				var moveEvent = new PointerEvent("pointermove", {
			                   pointerId: 1,
                               pointerType: "pen",							   
                               isPrimary: true,
							   clientX: pt.x,
							   clientY: pt.y,
							   pressure: penData.pressure/this.mCapability.tabletMaxPressure,
                             });
							 
				const point = InkBuilder.createPoint(moveEvent);
                point.timestamp = penData.timeCount;		 
				this.sigCaptDialog.draw("move", point);		 
				this.mPenData.push(penData);	
			}
        }
		this.mIsDown = isDown;
    }
	
	/**
	 * Generate the signature from the raw data.
	 **/
    async getCaptureData() {
	    //Create Stroke Data
        let strokeVector = new Module.StrokeVector();
        let currentStroke = new Module.PointVector();

        let currentStrokeID = 0;
        let isDown = true;
	    let hasDown = false;

        for (let index = 0; index < this.mPenData.length; index++) {
		    if (this.mPenData[index].sw == 0 && !hasDown) {
				// the signature starts with the first pen down, so the hover
				// points before first down are ingnored.
			    continue;
		    }
		
		    hasDown = true;
		
            if ((isDown && this.mPenData[index].sw == 0) || (!isDown && this.mPenData[index].sw == 1)) {			
                isDown = (this.mPenData[index].sw == 1);
				
		        //Move the current stroke data into the strokes array
                strokeVector.push_back({'points': currentStroke});
                currentStroke.delete();
                currentStroke = new Module.PointVector();
                currentStrokeID++;		
            }		
        
            var point = {
                'x': this.mPenData[index].x,
                'y': this.mPenData[index].y,
                'p': this.mPenData[index].pressure,
                't': this.mPenData[index].timeCount,
			    'tilt': 0, // STU has no tilt
			    'twist': 0,	// STU has no twist		
                'is_down': this.mPenData[index].sw,
                'stroke_id': currentStrokeID
            };
		
            currentStroke.push_back(point);			
        }		
	
	    //Create capture area character
        var device = {
            'device_max_X': this.mCapability.tabletMaxX,
            'device_max_Y': this.mCapability.tabletMaxY,
            'device_max_P': this.mCapability.tabletMaxPressure,
            'device_pixels_per_m_x': 100000, 
		    'device_pixels_per_m_y': 100000,
            'device_origin_X': 0,
            'device_origin_Y': 1,
		    'has_tilt': false,
		    'has_twist': false
        }	
	
	    var uid2;
	    try {
            // getUid2 will throw if pad doesn't support Uid2
            uid2 = mTablet.getUid2();
        }
        catch (e) {
        }
	
	    if (!uid2) {
		    uid2 = 0;
	    }

        var digitizerInfo = "STU;'"+this.mInformation.modelName+"';"+this.mInformation.firmwareMajorVersion+"."+((parseInt(this.mInformation.firmwareMinorVersion) >> 4) & 0x0f)+"."+(parseInt(this.mInformation.firmwareMinorVersion) & 0x0f)+";"+uid2;
        var nicInfo = "";
        var timeResolution = 1000;
        var who = this.who;
        var why = this.why;
	    var where = "";
	
        await this.sigObj.generateSignature(who, why, where, this.integrityType, this.documentHash, strokeVector, device, digitizerInfo, nicInfo, timeResolution);
	
        //this.hash.delete();
        strokeVector.delete();
        currentStroke.delete();	
    }
	
	drawImageToCanvas(src){
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => {
				let canvas = document.createElement("canvas");	
                canvas.height = img.height;
                canvas.width = img.width;	
				let ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				resolve(canvas);
			}
            img.onerror = reject;
            img.src = src;
        })
    }
	
}

