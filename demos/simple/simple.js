var mSigObj;
var mHash;

Module.onRuntimeInitialized = _ => {		
    document.getElementById("version_txt").innerHTML = Module.VERSION;
    mSigObj = new Module.SigObj();	
	mHash = new Module.Hash(Module.HashType.SHA512);	  
	try {
	    //mSigObj.setLicence("PUT HERE YOUR LICENCE STRING");   
		mSigObj.setLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiMzNhYWUyODA0NmM0MmE5OTgyY2E1NTdkZjhmY2YxOCIsImV4cCI6MTcwODE3ODg3NCwiaWF0IjoxNjc2NjQyODg2LCJzZWF0cyI6MCwicmlnaHRzIjpbIkpTX0NPUkUiLCJTSUdfU0RLX0NPUkUiLCJTSUdfU0RLX0lTTyIsIlNJR19TREtfRU5DUlBZVElPTiJdLCJkZXZpY2VzIjpbIldBQ09NX0FOWSJdLCJ0eXBlIjoiZXZhbCIsImxpY19uYW1lIjoiTGljZW5zZSBmb3IgSmF2YXNjcmlwdCBEZW1vIiwid2Fjb21faWQiOiJiMzNhYWUyODA0NmM0MmE5OTgyY2E1NTdkZjhmY2YxOCIsImxpY191aWQiOiIyMWU0NDkwYi1jYjc0LTQ3YzItODUyMy1jZTEzNjNkOTBhOWIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.s6oKOEfEY2EaI8S8SRANq2NF001UAdf9qahYLRgsb7wbtHoPN4lHZpbpy5yypvNTS-NqQDHuVBtOhfge7jM6k8C000fq4DjqenhIbxJZ4aBJ9NHYUAdZv2nN3rlmeS-6eNS3rb00WHLzWv3Pl9TO53d08Ymr1_mx8Aymr5zEeiMrafiGe4rbx4S02l3O7PvXKBgVqMNxDSrfYBJ7yBDAYJHDmpzwpake-MhWZLYYy8BEJ0P3I1o4UxToQIYBLMlaqLAxTLiJdutHkB4bx1xbOJh8nFaJaTyYnkfo7bkTn9kj_W2kw8h_HhZu4A4eROqUXmnKHvNryrt-wHk5b6Ly-g");		
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
