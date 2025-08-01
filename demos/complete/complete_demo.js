import SigSDK from "../node_modules/@wacom/signature-sdk/signature-sdk.js"

class CompleteDemo {
	
  async initialize() {
    try {
      this.sigSDK = await new SigSDK();	
				
	  document.getElementById("version_txt").innerHTML = this.sigSDK.VERSION;								
	  this.sigObj = new this.sigSDK.SigObj();	
								                
	  // Here we need to set the licence. The easiest way is directly using
	  // const promise = mSigObj.setLicence(key, secret);
	  // however here the problem it is that we expose the key and secret publically.
	  // if we want to hide the licence we can get the licence from an external server.				
	  // there is a php demo file in /common/licence_proxy.php
      //await this.sigObj.setLicenceProxy("url from where to get the licence");					
	  await this.sigObj.setLicence("key", "secret");
	  if (this.sigSDK.STUDevice.isHIDSupported()) {
	    document.getElementById("capture_stu_btn").disabled = false;
	  }
				
	  document.getElementById("capture_canvas_btn").disabled = false;
	  document.getElementById("document").disabled = false;				
	  document.getElementById("load_signature").disabled = false;
	  document.getElementById("initializeBanground").style.display = "none";
	  this.setDeviceName();						
    } catch (e) {
      alert("Error initializing SigSDK "+e);
 	  document.getElementById("initializeBanground").style.display = "none";
    }
  }

  async generateConfig() {
    const config = new this.sigSDK.Config();
	
    //NOTE that all of these options are optional and they have default values.
    config.strokeSize = parseInt(document.getElementById("ink_width").value);
    config.strokeColor = document.getElementById("rendering_color_box").value;
    config.width = document.getElementById("dialog_width").value;
    config.height = document.getElementById("dialog_height").value;
    config.left = document.getElementById("dialog_left").value + "px";
    config.top = document.getElementById("dialog_top").value + "px";
    config.centered = document.getElementById("is_centered").checked;
    config.title = document.getElementById("title_text").value;
    config.borderColor = document.getElementById("border_color_box").value;
    config.borderWidth = document.getElementById("border_width_box").value;
    config.hasTitle = document.getElementById("has_title_check").checked;

    config.signatory.visible = document.getElementById("show_signatory_check").checked;
    config.signatory.fontFace = document.getElementById("signatory_font_type_text").value;
    config.signatory.fontSize = parseInt(document.getElementById("signatory_font_size_text").value);
    config.signatory.offsetX = parseInt(document.getElementById("signatory_offset_x_text").value);
    config.signatory.offsetY = parseInt(document.getElementById("signatory_offset_y_text").value);
    config.signatory.color =document.getElementById("signatory_color_box").value;

    config.reason.visible = document.getElementById("show_reason_check").checked;
    config.signatory.fontFace = document.getElementById("reason_font_type_text").value;
    config.signatory.fontSize = parseInt(document.getElementById("reason_font_size_text").value);
    config.signatory.offsetX = parseInt(document.getElementById("reason_offset_x_text").value);
    config.signatory.offsetY = parseInt(document.getElementById("reason_offset_y_text").value);
    config.signatory.color = document.getElementById("reason_color_box").value;
							
    config.date.visible = document.getElementById("show_date_check").checked;
    config.signatory.fontFace = document.getElementById("date_font_type_text").value;
    config.signatory.fontSize = parseInt(document.getElementById("date_font_size_text").value);
    config.signatory.offsetX = parseInt(document.getElementById("date_offset_x_text").value);
    config.signatory.offsetY = parseInt(document.getElementById("date_offset_y_text").value);
    config.signatory.color = document.getElementById("date_color_box").value;
						  
    config.signingLine.visible = document.getElementById("show_signing_line_check").checked;
    config.signatory.left = parseInt(document.getElementById("signing_line_left_text").value);
    config.signatory.right = parseInt(document.getElementById("signing_line_right_text").value);
    config.signatory.width = parseInt(document.getElementById("signing_line_width_text").value);
    config.signatory.offsetY = parseInt(document.getElementById("signing_line_offset_y_text").value);
    config.signatory.color = document.getElementById("signing_line_color_box").value;

    config.buttonsFont = document.getElementById("button_font_type").value;
    const fields = document.getElementById("button_list_div").getElementsByTagName("fieldset");
    for (var i=0; i<fields.length; i++) {
        const button = new this.sigSDK.Button();	
        button.text = fields[i].elements.namedItem("button_text").value;
        button.textColor = fields[i].elements.namedItem("button_text_color").value;
        button.backgroundColor = fields[i].elements.namedItem("button_background_color").value;
        button.borderColor = fields[i].elements.namedItem("button_border_color").value;
        button.borderWidth = fields[i].elements.namedItem("button_border_width").value;
        button.onClick = eval(fields[i].elements.namedItem("button_action").value);
        config.buttons.push_back(button);
    }

    if (!document.getElementById("shows_as_dialog").checked) {
        config.attachTo = "captureDiv";													    
    }							
				
    const comboSizeModes = document.getElementById("stu_fit_mode");
    switch (comboSizeModes.selectedIndex) {
        case 0: config.fitMode = this.sigSDK.FIT_MODE.FIXED; break;
        case 1: config.fitMode = this.sigSDK.FIT_MODE.FIT; break;
        case 2: config.fitMode = this.sigSDK.FIT_MODE.STRECH; break;
        case 3: config.fitMode = this.sigSDK.FIT_MODE.STU;
    }
				
    config.modal = document.getElementById("shows_modal").checked;
    config.draggable = document.getElementById("is_draggable").checked;
				
    const inkColor = document.getElementById("rendering_color_box").value;		
								
    config.background.color = document.getElementById("background_color_box").value;
    config.background.alpha = document.getElementById("background_opacity").value*0.01
									 
    const comboBackgroundMode = document.getElementById("background_image_mode");						 
    switch (comboBackgroundMode.selectedIndex) {
        case 0: config.background.mode = this.sigSDK.BackgroundImageMode.NONE; break;
        case 1: config.background.mode = this.sigSDK.BackgroundImageMode.FIT; break;
        case 2: config.background.mode = this.sigSDK.BackgroundImageMode.CENTER; break;
        case 3: config.background.mode = this.sigSDK.BackgroundImageMode.PATTERN; break;
    }
									 
    if ((document.getElementById("put_background_image").checked) && (this.backgroundImage)) {
        config.background.image = this.backgroundImage;
    }
				
    if (document.getElementById("enable_timeout").checked) {
        config.timeOut.enabled = true;
        config.timeOut.time = parseInt(document.getElementById("timeOutValue").value);
        config.timeOut.onTimeOut = timeOutCallback;
    }
				
    config.minTimeOnSurface = parseInt(document.getElementById("minTimeOnSurface").value);

    if (!document.getElementById("allowOutSide").checked) {
        const self = this;
        config.onOutSide = function() {
            alert("OutSide stroke is not allowed. Please sign again");
            self.clear();
            return true; // for stop capturing
        }
    }

    config.allowZeroPressure = document.getElementById("allowZeroPressure").checked;
	
	const [browserInfo, osInfo] = await this.getSystemInfo();
    config.digitizerInfo = browserInfo;
    config.osInfo = osInfo;

    return config;
  }		

