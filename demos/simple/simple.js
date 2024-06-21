import SigSDK from "javascript-signature-sdk";
import SigCaptDialog from "../../sigCaptDialog/sigCaptDialog.js"
import StuCaptDialog from "../../sigCaptDialog/stuCaptDialog.js"

let sigSDK
let mSigObj;		
let backgroundImage;
let sigCaptDialog
let stuCapDialog;

try {
	sigSDK = await new SigSDK();
	
	document.getElementById("version_txt").innerHTML = sigSDK.VERSION;								
	mSigObj = new sigSDK.SigObj();		
				
	// Here we need to set the licence. The easiest way is directly using
	// const promise = mSigObj.setLicence(key, secret);
	// however here the problem it is that we expose the key and secret publically.
	// if we want to hide the licence we can get the licence from an external server.				
	// there is a php demo file in /common/licence_proxy.php
    //const promise = mSigObj.setLicenceProxy("url from where to get the licence");
	const promise = mSigObj.setLicence("key", "secret");
	promise.then(value => {
	    if (value) {
	        if (navigator.hid) {				
		        document.getElementById("capture_stu_device").disabled = false;
		    }
				
		    document.getElementById("canvas_capture_btn").disabled = false;
		    document.getElementById("initializeBanground").style.display = "none";
			document.getElementById("myfile").disabled=false;
	    }
	});
	promise.catch(error => {
		alert(error);
		document.getElementById("initializeBanground").style.display = "none";
	});
} catch (e) {
	alert("Error initializing SigSDK "+e);
 	document.getElementById("initializeBanground").style.display = "none";
}

window.loadFromFile = async function() {
	const file = document.getElementById("myfile").files[0];
	if (file) {
	  // check the type	  
	  if ("text/plain" == file.type) {
		  // read the file as string
		  const reader = new FileReader();
          reader.onload = async function() {
            const data = reader.result;
			try {
				if (await mSigObj.setTextData(data)) {
					renderSignature();
				} else {
					alert("Incorrect signature data found");
				}
			} catch (e) {
				alert("Error loading signature as text "+e);
			}
		  }
          reader.readAsText(file);		
	  } else if ((file.type == "image/png") ||
                (file.type == "image/jpeg")) {			  
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
				await mSigObj.readEncodedBitmapBinary(imageData, img.width, img.height);
				renderSignature();
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
				if (await mSigObj.setSigData(new Uint8Array(data))) {
					renderSignature();
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
	
async function renderSignature() {
	//pixels = dpi*mm/25.4mm
	let width = Math.trunc((96*mSigObj.getWidth(false)*0.01)/25.4);
	let height = Math.trunc((96*mSigObj.getHeight(false)*0.01)/25.4);
	
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
		const image = await mSigObj.renderBitmap(renderWidth, renderHeight, "image/png", 4, inkColor, "white", 0, 0, 0x400000);					
	    document.getElementById("sig_image").src = image;	
        document.getElementById("sig_text").value = await mSigObj.getTextData(sigSDK.TextFormat.BASE64);	
	} catch (e) {
		alert(e);
	}				
}

window.captureFromCanvas = function() {	
    const config = {};
	config.source = {mouse:document.getElementById("allow_mouse_check").checked,
				     touch:document.getElementById("allow_touch_check").checked, 
					 pen:document.getElementById("allow_pen_check").checked};
					 
	const sigCaptDialog = new SigCaptDialog(sigSDK, config);
	
	sigCaptDialog.addEventListener("ok", function() {
	    renderSignature();
	});
	
	sigCaptDialog.open(mSigObj, null, null, null, sigSDK.KeyType.SHA512, null);
	sigCaptDialog.startCapture();			
}

window.captureFromSTU = function() {
    const stuCapDialog = new StuCaptDialog(sigSDK);
	stuCapDialog.addEventListener("ok", function() {
	    renderSignature();
	});				
	stuCapDialog.open(mSigObj, null, null, null, sigSDK.KeyType.SHA512, null);					
}