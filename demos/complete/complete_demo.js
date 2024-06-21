import SigSDK from "javascript-signature-sdk"
import SigSDKHelper from "../common/signature_sdk_helper.js"
import SigCaptDialog from "../../sigCaptDialog/sigCaptDialog.js"
import StuCaptDialog from "../../sigCaptDialog/stuCaptDialog.js"
import { MyEncryptionHandler, MyEncryptionHandler2} from "../../sigCaptDialog/stu_capture/stu_capture_encryption.js"
import com from "../../sigCaptDialog/stu_capture/stu-sdk.min.js"

            let sigSDK
			let mSigObj;		
            let documentHash;
			let backgroundImage;
			let sigCaptDialog
			let stuCapDialog;
			let sigSDKHelper;
			
			// This var will store the public and private keys for encryption.
			// Please note that this is only a demostration, but on a production application
			// for security reasons the private key should not be stored in a global variable.
			let encryptionKeys;

            //to remove 300 ms wait for second tap on touch screen			
			if ('addEventListener' in document) {
	            document.addEventListener('DOMContentLoaded', function() {
				    const captureBtn = document.getElementById("capture_canvas_btn");
				    captureBtn.addEventListener("touchend", function(e) {event.preventDefault(); captureBtn.click(); return false;}, false);		
	            }, false);
			}
						
			try {
			    sigSDK = await new SigSDK();
				sigSDKHelper = new SigSDKHelper(sigSDK);
				
				document.getElementById("version_txt").innerHTML = sigSDK.VERSION;								
			    documentHash = new sigSDK.Hash(sigSDK.HashType.None);
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
			                document.getElementById("capture_stu_btn").disabled = false;
			            }
				
			            document.getElementById("capture_canvas_btn").disabled = false;
			            document.getElementById("document").disabled = false;				
			            document.getElementById("load_signature").disabled = false;
					    document.getElementById("initializeBanground").style.display = "none";
					    setDeviceName();						
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

            function generateConfig() {
			    const config = {};
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
				
				config.signatory = {visible:document.getElementById("show_signatory_check").checked,
				                    fontFace:document.getElementById("signatory_font_type_text").value,
									fontSize:parseInt(document.getElementById("signatory_font_size_text").value),
									offsetX:parseInt(document.getElementById("signatory_offset_x_text").value),
									offsetY:parseInt(document.getElementById("signatory_offset_y_text").value),
									color:document.getElementById("signatory_color_box").value
								   };
								   
				config.reason = {visible:document.getElementById("show_reason_check").checked,
				                 fontFace:document.getElementById("reason_font_type_text").value,
								 fontSize:parseInt(document.getElementById("reason_font_size_text").value),
								 offsetX:parseInt(document.getElementById("reason_offset_x_text").value),
								 offsetY:parseInt(document.getElementById("reason_offset_y_text").value),
								 color:document.getElementById("reason_color_box").value
								};				   
								
				config.date = {visible:document.getElementById("show_date_check").checked,
				               fontFace:document.getElementById("date_font_type_text").value,
							   fontSize:parseInt(document.getElementById("date_font_size_text").value),
							   offsetX:parseInt(document.getElementById("date_offset_x_text").value),
							   offsetY:parseInt(document.getElementById("date_offset_y_text").value),
							   color:document.getElementById("date_color_box").value
							  };				   				
							  
				config.signingLine = {visible:document.getElementById("show_signing_line_check").checked,
				                      left:parseInt(document.getElementById("signing_line_left_text").value),
							          right:parseInt(document.getElementById("signing_line_right_text").value),
							          width:parseInt(document.getElementById("signing_line_width_text").value),
							          offsetY:parseInt(document.getElementById("signing_line_offset_y_text").value),
							          color:document.getElementById("signing_line_color_box").value
							  };				   							  
				
				config.buttonsFont = document.getElementById("button_font_type").value;
				config.buttons = [];				
				const fields = document.getElementById("button_list_div").getElementsByTagName("fieldset");
				for (var i=0; i<fields.length; i++) {
				    config.buttons.push({text:fields[i].elements.namedItem("button_text").value, 
					                     textColor:fields[i].elements.namedItem("button_text_color").value, 
										 backgroundColor:fields[i].elements.namedItem("button_background_color").value, 
										 borderColor:fields[i].elements.namedItem("button_border_color").value, 
										 borderWidth:parseInt(fields[i].elements.namedItem("button_border_width").value),
										 onClick:eval(fields[i].elements.namedItem("button_action").value)});
				}
				
				if (!document.getElementById("shows_as_dialog").checked) {
				    config.attachTo = "captureDiv";													    
				}							
				
				const comboSizeModes = document.getElementById("stu_fit_mode");
				config.sizeMode = comboSizeModes.options[comboSizeModes.selectedIndex].value;
				
				config.modal = document.getElementById("shows_modal").checked;
				config.draggable = document.getElementById("is_draggable").checked;
				
				const comboTools = document.getElementById("inking_tool");	
				const inkColor = document.getElementById("rendering_color_box").value;				
				const comboBackgroundMode = document.getElementById("background_image_mode");	
				config.background = {color:document.getElementById("background_color_box").value, 
				                     alpha:document.getElementById("background_opacity").value*0.01,
									 mode:comboBackgroundMode.options[comboBackgroundMode.selectedIndex].value};
									 
	            if ((document.getElementById("put_background_image").checked) && (backgroundImage)) {
				    config.background.image = backgroundImage;
				}
				
				if (document.getElementById("enable_timeout").checked) {
				    config.timeOut = {enabled:true};
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
				
				return config;
            }			
			
			window.capture = async function(source) {
			    if (!document.getElementById("shows_as_dialog").checked) {
				    let captureDiv = document.getElementById("captureDiv");													    
					captureDiv.style.width = document.getElementById("dialog_width").value+"px";
					captureDiv.style.height = document.getElementById("dialog_height").value+"px";
				}
			
			    document.getElementById("signatureImage").style.display = "none";
			    document.getElementById("captureDiv").style.display = "block"							 				
				
				document.getElementById("save_image_btn").disabled = true;
				document.getElementById("save_text_btn").disabled = true;
				document.getElementById("save_binary_btn").disabled = true;
				document.getElementById("save_iso_binary_btn").disabled = true;
                document.getElementById("save_iso_xml_btn").disabled = true;
				
			    if (source == "STU") {
				    await captureFromSTU();
				} else {
				    captureFromCanvas();
				}
			}
			
			function captureFromCanvas() {
			    stuCapDialog = null;
			    const config = generateConfig();
				config.source = {mouse:document.getElementById("allow_mouse_check").checked,
				                 touch:document.getElementById("allow_touch_check").checked, 
						 		 pen:document.getElementById("allow_pen_check").checked}
				sigCaptDialog = new SigCaptDialog(sigSDK, config);
                sigCaptDialog.addEventListener("ok", function() {
				    encryptSignature();
				    renderSignature();
				});		
				
				sigCaptDialog.open(mSigObj, document.getElementById("who").value, document.getElementById("why").value, generateExtraData(), sigSDK.KeyType.SHA512, documentHash);
				sigCaptDialog.startCapture();
			}
			
		    async function captureFromSTU() {
			    sigCaptDialog = null;
			    const config = generateConfig();
				
				if (document.getElementById("encrypt_stu").checked) {				
				    config.encryption = {
				        sessionId: window.crypto.getRandomValues(new Uint32Array(1))[0], // 32 bits random value
				        encryptionHandler: new MyEncryptionHandler(), // only necessary if connecting to STU-300/500/520
				        encryptionHandler2: new MyEncryptionHandler2(), // only necessary if connection to STU-430/530/540 
				    };
				}

                const stuDeviceStr = localStorage.getItem("stuDevice");
				let stuDevice;
			    if (!stuDeviceStr) {
				    const devices = await com.WacomGSS.STU.UsbDevice.requestDevices();
	                if (devices.length > 0) {
		                stuDevice = devices[0];                        					
						localStorage.setItem("stuDevice", JSON.stringify({"vendorId":stuDevice.vendorId,
						                                   "productName":stuDevice.productName,
														   "productId":stuDevice.productId}));
		                setDeviceName();
	                } else {
		                throw "No STU devices found";
	                }				
				} else {
				    stuDevice = JSON.parse(stuDeviceStr);
				    // get all the devices that we have permissions to connect
				    await navigator.hid.getDevices().then(devices => {
	                    devices.forEach(device => {							
					        if (stuDevice.vendorId === device.vendorId && stuDevice.productId === device.productId && stuDevice.productName === device.productName) {
						        stuDevice = device;
						    }
	                    });							
	                });
				}
				
				config.stuDevice = stuDevice;				
				stuCapDialog = new StuCaptDialog(sigSDK, config);
				stuCapDialog.addEventListener("ok", function() {
				    encryptSignature();
				    renderSignature();
				});		
								
				stuCapDialog.open(mSigObj, document.getElementById("who").value, document.getElementById("why").value, generateExtraData(), sigSDK.KeyType.SHA512, documentHash);								
			}
			
			window.setDeviceName = function() {
			    const stuDeviceStr = localStorage.getItem("stuDevice");
				if (stuDeviceStr) {
				    document.getElementById("selectedStuDevice").innerHTML = JSON.parse(stuDeviceStr).productName;
				} else {
				    document.getElementById("selectedStuDevice").innerHTML = "None";
				}
			}
			
			window.removeDevice = function() {
			    localStorage.removeItem("stuDevice");
				setDeviceName();
			}
			
			window.clear = function() {
			    if (stuCapDialog) {
					stuCapDialog.clear();
				}
				
				if (sigCaptDialog) {
				    sigCaptDialog.clear();
				}
			}
			
			function cancel() {
			    if (stuCapDialog) {
					stuCapDialog.cancel();
				}
				
				if (sigCaptDialog) {
				    sigCaptDialog.cancel();
				}
			}
			
			function accept() {
			    if (stuCapDialog) {
					stuCapDialog.accept();
				}
				
				if (sigCaptDialog) {
				    if (stuCapDialog) {
					    sigCaptDialog.cancel();
					} else {
				        sigCaptDialog.accept();
					}
					
				}
			}
			
			function mmToPx(mm) {
	            var dpr = window.devicePixelRatio;
                var inch = 25.4; //1inch = 25.4 mm
                var ppi = 96;	
                return ((mm/inch)*ppi)/dpr;
            }
			
			function pxToMm(px) {
			    var dpr = window.devicePixelRatio;
                var inch = 25.4; //1inch = 25.4 mm
                var ppi = 96;	
				return ((px*dpr)/ppi)*inch;
			}
			
			function pxToInches(px) {
			    return px/96;
			}
			
			async function renderSignatureImage() {
			    // calculate the size
				let renderWidth = parseInt(document.getElementById("render_width").value);
				let renderHeight = parseInt(document.getElementById("render_height").value);
				const isRelative = document.getElementById("is_relative").checked;
				
				let renderFlags = 0x400000;
				if (isRelative) {				
				    renderFlags |= 0x2000000;
					const sx = (96/25.4)*2;
					renderWidth = Math.floor(mmToPx(mSigObj.getWidth(true)/100) + sx);
				    renderHeight = Math.floor(mmToPx(mSigObj.getHeight(true)/100) + sx);
				} else {
				    if (isNaN(renderWidth) || renderWidth <= 0) {
				        if (isNaN(renderHeight) || renderHeight <= 0) {
					        // it takes the original size							
					        renderWidth = mmToPx(mSigObj.getWidth(false)/100);
						    renderHeight = mmToPx(mSigObj.getHeight(false)/100);
						} else {
					        // it takes the size proportional to the height
						    const originalRenderWidth = mmToPx(mSigObj.getWidth()/100);
						    const originalRenderHeight = mmToPx(mSigObj.getHeight()/100);
						    renderWidth = (originalRenderWidth/originalRenderHeight)*renderHeight;
						}
					} else if (isNaN(renderHeight) || renderHeight <= 0) {
			            // it takes the size proportinal to the width
				        const originalRenderWidth = mmToPx(mSigObj.getWidth()/100);
				        const originalRenderHeight = mmToPx(mSigObj.getHeight()/100);
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
				const image = await mSigObj.renderBitmap(renderWidth, renderHeight, "image/png", inkWidth, inkColor, backgroundColor, 0, 0, renderFlags);	
				return image;				
			}
				
			async function renderSignature() {
			    const image = await renderSignatureImage();
				
				document.getElementById("captureDiv").style.display = "none"							 
	            document.getElementById("signatureImage").src = image;		
				document.getElementById("signatureImage").style.display = "block";
				
				document.getElementById("save_image_btn").disabled = false;
				document.getElementById("save_text_btn").disabled = false;
				document.getElementById("save_binary_btn").disabled = false;
                document.getElementById("save_iso_binary_btn").disabled = false;
                document.getElementById("save_iso_xml_btn").disabled = false;				
			}
			
			window.saveSignature = async function(format) {
			    const newLink = document.createElement("a");			    
				
				if (format == "image") {
				    newLink.download = "signature.png";
					newLink.href = document.getElementById("signatureImage").src;
				} else {
				    let blob;
				    if (format == "txt") {
					    newLink.download = "signature.txt";
					    blob = new Blob([await mSigObj.getTextData(sigSDK.TextFormat.BASE64)], { type: "text/plain" });
					} else if (format == "binary") {
					    newLink.download = "signature.fss";
					    blob = new Blob([await mSigObj.getSigData()], { type: "application/octet-stream" });
					} else if (format == "iso_binary") {
					    newLink.download = "signature.iso";
						let isoType = sigSDK.IsoType["ISO-19794-7_BINARY"];
						if (mSigObj.canEncrypt()) {
						    if (document.getElementById("iso_encrypted_binary_radio").checked) {
							    newLink.download = "signature_encrypted.iso";
							    isoType = sigSDK.IsoType["ISO-19794-7_ENCRYPTED_BINARY"];
							} else {
							    newLink.download = "signature_encrypted_iso.txt";
							    isoType = sigSDK.IsoType["ISO-19794-7_ENCRYPTED_TEXT"];
							}
						}
						blob = new Blob([await mSigObj.exportIso(isoType)], { type: "application/octet-stream" });
					} else if (format == "iso_xml") {
					    newLink.download = "signature.xml";
						if (mSigObj.canEncrypt()) {
						    alert("XML ISO-19785-3 cannot be encrypted, it will be saved without encryption");
						}
						blob = new Blob([await mSigObj.exportIso(sigSDK.IsoType["ISO-19785-3_XML"])], { type: "application/octet-stream" });
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
			
			window.addDocumentHash = async function() {
			    const reader = new FileReader();
                reader.onload = async function() {                    
					try {
				        documentHash.delete();
					    const data = reader.result;   
                        const hashType = sigSDK.HashType.SHA512;
	                    documentHash = new sigSDK.Hash(hashType);	  
						
						const hashData = await crypto.subtle.digest("SHA-512", data);
						documentHash.setHash(hashData);
						
	                    /*var enc = new TextEncoder(); // always utf-8
	                    if (await documentHash.add(data)) {
						    alert("Document bounded properly");
	                    } else {
		                    alert("Document fails to bound");
	                    }*/     
	                } catch (e) {
		                alert(e);
	                }
		        }
                reader.readAsArrayBuffer(document.getElementById("document").files[0]);		
		    }					
			
			window.loadSignature = async function() {
			    try {
			        //reset encryption data
					await mSigObj.setPublicKey("");
					await mSigObj.setPrivateKey("");
					await mSigObj.setEncryptionPassword("");
					await decryptSignature(mSigObj);
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
				                    if ((!await mSigObj.setTextData(data)) || 
									    (!await readSignature(false))) {									    
				                        // maybe ISO binary text encrypted
						                try {
					                        const ad = new sigSDK.AdditionalImportIsoData();
		                                    ad.setWho("User imported from ISO");
		                                    ad.setWhy("Signature imported from ISO");
					                        //ad.setWhen(new Date());
					                        await mSigObj.importIso(data, sigSDK.IsoType["ISO-19794-7_ENCRYPTED_TEXT"], ad);
											readSignature(true);
						                } catch (e) {						
										    document.getElementById("load_signature").value = null;
					                        alert(e);
						                }
				                    }
				                } else {
								    //text/xml
		                            const ad = new sigSDK.AdditionalImportIsoData();
		                            ad.setWho("User imported from XML ISO");
		                            ad.setWhy("Signature imported from XML ISO");
									
									const domParser = new DOMParser();
									const xmlDocument = domParser.parseFromString(data, "text/xml");
									const elements = xmlDocument.getElementsByTagName("CreationDate");
									if (elements.length > 0) {
									    ad.setWhen(new Date(elements[0].innerHTML));
									}
									
					                await mSigObj.importIso(data, sigSDK.IsoType["ISO-19785-3_XML"], ad);
					                readSignature(true);
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
				                    //await mSigObj.readEncodedBitmapBinary(imageData.data, imageData.width, imageData.height);
									await mSigObj.readEncodedBitmapBinary(imageData, img.width, img.height);
				                    readSignature(true);
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
				                if ((!await mSigObj.setSigData(new Uint8Array(data))) ||
					                 (!await readSignature(false))) {
					                // try with iso format
					                const ad = new sigSDK.AdditionalImportIsoData();
		                            ad.setWho("User imported from ISO");
		                            ad.setWhy("Signature imported from ISO");
					                //ad.setWhen(new Date());
					                //ad.putExtraData("extra1", "test");
					                //ad.putExtraData("extra2", "test2");				
					                if (await mSigObj.importIso(new Uint8Array(data), sigSDKHelper.isEncryptedBinary(data) ? sigSDK.IsoType['ISO-19794-7_ENCRYPTED_BINARY'] : sigSDK.IsoType['ISO-19794-7_BINARY'], ad)) {
						                readSignature(true);
					                } else {
									    document.getElementById("load_signature").value = null;
					                    alert("Incorrect signature data found");
										emptyLoadData();
					                }
				                }
			                } catch (e) {
							    document.getElementById("load_signature").value = null;
				                alert(e);
								emptyLoadData();
			                }
		                }
                        reader.readAsArrayBuffer(file);		
	                }
	            }
		    }
			
			function emptyLoadData() {
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
			
			async function readSignature(showError) {
				try {
				    const image = await renderSignatureImage();
				
			        document.getElementById("load_who").innerHTML = mSigObj.getWho();
				    document.getElementById("load_why").innerHTML = mSigObj.getWhy();
					let when = mSigObj.getWhen();
 					document.getElementById("load_when").innerHTML = "The signature was captured on "+when;
				    document.getElementById("load_extra_data").innerHTML = mSigObj.getExtraData("");
				
				    document.getElementById("load_digitizer_type").innerHTML = mSigObj.getAdditionalData(sigSDK.CaptureData.Digitizer);
				    document.getElementById("load_digitizer_driver").innerHTML = mSigObj.getAdditionalData(sigSDK.CaptureData.Digitizer_Driver);
				    document.getElementById("load_operating_system").innerHTML = mSigObj.getAdditionalData(sigSDK.CaptureData.Machine_OS);
				    document.getElementById("load_network_interface_card").innerHTML = mSigObj.getAdditionalData(sigSDK.CaptureData.Network_Card);
				    document.getElementById("load_licence").innerHTML = mSigObj.getLicence();				
								
				    const types = [sigSDK.KeyType.MD5, 
				                   sigSDK.KeyType.SHA1, 
						    	   sigSDK.KeyType.SHA224, 
							       sigSDK.KeyType.SHA256, 
							       sigSDK.KeyType.SHA384, 
							       sigSDK.KeyType.SHA512];
				
				    for (let i=0; i<types.length; i++) {
				        try {				
				            let status = await mSigObj.checkIntegrity(types[i]);
						    if (status == sigSDK.IntegrityStatus.OK) {
						        document.getElementById("load_integrity").innerHTML = '<span style="color:green">The signature integrity is correct.</span>';
							    break;
						    } else if (status == sigSDK.IntegrityStatus.MISSING) {
						        document.getElementById("load_integrity").innerHTML = '<span style="color:black">No Integrity data found.</span>';
							    break;
						    } else if (status != sigSDK.IntegrityStatus.WRONG_TYPE) {
						        document.getElementById("load_integrity").innerHTML = '<span style="color:red">'+sigSDKHelper.integrityStatusDesc(status)+'</span>';	
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
			
			window.checkDocumentHash = async function() {
                const reader = new FileReader();
                reader.onload = async function() {                    
					try {
					    const data = reader.result;   
						
						const types = [sigSDK.KeyType.MD5, 
				                       sigSDK.KeyType.SHA1, 
							           sigSDK.KeyType.SHA224, 
							           sigSDK.KeyType.SHA256, 
							           sigSDK.KeyType.SHA384, 
							           sigSDK.KeyType.SHA512];
						
						for (let i=0; i<types.length; i++) {
						    const hashType = types[i];
	                        let documentHash = new sigSDK.Hash(hashType);	  
	                        if (await documentHash.add(data)) {
						        const status = await mSigObj.checkSignedData(documentHash);		  							
								if (status !=  sigSDK.DataStatus.BAD_TYPE) {
								    alert(sigSDKHelper.dataStatusDesc(status));
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
			
			function loadBackgroundImage() {
			    const file = document.getElementById("background_image").files[0];
	            if (file) {
				    const reader = new FileReader();
                    reader.onload = async function() {
                        const data = reader.result;
		                backgroundImage = new Image();	     
	                    backgroundImage.src = data;  
					}
                    reader.readAsDataURL(file);										    
				}
			}
			
			window.removeButton = function(button) {
			    document.getElementById(button).remove();
			}
			
			window.addButton = function() {
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
			
			window.addExtraData = function() {
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
			
			window.removeExtraData = function(extraData) {
			    document.getElementById(extraData).remove();
			}
			
			function generateExtraData() {
				const extraData = [];				
			    const list = document.getElementById("extra_data_list_div");
				const fields = list.getElementsByTagName("fieldset");
				for (var i=0; i<fields.length; i++) {
                    extraData.push({name:  fields[i].elements.namedItem("extra_name").value,
					                value: fields[i].elements.namedItem("extra_value").value
					               }
					              );								   
				}
				
				return extraData;
			}
						
			async function encryptSignature() {
			    try {
			        if (document.getElementById("no_encryption").checked) {
					    await mSigObj.setPublicKey("");
					    await mSigObj.setPrivateKey("");
				    } else {
 					    if (document.getElementById("symmetric_encryption").checked) {
				            await mSigObj.setEncryptionPassword(document.getElementById("symmetric_password").value);												
					    } else if (document.getElementById("asymmetric_encryption").checked) {
					        const pubKey = document.getElementById("public_key").value;
                            if (pubKey !== "") {								
						        await mSigObj.setPublicKey(pubKey);								
						    }
						}
						
						if (!mSigObj.canEncrypt()) {
						    alert("The signature cannot be encrypted");
						}
					}
				} catch (e) {
				    alert(e);
				}
			}	

            async function decryptSignature(signature) {
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

            function timeOutCallback(timeOnSurface) {
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