  deleteConfig(config) {
    for (let i=0; i<config.buttons.size(); i++) {
      config.buttons.get(i).delete();
    }
    config.delete;
  }  
			
  capture = async function(source) {
    if (!document.getElementById("shows_as_dialog").checked) {
      const captureDiv = document.getElementById("captureDiv");													    
      captureDiv.style.width = document.getElementById("dialog_width").value+"px";
      captureDiv.style.height = document.getElementById("dialog_height").value+"px";
    }
			
    document.getElementById("signatureImage").style.display = "none";
    document.getElementById("captureDiv").style.display = "block"							 				

    document.getElementById("save_image_btn").disabled = true;
    document.getElementById("save_text_btn").disabled = true;
    document.getElementById("save_binary_btn").disabled = true;
    document.getElementById("save_iso_btn").disabled = true;
				
    if (source == "STU") {
        await this.captureFromSTU();
    } else {
        this.captureFromCanvas();
    }
  }
			
  async captureFromCanvas() {
    this.stuCapDialog = null;
	const config = await this.generateConfig();
	config.source.mouse = document.getElementById("allow_mouse_check").checked;
	config.source.touch = document.getElementById("allow_touch_check").checked;
	config.source.pen = document.getElementById("allow_pen_check").checked;
				
    this.sigCaptDialog = new this.sigSDK.SigCaptDialog(config);
	
	const outer = this;
	this.sigCaptDialog.addEventListener(this.sigSDK.EventType.OK, async function() {
      outer.deleteConfig(config);
      outer.encryptSignature();
      outer.renderSignature();
    });
	
	this.sigCaptDialog.addEventListener(this.sigSDK.EventType.CANCEL, async function() {
      outer.deleteConfig(config);
    });
	
    this.sigCaptDialog.open(this.sigObj, 
	  document.getElementById("who").value, 
	  document.getElementById("why").value, 
	  this.generateExtraData(), 
	  this.sigSDK.KeyType.SHA512, 
	  this.documentHash ? this.documentHash : null);
    this.sigCaptDialog.startCapture();				
  }
			
