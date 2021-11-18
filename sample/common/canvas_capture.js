let CanvasCapture = function(sigObj) {	
	this.sigObj = sigObj;
	this.strokeVector = new Module.StrokeVector();
    this.currentStroke = new Module.PointVector();
    this.currentStrokeID = 0;
	
	this.Button = function() {
        this.bounds;
        this.text;
        this.click;
    }
	
	this.Rectangle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.Contains = function (x, y) {
            if (((x >= this.x) && (x <= (this.x + this.width))) &&
                ((y >= this.y) && (y <= (this.y + this.height)))) {
                return true;
            } else {
                return false;
            }
        }
    }
	
	this.mBtns = new Array(3);
	this.mBtns[0] = new this.Button();
	this.mBtns[1] = new this.Button();
	this.mBtns[2] = new this.Button();
	
	this.startCapture = async function(width, height) {
		this.width = width;
		this.height = height;
		this.createModalWindow(width, height);	 
		await this.initInkController();
	}
	
	this.createModalWindow = function(width, height) {
        this.mModalBackground = document.createElement('div');
        this.mModalBackground.id = "modal-background";
        this.mModalBackground.className = "active";
        this.mModalBackground.style.width = window.innerWidth;
        this.mModalBackground.style.height = window.innerHeight;
        document.getElementsByTagName('body')[0].appendChild(this.mModalBackground);
		
		let titleBarHeight = 25;
	    let margin = 2;
	    this.mSignatureWindow = document.createElement('div');
	    this.mSignatureWindow.id = "signatureWindow";
	    this.mSignatureWindow.style.position = "absolute";
	    this.mSignatureWindow.style.backgroundColor = "#0097d4";	
	    this.mSignatureWindow.style.top = (window.innerHeight / 2) - (height / 2) + "px";
        this.mSignatureWindow.style.left = (window.innerWidth / 2) - (width / 2) + "px";
        this.mSignatureWindow.style.width = (width + margin + margin) + "px";
        this.mSignatureWindow.style.height = (height+titleBarHeight + margin + margin) + "px";
        document.getElementsByTagName('body')[0].appendChild(this.mSignatureWindow);
		
		this.mTitleBar = document.createElement("div");
	    this.mTitleBar.id = "titleBar";
	    this.mTitleBar.style.width = "100%";
        this.mTitleBar.style.height = (titleBarHeight-5)+"px";
	    this.mTitleBar.innerHTML = "Generic canvas capture";
	    this.mSignatureWindow.appendChild(this.mTitleBar);

        this.mFormDiv = document.createElement('div');
	    this.mFormDiv.style.position = "absolute";
	    this.mFormDiv.style.margin = "2px 2px 2px 2px";
        this.mFormDiv.style.top = titleBarHeight;//(window.innerHeight / 2) - (height / 2) + "px";
        this.mFormDiv.style.width = width + "px";
        this.mFormDiv.style.height = height + "px";
        this.mSignatureWindow.appendChild(this.mFormDiv);

        this.canvas = document.createElement("canvas");	
		this.canvas.style.position = "absolute";
        this.canvas.height = this.mFormDiv.offsetHeight;
        this.canvas.width = this.mFormDiv.offsetWidth;	
	    this.ctx = this.canvas.getContext("2d");
        this.mFormDiv.appendChild(this.canvas);
		
        this.willCanvas = document.createElement("canvas");
		this.willCanvas.id = "willCanvas";
	    this.willCanvas.style.position = "absolute";
	    this.willCanvas.style.top = this.canvas.style.top;
	    this.willCanvas.style.left = this.canvas.style.left;
        this.willCanvas.height = this.canvas.height;
        this.willCanvas.width = this.canvas.width;
        this.mFormDiv.appendChild(this.willCanvas);      
	
        this.willCanvas.addEventListener("click", this.onCanvasClick.bind(this), false);
		
		
		// Place the buttons across the bottom of the screen.
		const w2 = this.canvas.width / 3;
		const w3 = this.canvas.width / 3;
		const w1 = this.canvas.width - w2 - w3;
		const y = this.canvas.height * 6 / 7;
		const h = this.canvas.height - y;

        this.mBtns[0].Bounds = new Rectangle(0, y, w1, h);
		this.mBtns[1].Bounds = new Rectangle(w1, y, w2, h);
		this.mBtns[2].Bounds = new Rectangle(w1 + w2, y, w3, h);	
		
		this.mBtns[0].Text = "Clear";
	    this.mBtns[0].Click = this.btnClearClick.bind(this);
	    this.mBtns[1].Text = "Cancel";
	    this.mBtns[1].Click = this.btnCancelClick.bind(this);			
	    this.mBtns[2].Text = "OK";
	    this.mBtns[2].Click = this.btnOkClick.bind(this);
						
	    // This application uses the same bitmap for both the screen and client (window).
	    this.ctx.lineWidth = 1;
	    this.ctx.strokeStyle = 'black';
	    this.ctx.font = "30px Arial";
			
	    this.ctx.fillStyle = "white";
	    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		let btnsColors = ["white", "white", "white"];
		this.createScreenImage(btnsColors, "black", null);	  	

        $("#signatureWindow").draggable({handle:"#titleBar"});		
    }
	
	this.createScreenImage = function(btnColors, txtColor, btnOrder) {	  	
	    let ctx = this.canvas.getContext("2d");
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = 'black';
	    ctx.font = "30px Arial";
			
	    ctx.fillStyle = "white";
	    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	  
	    // Draw the buttons
	    for (let i = 0; i < this.mBtns.length; ++i) {		  
	        // Button objects are created in the order, left-to-right, Clear / Cancel / OK
            // If reordering for Signature Mode (btnOrder != null), use bounds of another button when drawing
            // for image to be sent to tablet.
	        let btn = this.mBtns[i];
	        let bounds = btnOrder != null ? this.mBtns[btnOrder[i]].Bounds : this.mBtns[i].Bounds;
		  
	        ctx.fillStyle = btnColors[i];
		    ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
		  
	        ctx.fillStyle = txtColor;
	        ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
		  
	        let xPos = bounds.x + ((bounds.width / 2) - (ctx.measureText(btn.Text).width / 2));
				
	        let metrics = ctx.measureText(btn.Text);
	        let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
	        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
				
	        let yOffset = bounds.height - ((bounds.height / 2) - (actualHeight / 2));
	        ctx.fillText(btn.Text, xPos, bounds.y + yOffset);
	    }	  
	
	    ctx.stroke();
    }
	
	this.clearScreen = function() {	
	    window.WILL.clear();
	}	
	
	this.initInkController = async function() {
	    const inkColor = "#0000ff";
	    let inkCanvas = await new InkCanvasRaster(this.willCanvas, this.willCanvas.width, this.willCanvas.height);
	    await BrushPalette.configure(inkCanvas.canvas.ctx);
		
	    window.WILL = inkCanvas;
	    WILL.setColor(Color.fromHex(inkColor));
	    WILL.type = "raster";
	    await WILL.setTool("pen");
		
		this.willCanvas.addEventListener("pointerdown", onDown.bind(this), false);
	    this.willCanvas.addEventListener("pointermove", onMove.bind(this), false);
	    this.willCanvas.addEventListener("pointerup", onUp.bind(this), false);
    }
  
    this.deleteInkCanvas = async function() {
	  await BrushPalette.delete();
	  await window.WILL.delete();
	  window.WILL = null;
	  
	  this.strokeVector.delete();
      this.currentStroke.delete();
	  
	  if (this.renderSignature) {
		  this.renderSignature = false;
		  renderSignature();	  
	  }
    }
  
    this.onCanvasClick = function(event) {
      // Enable the mouse to click on the simulated buttons that we have displayed.

      // Note that this can add some tricky logic into processing pen data
      // if the pen was down at the time of this click, especially if the pen was logically
      // also 'pressing' a button! This demo however ignores any that.

      const posX = event.pageX - $("#willCanvas").offset().left;
      const posY = event.pageY - $("#willCanvas").offset().top;

      for (let i = 0; i < this.mBtns.length; i++) {
         if (this.mBtns[i].Bounds.Contains(new Point(posX, posY))) {
           this.mBtns[i].Click();
           break;
         }
      }
    }
  
    this.btnOkClick = function() {
      this.getCaptureData();	  
	  this.btnCancelClick();
    }
  
    this.btnClearClick = function() {
        this.clearScreen();
		this.strokeVector.delete();
        this.currentStroke.delete();
		this.strokeVector = new Module.StrokeVector();
        this.currentStroke = new Module.PointVector();		
		this.currentStrokeID = 0;
		$("#signatureWindow").draggable("enable");	
    }
  
    this.btnCancelClick = function() {	  
        this.closeModalWindow();		
    }
	
	this.closeModalWindow = function() {	
	    this.deleteInkCanvas();
        document.getElementsByTagName('body')[0].removeChild(this.mSignatureWindow);
	    const modalBackground = document.getElementById("modal-background");
	    if (modalBackground) {
            document.getElementsByTagName('body')[0].removeChild(modalBackground);	
		}

    }
	
	// Generate the signature image
    this.getCaptureData = async function() {
	    //Create capture area character
        var device = {
            'device_max_X': this.width,
            'device_max_Y': this.height,
            'device_max_P': 1,
            'device_pixels_per_m_x': Math.trunc(mmToPx(1000, true)),
		    'device_pixels_per_m_y': Math.trunc(mmToPx(1000, false)),
            'device_origin_X': 0,
            'device_origin_Y': 1,
			'has_tilt': true,
			'has_twist': true
        }	

        var digitzerInfo = "Javascript-Demo";
        var nicInfo = "";
        var timeResolution = 1000;
        var who = "Test user";
        var why = "test signature";
		var where = "";
		
		const hash = new Module.Hash(Module.HashType.None);	  
		
	    await this.sigObj.generateSignature(who,why, where, Module.KeyType.SHA512, hash, this.strokeVector,device,digitzerInfo,nicInfo,timeResolution, new Date());
		hash.delete();
	    this.renderSignature = true;		
    }  
  
  function onDown(event) {	  
      if ((this.inButton) || (this.currentEventType)) return; //to avoid multitouch
	  if (event.buttons != 1) return;
	  
	  if (document.getElementById("allow_mouse_check")) {
	      switch (event.pointerType) {
		      case "mouse" : if (!document.getElementById("allow_mouse_check").checked) return; break;
		      case "touch" : if (!document.getElementById("allow_touch_check").checked) return; break;
		      case "pen"   : if (!document.getElementById("allow_pen_check").checked) return; break;
	      }
	  } else {
	      if (event.pointerType != "pen") return;
	  }
	  
	  const posX = event.pageX - $("#willCanvas").offset().left;
      const posY = event.pageY - $("#willCanvas").offset().top;
      for (let i = 0; i < this.mBtns.length; i++) {
         if (this.mBtns[i].Bounds.Contains(new Point(posX, posY))) {
           this.inButton = true;
		   return;
         }
      }	  
	  	  
	  this.currentEventType = event.pointerType;	  	  
	  window.WILL.begin(InkBuilder.createPoint(event));
	  
	  var point = {
            'x': event.clientX,
            'y': event.clientY,
            'p': event.pressure ? event.pressure : 0.5, //note that with event.buttons != 1 we have rejected the pressure = 0 events.
            't': event.timeStamp,
			'tilt': event.tiltX,
			'twist': event.twist,
            'is_down': true,
            'stroke_id': this.currentStrokeID
      };

      this.currentStroke.push_back(point);
	  $("#signatureWindow").draggable("disable");	
  }
  
  function onMove(event) {
	  if (this.inButton) return;
	  if ((event.buttons != 1) || (event.pointerType != this.currentEventType)) return;
	  
	  if (document.getElementById("allow_mouse_check")) {
	      switch (event.pointerTpe) {
		      case "mouse" : if (!document.getElementById("allow_mouse_check").checked) return; break;
		      case "touch" : if (!document.getElementById("allow_touch_check").checked) return; break;
		      case "pen"   : if (!document.getElementById("allow_pen_check").checked) return; break;
	      }
	  } else {
	      if (event.pointerType != "pen") return;
	  }
	  
	  //console.log(event.pressure);
	  window.WILL.move(InkBuilder.createPoint(event));	  
	  
	  var point = {
            'x': event.clientX,
            'y': event.clientY,
            'p': event.pressure ? event.pressure : 0.5, //note that with event.buttons != 1 we have rejected the pressure = 0 events.
            't': event.timeStamp,
			'tilt': event.tiltX,
			'twist': event.twist,
            'is_down': true,
            'stroke_id': this.currentStrokeID
      };

      this.currentStroke.push_back(point);
  }
  
  function onUp(event) {
	  if (this.inButton) { this.inButton = false; return; }
	  if (event.pointerType != this.currentEventType) return;
	  
	  if (document.getElementById("allow_mouse_check")) {
	      switch (event.pointerTpe) {
		      case "mouse" : if (!document.getElementById("allow_mouse_check").checked) return; break;
		      case "touch" : if (!document.getElementById("allow_touch_check").checked) return; break;
		      case "pen"   : if (!document.getElementById("allow_pen_check").checked) return; break;
	      }
	  } else {
	      if (event.pointerType != "pen") return;
	  }
	  
	  window.WILL.end(InkBuilder.createPoint(event));
	  this.currentEventType = null;
	  
	  var point = {
            'x': event.clientX,
            'y': event.clientY,
            'p': 0, //note that with event.buttons != 1 we have rejected the pressure = 0 events.
            't': event.timeStamp,
			'tilt': event.tiltX,
			'twist': event.twist,
            'is_down': false,
            'stroke_id': this.currentStrokeID
      };

      this.currentStroke.push_back(point);
	  
	  //Move the current stroke data into the strokes array
      this.strokeVector.push_back({'points': this.currentStroke});
      this.currentStroke.delete();
      this.currentStroke = new Module.PointVector();
      this.currentStrokeID++;
  }
  
  function mmToPx(mm, isX){
	var dpr = window.devicePixelRatio;
    var inch = 25.4; //1inch = 25.4 mm
    var ppi = 96;	
    return ((mm/inch)*ppi)/dpr;
  }
  
}