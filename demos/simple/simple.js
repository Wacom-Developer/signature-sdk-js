import SigSDK from "../node_modules/@wacom/signature-sdk/signature-sdk.js"

class SimpleDemo {
	
  async initialize() {
    try {
	  this.sigSDK = await new SigSDK();
	
	  document.getElementById("version_txt").innerHTML = this.sigSDK.VERSION;								
	  this.sigObj = new this.sigSDK.SigObj();		
				
	  await this.sigObj.setLicence("key", "secret");	
	  if (this.sigSDK.STUDevice.isHIDSupported()) {				
        document.getElementById("capture_stu_device").disabled = false;
      }
				
      document.getElementById("canvas_capture_btn").disabled = false;
      document.getElementById("initializeBanground").style.display = "none";
      document.getElementById("myfile").disabled=false;
    } catch (e) {
      alert("Error initializing SigSDK "+e);
      document.getElementById("initializeBanground").style.display = "none";
	}
  }

  async loadFromFile() {
	const outer = this;
	const file = document.getElementById("myfile").files[0];
	if (file) {
	  // check the type	  
	  if ("text/plain" == file.type) {
		  // read the file as string
		  const reader = new FileReader();
          reader.onload = async function() {
            const data = reader.result;
			try {
				if (await outer.sigObj.setTextData(data)) {
					outer.renderSignature();
				} else {
					alert("Incorrect signature data found");
				}
			} catch (e) {
				alert("Error loading signature as text "+e);
			}
		  }
          reader.readAsText(file);		
	  } else if (file.type == "image/png")  {			  
		const reader = new FileReader();
        reader.onload = async function() {
          const data = reader.result;
		  var img = new Image();	     
		  img.addEventListener('load', async function() {
             //the image has been loaded
			const canvas = document.createElement("canvas");
			//canvas.width = img.width;
			//canvas.height = img.height;
			//const ctx = canvas.getContext("2d");
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
				await outer.sigObj.readEncodedBitmapBinary(imageData, img.width, img.height);
				outer.renderSignature();
			} catch (e) {
				alert("Error loading image "+e);
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
				if (await outer.sigObj.setSigData(new Uint8Array(data))) {
					outer.renderSignature();
				} else {
					alert("Incorrect signature data found");
				}
			} catch (e) {
				alert("Error loading signature as binary "+e);
			}
		  }
          reader.readAsArrayBuffer(file);		
	  }
	}
  }
	
  async renderSignature() {
	//pixels = dpi*mm/25.4mm
	let width = Math.trunc((96*this.sigObj.getWidth(false)*0.01)/25.4);
	let height = Math.trunc((96*this.sigObj.getHeight(false)*0.01)/25.4);
	
	let scaleWidth = 300/width;
	let scaleHeight = 200/height;
	let scale = Math.min(scaleWidth, scaleHeight);
				
	let renderWidth = Math.trunc(width * scale);
	const renderHeight = Math.trunc(height * scale);
	
	// render with must be multiple of 4
	if (renderWidth % 4 != 0) {
		renderWidth+= renderWidth % 4;
	}
	
	let canvas;
	const inkColor = "#000F55";
	try {		
	  const image = await this.sigObj.renderBitmap(renderWidth, renderHeight, "image/png", 4, inkColor, "white", 0, 0, this.sigSDK.RenderFlags.RenderEncodeData.value);					
	  document.getElementById("sig_image").src = image;	
      document.getElementById("sig_text").value = await this.sigObj.getTextData(this.sigSDK.TextFormat.BASE64);	
	} catch (e) {
	  alert(e);
    }				
  }

  async captureFromCanvas() {	
    const config = new this.sigSDK.Config();
	config.source.mouse = document.getElementById("allow_mouse_check").checked;
	config.source.touch = document.getElementById("allow_touch_check").checked;
	config.source.pen = document.getElementById("allow_pen_check").checked;
					 
	this.sigCaptDialog = new this.sigSDK.SigCaptDialog(config);
	
	const outer = this;
	this.sigCaptDialog.addEventListener(this.sigSDK.EventType.OK, async function() {
      outer.deleteConfig(config);      
      outer.renderSignature();
    });
	
	this.sigCaptDialog.addEventListener(this.sigSDK.EventType.CANCEL, async function() {
      outer.deleteConfig(config);
    });
	
    this.sigCaptDialog.open(this.sigObj, 
	  "", "", null, 
	  this.sigSDK.KeyType.SHA512, 
	  null);
    this.sigCaptDialog.startCapture();					
  }

  async captureFromSTU() {
    const config = new this.sigSDK.Config();

    const devices = await this.sigSDK.STUDevice.requestDevices();
    if (devices.length > 0) {      
      this.stuDevice = new this.sigSDK.STUDevice(devices[0]);
      this.stuCaptDialog = new this.sigSDK.StuCaptDialog(this.stuDevice, config);
	  
	  const outer = this;
      this.stuCaptDialog.addEventListener(this.sigSDK.EventType.OK, async function() {
        outer.deleteConfig(config);      
        outer.renderSignature();
		outer.stuDevice.delete();
      });

      this.stuCaptDialog.addEventListener(this.sigSDK.EventType.CANCEL, async function() {
        outer.deleteConfig(config);
		outer.stuDevice.delete();
      });
    
	  await this.stuCaptDialog.open(this.sigObj, 
	    "", "", null,
	    this.sigSDK.KeyType.SHA512, 
	    null);	
	}
  }

  deleteConfig(config) {
    for (let i=0; i<config.buttons.size(); i++) {
      config.buttons.get(i).delete();
    }
    config.delete;
  }
}

var simpleDemo = new SimpleDemo();
simpleDemo.initialize();

window.loadFromFile = async function() {
	simpleDemo.loadFromFile();
}
	
window.captureFromCanvas = function() {	
  simpleDemo.captureFromCanvas();
}
	
window.captureFromSTU = function() {
  simpleDemo.captureFromSTU();
}