  async captureFromSTU() {
    this.stuReady = false;
    this.sigCaptDialog = null;
    const config = await this.generateConfig();    
    config.showWait = true;
    config.encryptSTU = document.getElementById("encrypt_stu").checked;

    const stuDeviceStr = localStorage.getItem("stuDevice");
    let stuDevice;
    if (!stuDeviceStr) {
      const devices = await this.sigSDK.STUDevice.requestDevices();
      if (devices.length > 0) {
        stuDevice = devices[0];                        					
        localStorage.setItem("stuDevice", 
          JSON.stringify({"vendorId":stuDevice.vendorId,
            "productName":stuDevice.productName,
            "productId":stuDevice.productId
          }));
        this.setDeviceName();
      } else {
        throw "No STU devices found";
      }	
    } else {
      const deviceSaved = JSON.parse(stuDeviceStr);
      // get all the devices that we have permissions to connect
      const allowedDevices = await this.sigSDK.STUDevice.getDevices();
      allowedDevices.some(device => {
        if (deviceSaved.vendorId === device.vendorId && deviceSaved.productId === device.productId && deviceSaved.productName === device.productName) {
          stuDevice = device;
          return true;
        }
        return false;
      })
    }

    const outer = this;
    this.stuDevice = new this.sigSDK.STUDevice(stuDevice);    
    this.stuCaptDialog = new this.sigSDK.StuCaptDialog(this.stuDevice, config);
    this.stuCaptDialog.addEventListener(this.sigSDK.EventType.OK, async function() {
      outer.deleteConfig(config);
      outer.encryptSignature();
      outer.renderSignature();
    });

    this.stuCaptDialog?.addEventListener(this.sigSDK.EventType.CLEAR, async function() {
      outer.stuReady = true;
    });

    this.stuCaptDialog?.addEventListener(this.sigSDK.EventType.CANCEL, async function() {
      outer.deleteConfig(config);
    });
    
	await this.stuCaptDialog.open(this.sigObj, 
	  document.getElementById("who").value, 
	  document.getElementById("why").value, 
	  this.generateExtraData(), 
	  this.sigSDK.KeyType.SHA512, 
	  this.documentHash ? this.documentHash : null);
	
    this.stuReady = true;	
  }
			
  setDeviceName() {
    const stuDeviceStr = localStorage.getItem("stuDevice");
    if (stuDeviceStr) {
        document.getElementById("selectedStuDevice").innerHTML = JSON.parse(stuDeviceStr).productName;
	} else {
        document.getElementById("selectedStuDevice").innerHTML = "None";
    }
  }
			
  removeDevice() {
    localStorage.removeItem("stuDevice");
    this.setDeviceName();
  }
			
  async clear() {
    if (this.sigCaptDialog) {
      this.sigCaptDialog.clear();
    }
				
    if (this.stuCaptDialog) {
      if (this.stuReady) {
        this.stuReady = false;
        await this.stuCaptDialog.clear();
      }
    }
  }
			
  async cancel() {
	if (this.sigCaptDialog) {
      this.sigCaptDialog.cancel();
	}
	
	if (this.stuCaptDialog && this.stuReady) {
	  await this.stuCaptDialog.cancel();
	}				
  }
			
  async accept() {
	if (this.sigCaptDialog) {
	  this.sigCaptDialog.accept();
    }
	
	if (this.stuCaptDialog && this.stuReady) {
	  await this.stuCaptDialog.accept();
	}
  }
			
  mmToPx(mm) {
    const dpr = window.devicePixelRatio;
    const inch = 25.4; //1inch = 25.4 mm
    const ppi = 96;	
    return ((mm/inch)*ppi)/dpr;
  }
			
  pxToMm(px) {
    const dpr = window.devicePixelRatio;
    const inch = 25.4; //1inch = 25.4 mm
    const ppi = 96;	
    return ((px*dpr)/ppi)*inch;
  }
			
  pxToInches(px) {
    return px/96;
  }
			
  async renderSignatureImage() {
    // calculate the size
	let renderWidth = parseInt(document.getElementById("render_width").value);
	let renderHeight = parseInt(document.getElementById("render_height").value);
	const isRelative = document.getElementById("is_relative").checked;
				
	let renderFlags = this.sigSDK.RenderFlags.RenderEncodeData.value;
	if (isRelative) {				
	  renderFlags |= this.sigSDK.RenderFlags.RenderRelative.value;
	  const sx = (96/25.4)*2;
	  renderWidth = Math.floor(mmToPx(this.sigObj.getWidth(true)/100) + sx);
      renderHeight = Math.floor(mmToPx(this.sigObj.getHeight(true)/100) + sx);
    } else {
      if (isNaN(renderWidth) || renderWidth <= 0) {
        if (isNaN(renderHeight) || renderHeight <= 0) {
          // it takes the original size							
          renderWidth = mmToPx(this.sigObj.getWidth(false)/100);
          renderHeight = mmToPx(this.sigObj.getHeight(false)/100);
        } else {
          // it takes the size proportional to the height
          const originalRenderWidth = mmToPx(this.sigObj.getWidth()/100);
          const originalRenderHeight = mmToPx(this.sigObj.getHeight()/100);
          renderWidth = (originalRenderWidth/originalRenderHeight)*renderHeight;
        }
      } else if (isNaN(renderHeight) || renderHeight <= 0) {
        // it takes the size proportinal to the width
        const originalRenderWidth = mmToPx(this.sigObj.getWidth()/100);
        const originalRenderHeight = mmToPx(this.sigObj.getHeight()/100);
        renderHeight = (originalRenderHeight/originalRenderWidth)*renderWidth;
      }
				
      renderWidth = Math.floor(renderWidth);
	  renderHeight = Math.floor(renderHeight);				
      renderWidth += renderWidth % 4;
    }															
				
	const backgroundColor = "transparent";// document.getElementById("background_color_box").value;
				
	if (isRelative) {
	  renderWidth = -96; //dpi
	  renderHeight = -96;
	}
				
	const inkColor = document.getElementById("rendering_color_box").value;
	const inkWidth = parseInt(document.getElementById("ink_width").value);
	const image = await this.sigObj.renderBitmap(renderWidth, renderHeight, "image/png", inkWidth, inkColor, backgroundColor, 0, 0, renderFlags);	
	return image;				
  }
				
