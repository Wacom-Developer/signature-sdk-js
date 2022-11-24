var mSigObj;
var mHash;

Module.onRuntimeInitialized = _ => {		
    document.getElementById("version_txt").innerHTML = Module.VERSION;
    mSigObj = new Module.SigObj();	
	mHash = new Module.Hash(Module.HashType.SHA512);	  
	try {
	    //mSigObj.setLicence("PUT HERE YOUR LICENCE STRING");   
		mSigObj.setLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MTY3NzI4MzE5OSwiaWF0IjoxNjY5MzAyMTM3LCJzZWF0cyI6MCwicmlnaHRzIjpbIlNJR19TREtfQ09SRSIsIkpTX0NPUkUiXSwiZGV2aWNlcyI6WyJXQUNPTV9BTlkiXSwidHlwZSI6ImV2YWwiLCJsaWNfbmFtZSI6IkphdmFzY3JpcHQgU2lnbmF0dXJlIFNESyAzLW1vbnRoIEV2YWx1YXRpb24gbGljZW5zZSBmb3IgR2l0aHViIiwid2Fjb21faWQiOiIxNTNiZTg5Zi05NjM3LTRhYjQtOTk5OS05NGUwYzhlMGQyYTMiLCJsaWNfdWlkIjoiYWM2MmZlMzktZTEzZC00MWQ3LWFiZmUtYjA4NTdlZGNhZmYwIiwiYXBwc193aW5kb3dzIjpbXSwiYXBwc19pb3MiOltdLCJhcHBzX2FuZHJvaWQiOltdLCJtYWNoaW5lX2lkcyI6W119.RBR877JAPY1YLdZSC8bIZl0wU4ZyBiuC41kuVmdJaQh4xBWnChgg_bs2OdZXfS_YPDa7t4ppwsjPLo-q__Di35TFWHdkXQ-ewbTYjEK8znr0q-LrrxfJ4SFnJVqkUc-iSW_OavYBRl_v9S-56JU1GZ36km0ya2xibA855xrLHlFBqNFlEsF9pV6NYx_90okFRIL0q-imDjbr4gYcg0pZ6gdAZZ__VIGhwZB59ET3h-vwf19VcgQ9WjtezqmXAa0Pe-lAgw-VdLW6a2Hhk2-p4QY5RRfMLVYBxFviLv_UOeVcnQapnZ7nLtJXg5bxvwdYjy6Zb2fYv8lkDj-hAhzA_Q");		
        document.getElementById("myfile").disabled=false;
		
		if (navigator.hid) {
		    document.getElementById("capture_stu_device").disabled=false;
		}
		document.getElementById("canvas_capture_btn").disabled=false;	
	} catch (e) {
		alert(e);
	}
}

async function loadFromFile() {
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
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height);
			const imageData = ctx.getImageData(0, 0, img.width, img.height);
			try {
				await mSigObj.readEncodedBitmapBinary(imageData.data, imageData.width, imageData.height);
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
		const inkTool = {
			brush: BrushPalette.circle,
			dynamics: {
				size: {
					value: {
						min: 0.5,
						max: 1.6,
						remap: v => ValueTransformer.sigmoid(v, 0.62)
					},
					velocity: {
						min: 5,
						max: 210
					}
				},
				rotation: {
					dependencies: [window.DigitalInk.SensorChannel.Type.ROTATION, window.DigitalInk.SensorChannel.Type.AZIMUTH]
				},
				scaleX: {
					dependencies: [window.DigitalInk.SensorChannel.Type.RADIUS_X, window.DigitalInk.SensorChannel.Type.ALTITUDE],
					value: {
						min: 1,
						max: 3
					}
				},
				scaleY: {
					dependencies: [window.DigitalInk.SensorChannel.Type.RADIUS_Y],
					value: {
						min: 1,
						max: 3
					}
				},
				offsetX: {
					dependencies: [window.DigitalInk.SensorChannel.Type.ALTITUDE],

					value: {
						min: 2,
						max: 5
					}
				}
			}
		};
		const image = await mSigObj.renderBitmap(renderWidth, renderHeight, "image/png", inkTool, inkColor, "white", 0, 0, 0x400000);					
	    document.getElementById("sig_image").src = image;	
        document.getElementById("sig_text").value = await mSigObj.getTextData(Module.TextFormat.BASE64);	
	} catch (e) {
		alert(e);
	}				
}

function captureFromCanvas() {	
    const config = {};
	config.source = {mouse:document.getElementById("allow_mouse_check").checked,
				     touch:document.getElementById("allow_touch_check").checked, 
					 pen:document.getElementById("allow_pen_check").checked};
					 
	const sigCaptDialog = new SigCaptDialog(config);
	
	sigCaptDialog.addEventListener("ok", function() {
	    renderSignature();
	});
	
	sigCaptDialog.open(mSigObj, null, null, null, Module.KeyType.SHA512, mHash);
	sigCaptDialog.startCapture();			
}

function captureFromSTU() {
    const stuCapDialog = new StuCaptDialog();
	stuCapDialog.addEventListener("ok", function() {
	    renderSignature();
	});				
	stuCapDialog.open(mSigObj, null, null, null, Module.KeyType.SHA512, mHash);					
}