  async renderSignature() {
    const image = await this.renderSignatureImage();
				
    document.getElementById("captureDiv").style.display = "none"							 
    document.getElementById("signatureImage").src = image;		
    document.getElementById("signatureImage").style.display = "block";
				
    document.getElementById("save_image_btn").disabled = false;
    document.getElementById("save_text_btn").disabled = false;
    document.getElementById("save_binary_btn").disabled = false;
    document.getElementById("save_iso_btn").disabled = false;
  }
			
  async saveSignature(format) {
    const newLink = document.createElement("a");			    
				
	if (format == "image") {
	  newLink.download = "signature.png";
	  newLink.href = document.getElementById("signatureImage").src;
	} else {
	  let blob;
	  if (format == "txt") {
        newLink.download = "signature.txt";
        blob = new Blob([await this.sigObj.getTextData(this.sigSDK.TextFormat.BASE64)], { type: "text/plain" });
	  } else if (format == "binary") {
        newLink.download = "signature.fss";
        blob = new Blob([await this.sigObj.getSigData()], { type: "application/octet-stream" });
      } else if (format == "iso") {
        let name;
        let isoType;
        switch (document.getElementById("iso_type").selectedIndex) {
          case 0: 
            if (this.sigObj.canEncrypt()) {
              alert("The selected type should be encrypted");
            } else {
              name = "signature_2007.iso";
              isoType = this.sigSDK.IsoType.ISO19794_7_2007_BINARY;
            }
            break;
          case 1:
            if (this.sigObj.canEncrypt()) {
              alert("XML ISO does not support encryption");
              return;
            } else {
              name = "signature.xml";
              isoType = this.sigSDK.IsoType.ISO19785_3_2015_XML;
            }
            break;
          case 2:
            if (!this.sigObj.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2007_encrypted_binary.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2007_ENCRYPTED_BINARY;
            }
            break;
          case 3:
            if (!this.sigObj.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2007_encrypted_text.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2007_ENCRYPTED_TEXT;
            }
            break;
          case 4: 
            if (this.sigObj.canEncrypt()) {
              alert("The selected type should be encrypted");
            } else {
              name = "signature_2014.iso";
              isoType = this.sigSDK.IsoType.ISO19794_7_2014_BINARY;
            }
            break;
          case 5:
            if (!this.sigObj.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2014_encrypted_binary.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2014_ENCRYPTED_BINARY;
            }
            break;
          case 6:
            if (!this.sigObj.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2014_encrypted_text.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2014_ENCRYPTED_TEXT;
            }
            break;
          case 7: 
            if (this.sigObj.canEncrypt()) {
              alert("The selected type should be encrypted");
            } else {
              name = "signature_2021.iso";
              isoType = this.sigSDK.IsoType.ISO19794_7_2021_BINARY;
            }
            break;
          case 8:
            if (!this.sigObj.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2021_encrypted_binary.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_BINARY;
            }
            break;
          case 9:
            if (!this.sigObj.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2021_encrypted_text.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_TEXT;
            }
            break;
		}
        if (name) {
		  newLink.download = name;
          blob = new Blob([await this.sigObj?.exportIso(isoType)], { type: "application/octet-stream" });
        } else {
          return;
        }
	  }
					
	  if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(blob);
      } else {
        newLink.href = window.URL.createObjectURL(blob);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
      }
    }
				
    newLink.click(); 
	newLink.remove();
  } 
		
  async addDocumentHash() {
    const outer = this;
    const reader = new FileReader();
    reader.onload = async function() {
      try {
        if (outer.documentHash) {
          outer.documentHash.delete();
        }
        outer.documentHash = new outer.sigSDK.Hash(outer.sigSDK.HashType.SHA512);	 
        const data = reader.result;
        const hashData = await crypto.subtle.digest("SHA-512", data);
        outer.documentHash?.setHash(hashData);
      } catch (e) {
        alert(e);
      }
    };  
    reader.readAsArrayBuffer(document.getElementById("document").files[0]);		
  }	

  async loadSignature() {
    const outer = this;
    try {
	  //reset encryption data
      await this.sigObj.setPublicKey("");
      await this.sigObj.setPrivateKey("");
      await this.sigObj.setEncryptionPassword("");
      await this.decryptSignature(this.sigObj);
	} catch (e) {
	  console.log(e);
	}
    const file = document.getElementById("load_signature").files[0];
    if (file) {				
	  // check the type	  
	  if (("text/plain" == file.type) || ("text/xml" == file.type)) {
	    // read the file as string
		const reader = new FileReader();        
        reader.onload = async function() {
          const data = reader.result;
		  //try {
			if ("text/plain" == file.type) {
			  if ((!await outer.sigObj.setTextData(data)) || (!await outer.readSignature(false))) {									    
			    // maybe ISO binary text encrypted
				try {
				  const ad = new outer.sigSDK.AdditionalImportIsoData();
		          ad.setWho("User imported from ISO");
		          ad.setWhy("Signature imported from ISO");
				  await outer.sigObj.importIso(data, outer.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_TEXT, ad);
				  outer.readSignature(true);
				} catch (e) {						
				  document.getElementById("load_signature").value = null;
				  alert(e);
				}
			  }
			} else {
			  //text/xml
		      const ad = new outer.sigSDK.AdditionalImportIsoData();
		      ad.setWho("User imported from XML ISO");
		      ad.setWhy("Signature imported from XML ISO");
									
			  const domParser = new DOMParser();
			  const xmlDocument = domParser.parseFromString(data, "text/xml");
			  const elements = xmlDocument.getElementsByTagName("CreationDate");
			  if (elements.length > 0) {
			    ad.setWhen(new Date(elements[0].innerHTML));
			  }
									
			  await outer.sigObj?.importIso(data, outer.sigSDK.IsoType.ISO19785_3_2015_XML, ad);
			  outer.readSignature(true);
			}					
		  //} catch (e) {
		    //alert.log(e);
		  //}
		}
        reader.readAsText(file);
	    } else if (file.type == "image/png") {			  
		  const reader = new FileReader();
          reader.onload = async function() {
            const data = reader.result;
		    var img = new Image();	     
		    img.addEventListener('load', async function() {
              //the image has been loaded
			  const canvas = document.createElement("canvas");
			  //canvas.width = img.width;
			  //canvas.height = img.height;
			  //const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
			  //ctx.drawImage(img, 0, 0, img.width, img.height);
			  //const imageData = ctx.getImageData(0, 0, img.width, img.height);
								
			  //Note: using the 2D context, the alpha channel uses premultiplication, so in case we are loading a image
			  //with alpha channel the biometric data embedded inside the image is destroyed, so we use
			  //webgl2 context instead that maintaing the RGBA colors without modification.
			  const gl = canvas.getContext("webgl2");
			  gl.activeTexture(gl.TEXTURE0);
              const texture = gl.createTexture();
              gl.bindTexture(gl.TEXTURE_2D, texture);
              const framebuffer = gl.createFramebuffer();
              gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
              gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
              gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
              const imageData = new Uint8Array(this.width * this.height * 4);
              gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
			  try {
			    //await outer.sigObj?.readEncodedBitmapBinary(imageData.data, imageData.width, imageData.height);
			    await outer.sigObj?.readEncodedBitmapBinary(imageData, img.width, img.height);
			    outer.readSignature(true);
			  } catch (e) {
			    document.getElementById("load_signature").value = null;
			    alert(e);
			  }			
            }, false);
		    img.src = data;  
          }
          reader.readAsDataURL(file);		
	    } else {
		  // we assume is binary data
		  const reader = new FileReader();
          reader.onload = async function() {
            const data = reader.result;            
			try {
			  if ((!await outer.sigObj.setSigData(new Uint8Array(data))) || (!await outer.readSignature(false))) {
			    // try with iso format
			    const ad = new outer.sigSDK.AdditionalImportIsoData();
		        ad.setWho("User imported from ISO");
		        ad.setWhy("Signature imported from ISO");
				//ad.setWhen(new Date());
				//ad.putExtraData("extra1", "test");
				//ad.putExtraData("extra2", "test2");				
				if (await outer.sigObj.importIso(new Uint8Array(data), outer.isEncryptedBinary(data) ? outer.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_BINARY : outer.sigSDK.IsoType.ISO19794_7_2021_BINARY, ad)) {
				  outer.readSignature(true);
				} else {
				  document.getElementById("load_signature").value = null;
				  alert("Incorrect signature data found");
				  outer.emptyLoadData();
				}
		 	  }
			} catch (e) {
			  try {
			    const ad = new outer.sigSDK.AdditionalImportIsoData();
		        ad.setWho("User imported from ISO");
		        ad.setWhy("Signature imported from ISO");
				await outer.sigObj.importIso(data, outer.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_TEXT, ad);
				outer.readSignature(true);	  
			  } catch (e1) {				  				
			    document.getElementById("load_signature").value = null;
			    alert(e1);
			    outer.emptyLoadData();
			  }
			}
		  }
          reader.readAsArrayBuffer(file);		
	    }
	  }
	}
  
  emptyLoadData() {
	document.getElementById("load_who").innerHTML = "";
	document.getElementById("load_why").innerHTML = "";
	document.getElementById("load_when").innerHTML = "";
	document.getElementById("load_extra_data").innerHTML = "";
				
	document.getElementById("load_digitizer_type").innerHTML = "";
	document.getElementById("load_digitizer_driver").innerHTML = "";
	document.getElementById("load_operating_system").innerHTML = "";
	document.getElementById("load_network_interface_card").innerHTML = "";
	document.getElementById("load_licence").innerHTML = "";
				
	document.getElementById("load_integrity").innerHTML = "";
				
	document.getElementById("document_load").disabled = true;				
	document.getElementById("signatureImage_loaded").style.display = "none";	
    document.getElementById("signatureimage_loaded_background").style.display = "block";				
  }
			
  async readSignature(showError) {
    try {
	  const image = await this.renderSignatureImage();
				
	  document.getElementById("load_who").innerHTML = this.sigObj.getWho();
	  document.getElementById("load_why").innerHTML = this.sigObj.getWhy();
      let when = this.sigObj.getWhen();
 	  document.getElementById("load_when").innerHTML = "The signature was captured on "+when;
	  document.getElementById("load_extra_data").innerHTML = this.sigObj.getExtraData("");
				
      document.getElementById("load_digitizer_type").innerHTML = this.sigObj.getAdditionalData(this.sigSDK.CaptureData.Digitizer);
	  document.getElementById("load_digitizer_driver").innerHTML = this.sigObj.getAdditionalData(this.sigSDK.CaptureData.Digitizer_Driver);
      document.getElementById("load_operating_system").innerHTML = this.sigObj.getAdditionalData(this.sigSDK.CaptureData.Machine_OS);
      document.getElementById("load_network_interface_card").innerHTML = this.sigObj.getAdditionalData(this.sigSDK.CaptureData.Network_Card);
      document.getElementById("load_licence").innerHTML = this.sigObj.getLicence();				
								
      const types = [this.sigSDK.KeyType.MD5, 
				     this.sigSDK.KeyType.SHA1, 
					 this.sigSDK.KeyType.SHA224, 
					 this.sigSDK.KeyType.SHA256, 
					 this.sigSDK.KeyType.SHA384, 
					 this.sigSDK.KeyType.SHA512];
				
      for (let i=0; i<types.length; i++) {
	    try {				
		  let status = await this.sigObj.checkIntegrity(types[i]);
		  if (status == this.sigSDK.IntegrityStatus.OK) {
		    document.getElementById("load_integrity").innerHTML = '<span style="color:green">The signature integrity is correct.</span>';
		    break;
		  } else if (status == this.sigSDK.IntegrityStatus.MISSING) {
		    document.getElementById("load_integrity").innerHTML = '<span style="color:black">No Integrity data found.</span>';
		    break;
		  } else if (status != this.sigSDK.IntegrityStatus.WRONG_TYPE) {
		    document.getElementById("load_integrity").innerHTML = '<span style="color:red">'+this.integrityStatusDesc(status)+'</span>';	
		    break;
		  }                        
		} catch (e) {				   
		}
      }		

      document.getElementById("document_load").disabled = false;		
								
      document.getElementById("signatureImage_loaded").src = image;		
      document.getElementById("signatureImage_loaded").style.display = "block";	
      document.getElementById("signatureimage_loaded_background").style.display = "none";				
    } catch (e) {
	  document.getElementById("load_signature").value = null;
	  if (showError) {
	    alert(e);
	  }
	  return false;
	}
				
	return true;
  }
			
  checkDocumentHash() {
	const outer = this;
    const reader = new FileReader();
    reader.onload = async function() {                    
	  try {
		const data = reader.result;   
						
		const types = [outer.sigSDK.KeyType.MD5, 
				       outer.sigSDK.KeyType.SHA1, 
					   outer.sigSDK.KeyType.SHA224, 
					   outer.sigSDK.KeyType.SHA256, 
					   outer.sigSDK.KeyType.SHA384, 
					   outer.sigSDK.KeyType.SHA512];
						
		for (let i=0; i<types.length; i++) {
		  const hashType = types[i];
	      let documentHash = new outer.sigSDK.Hash(hashType);	  
	      if (await documentHash.add(data)) {
			const status = await outer.sigObj.checkSignedData(documentHash);		  							
			if (status !=  outer.sigSDK.DataStatus.BAD_TYPE) {
		 	  documentHash.delete();						
			  alert(outer.dataStatusDesc(status));
			  break;
			}
	      } else {
		    alert("Failed to load file");
		    break;
	      }   
          documentHash.delete();						
		}						                       
	  } catch (e) {
	    alert(e);
	  }
	}
    reader.readAsArrayBuffer(document.getElementById("document_load").files[0]);					    
  }
			
  loadBackgroundImage() {
	const outer = this;
    const file = document.getElementById("background_image").files[0];
	if (file) {
	  const reader = new FileReader();
      reader.onload = async function() {
        const data = reader.result;
		outer.backgroundImage = new Image();	     
	    outer.backgroundImage.src = data;  
	  }
      reader.readAsDataURL(file);										    
	}
  }
			
  removeButton(button) {
    document.getElementById(button).remove();
  }
			
  addButton = function() {
    const newDiv = document.createElement("div");				
	const btnDiv = "btn_div_"+new Date().getTime();
	let content = '<fieldset id="'+btnDiv+'"><p>'+
	  '<label for="button_text">Button Text:</label>'+
	  '<input type="text" name="button_text"></p>'+	
	  '<p><label for="button_action">Action:</label>'+
	  '<input type="text" name="button_action"></p>'+
	  '<p><label for="button_text_color">Text color:</label>'+
	  '<input type="color" name="button_text_color" value="#000000"></p>'+
	  '<p><label for="button_background_color">Background color:</label>'+
	  '<input type="color" name="button_background_color" value="#e7e7e7"></p>'+
	  '<p><label for="button_border_with">Border width:</label>'+
	  '<input type="text" name="button_border_width" value="1"></p>'+
	  '<p><label for="button_border_color">Border color:</label>'+
	  '<input type="color" name="button_border_color" value="#cccccc"></p>'+							  
      '<p><button onClick="removeButton(\''+btnDiv+'\')">Remove</button></p>'+									
	  '</fieldset>';
				
	newDiv.innerHTML = content;				
	document.getElementById("button_list_div").appendChild(newDiv);				
  }
			
  addExtraData = function() {
    const newDiv = document.createElement("div");				
	const extraDiv = "extra_data_div_"+new Date().getTime();
	let content = '<fieldset id="'+extraDiv+'">'+
	  '<label for="extra_name_text">Name:</label>'+
	  '<input type="text" name="extra_name">'+	
	  '<br><br><label for="extra_value">Value:</label>'+
	  '<input type="text" name="extra_value">'+
      '<br><br>'+
      '<button onClick="removeExtraData(\''+extraDiv+'\')">Remove</button>'+									
	  '</fieldset>';
				
    newDiv.innerHTML = content;				
	document.getElementById("extra_data_list_div").appendChild(newDiv);				
  }
			
  removeExtraData = function(extraData) {
    document.getElementById(extraData).remove();
  }
			
  generateExtraData() {
    const extraData = new this.sigSDK.ExtraData();				
    const list = document.getElementById("extra_data_list_div");
    const fields = list.getElementsByTagName("fieldset");
    for (var i=0; i<fields.length; i++) {
      extraData.set(fields[i].elements.namedItem("extra_name").value,
	                fields[i].elements.namedItem("extra_value").value);								   
    }

    return extraData;
  }
						
  async encryptSignature() {
    try {
	  if (document.getElementById("no_encryption").checked) {
		await this.sigObj.setPublicKey("");
		await this.sigObj.setPrivateKey("");
	  } else {
 	    if (document.getElementById("symmetric_encryption").checked) {
		  await this.sigObj.setEncryptionPassword(document.getElementById("symmetric_password").value);												
		} else if (document.getElementById("asymmetric_encryption").checked) {
		  const pubKey = document.getElementById("public_key").value;
          if (pubKey !== "") {								
			await this.sigObj.setPublicKey(pubKey);								
		  }
		}
						
		if (!this.sigObj.canEncrypt()) {
		  alert("The signature cannot be encrypted");
		}
	  }
	} catch (e) {
	  alert(e);
	}
  }	

  async decryptSignature(signature) {
    try {
	  if (document.getElementById("symmetric_encryption").checked) {
	    await signature.setEncryptionPassword(document.getElementById("symmetric_password").value);												
	  } else if (document.getElementById("asymmetric_encryption").checked) {
	    const privKey = document.getElementById("private_key").value;
	    if (privKey !== "") {		
          const privKeyPassword = document.getElementById("private_key_password").value;
		  if (privKeyPassword !== "") {
		    // add the password to the end of the key
		    privKey += ","+privKeyPassword;
		  }
		  await signature.setPrivateKey(privKey);								
		}
	  }
	} catch (e) {
	  alert(e);
	}
  }

  timeOutCallback(timeOnSurface) {
    const minTimeOnSurface = parseInt(document.getElementById("minTimeOnSurface").value);
    if (minTimeOnSurface < timeOnSurface) {
	  const actionCombo = document.getElementById("dataTimeOut");
	  if (actionCombo.options[actionCombo.selectedIndex].value == "accept") {
		accept();
	  } else {
	    cancel();
	  }
	} else {
	  const actionCombo = document.getElementById("emptyTimeOut");
	  if (actionCombo.options[actionCombo.selectedIndex].value == "accept") {
	    accept();
	  } else {
	    cancel();
	  }				
	}
  }
  
  integrityStatusDesc(status) {
	  switch (status) {
		  case this.sigSDK.IntegrityStatus.OK: return "Integrity correct";
		  case this.sigSDK.IntegrityStatus.FAIL: return "Signature tampered";
		  case this.sigSDK.IntegrityStatus.MISSING: return "The signature has no integrity data";
		  case this.sigSDK.IntegrityStatus.WRONG_TYPE: return "The type of the key is incorrect, please try with another type";
		  case this.sigSDK.IntegrityStatus.INSUFFICIENT_DATA: return "Insufficient data";
		  case this.sigSDK.IntegrityStatus.UNCERTAIN: return "The integrity is uncertain";
		  default: return "The integrity type is not supported in this version of Signature SDK";
	  }
  }

  dataStatusDesc(status) {
	  switch (status) {
	    case this.sigSDK.DataStatus.GOOD: return "Signed data correct";
	    case this.sigSDK.DataStatus.NO_HASH: return "The signature has not attached any data";
	    case this.sigSDK.DataStatus.BAD_TYPE: return "The type of the hash is incorrect, please try with another type";
		  case this.sigSDK.DataStatus.BAD_HASH: return "The hash of the document is different from the provided";
		  case this.sigSDK.DataStatus.ERROR: return "Unknown error";
		  case this.sigSDK.DataStatus.UNCERTAIN: return "The data is uncertain";
		  default: return "The signature has been moved";
	  }
  }

  isEncryptedBinary(data) {
    var string = new TextDecoder().decode(data);
	  return (string.startsWith("wgssAES_") || string.startsWith("wgssRSA_"));
  }  
  
  async getSystemInfo() {
    let browserInfo = "";
    let osInfo = "";
    //Along with the signature we are going to include the Operative System and Web Browser
    //in where the signature has been captured. However this is sensible information that 
    //most web browsers does not allow to obtain. First of all we are going to try to get the data
    //using the new experimental User-Agent Client Hints API, only available on certains web browsers.
	const navigatorUAData = window.navigator.userAgentData;
    if (navigatorUAData) {
      const values = await navigatorUAData.getHighEntropyValues(["platformVersion"]);
	  const brandList = ['chrome', 'opera', 'safari', 'edge', 'firefox'];
		
	  let found = false;
	  for (const agentBrand of values.brands) {
	    const agentBrandEntry = agentBrand.brand.toLowerCase();
	    const foundBrand = brandList.find(brand => agentBrandEntry.includes(brand));

		if (foundBrand) {
          browserInfo = agentBrand.brand + " " + agentBrand.version;
		  found = true;
          break
        }
	  }
		
	  if (!found) {
	    browserInfo = values.brands[0].brand + " " + values.brands[0].version;
	  }		
		  
	  osInfo = values.platform + " " + values.platformVersion;
    } else {
	  browserInfo = navigator.userAgent;
      osInfo = "Unkwon OS";	  
    }

    return [browserInfo, osInfo];
  }
		
}

var completeDemo = new CompleteDemo();
completeDemo.initialize();

window.capture = function(source) {
  completeDemo.capture(source);
}

window.removeDevice = function() {
  completeDemo.removeDevice();
}
			
window.clear = function() {
  completeDemo.clear();
}

window.cancel = function() {
  completeDemo.cancel();
}

window.accept = function() {
  completeDemo.accept();
}

window.timeOutCallback = function(timeOnSurface) {
  completeDemo.timeOutCallback(timeOnSurface);
}

window.addDocumentHash = async function() {
  completeDemo.addDocumentHash();
}

window.saveSignature = async function(format) {
  completeDemo.saveSignature(format);	
}

window.loadSignature = async function() {
  completeDemo.loadSignature();	
}

window.checkDocumentHash = async function() {
  completeDemo.checkDocumentHash();
}

window.loadBackgroundImage = function() {
  completeDemo.loadBackgroundImage();
}

window.removeButton = function(button) {
  completeDemo.removeButton(button);
}
			
window.addButton = function() {
  completeDemo.addButton();
}
			
window.addExtraData = function() {
  completeDemo.addExtraData();
}
			
window.removeExtraData = function(extraData) {
  completeDemo.removeExtraData(extraData);
}