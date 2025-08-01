/**
 * Copyright (C) 2025 Wacom.
 * Use of this source code is governed by the MIT License that can be found in the LICENSE file.
 */
 
import SigSDK from "../node_modules/@wacom/signature-sdk/signature-sdk.js"
import WizCtl from "../../wizard/wizard.js"
import PadDefs from "./pad_defs.js"

import acceptBtnColor from "./images/accept_btn.png";
import acceptBtnBW from "./images/accept_btn_bw.png";
import cancelBtnColor from "./images/cancel_btn.png";
import cancelBtnBW from "./images/cancel_btn_bw.png";
import stu300Img from "./images/STU300.png";
import stu430Img from "./images/STU430.png";
import stu500Img from "./images/STU500.png";
import stu530Img from "./images/STU530-540.png";

let sigSDK
let mSigObj;	
let documentHash;
let wizCtl;		
let padDefs;
let btnWaiting;       	
let stuDevice;

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
	        if (sigSDK.STUDevice.isHIDSupported()) {				
			    document.getElementById("start_wizard").disabled = false;
			}
				
			documentHash = new sigSDK.Hash(sigSDK.HashType.None);				                
			wizCtl = new WizCtl(sigSDK);				
				
			document.getElementById("document_hash").disabled = false;
			document.getElementById("initializeBanground").style.display = "none";
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

			
window.startWizard = async function() {
	if (!stuDevice) {
	    const devices = await sigSDK.STUDevice.requestDevices();
		if (devices.length > 0) {
		    stuDevice = devices[0];    
		}	
	}

    if (stuDevice) {	
	    await wizCtl.padConnect(stuDevice);
	    const mirrorDiv = document.getElementById("mirror_div");
	    mirrorDiv.style.width = wizCtl.padWidth()+"px";
	    mirrorDiv.style.height = wizCtl.padHeight()+"px";
	    mirrorDiv.style.display="block";
	    document.getElementById("signature_div").style.display="none";				
	    padDefs = new PadDefs(wizCtl.padWidth(), wizCtl.padHeight());
	    await wizard_step_init();
	    document.getElementById("start_wizard").disabled = true;
	    document.getElementById("stop_wizard").disabled = false;
	}	
}
			
window.stopWizard =	async function() {
	await shutdown_step();
	document.getElementById("start_wizard").disabled = false;
	document.getElementById("stop_wizard").disabled = true;
}
			
window.showMirrorChanged = function(object) {
	if (object.checked) {
		document.getElementById("mirror_div").style.display = "block";
	} else {
		document.getElementById("mirror_div").style.display = "none";
	}
}
			
window.mirrorInputChanged = function(object) {
	wizCtl.setProperty({mirrorDiv:{enable:object.checked}});
}
			
window.encryptionChanged = function(object) {
	wizCtl.setProperty({encrypted:object.checked, sessionId:0xc0ffee});
}
			
window.monochromeChanged = function(object) {
	wizCtl.setProperty({forceMonochrome:object.checked});
}
            						
function mmToPx(mm) {
	var dpr = window.devicePixelRatio;
    var inch = 25.4; //1inch = 25.4 mm
    var ppi = 96;	
    return ((mm/inch)*ppi)/dpr;
}			

async function renderSignature() {
	let renderWidth = mmToPx(mSigObj.getWidth(false)/100);
	const renderHeight = mmToPx(mSigObj.getHeight(false)/100);				
	renderWidth += renderWidth % 4;
	const inkColor = "blue";
	const inkWidth = 3.0;
	const image = await mSigObj.renderBitmap(renderWidth, renderHeight, "image/png", inkWidth, inkColor, "white", 0, 0, 0);				
	return image;
}
				
async function addDocumentHash() {
	const reader = new FileReader();
    reader.onload = async function() {                    
		try {
			documentHash.delete();
			const data = reader.result;   
            const hashType = sigSDK.HashType.SHA512;
	        documentHash = new sigSDK.Hash(hashType);	  
	        var enc = new TextEncoder(); // always utf-8
	        if (await documentHash.add(data)) {
				alert("Document bounded properly");
	        } else {
		        alert("Document fails to bound");
	        }     
	    } catch (e) {
		    alert(e);
	    }
	}
    reader.readAsArrayBuffer(document.getElementById("document_hash").files[0]);		
}	

window.fireClick = async function(id) {
    if (!btnWaiting) {
	    btnWaiting = true;
		await wizCtl.fireClick(id);
		btnWaiting = false;
	}			    
} 

async function reset_wizard() {
	await wizCtl.reset();
	if (document.getElementById("show_mirror_checkbox").checked) {
	    wizCtl.setProperty({mirrorDiv:{id:"mirror_div", 
		                               enable:document.getElementById("enable_mirror_checkbox").checked}});
	}
	await wizCtl.setProperty({
	    forceMonochrome:document.getElementById("force_monochrome_checkbox").checked,
		encrypted:document.getElementById("enable_encryption_checkbox").checked,
		sessionId:0xc0ffee
	});
}

async function wizard_step_init() {
    await reset_wizard();	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
	
	wizCtl.setProperty({backColor:"white"});
	wizCtl.setProperty({font:{name:"arial", size:padDefs.stu.descriptionWidth, color:"blue"}});
	wizCtl.addObjectText("", "centre", "middle", "In this demo we will go through all the Wizard options.\nPress \"Cancel\" to stop or \"Start\" to continue.");
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	const cancelBtn = wizCtl.addObjectButton("cancel", "left", "bottom", "Cancel", padDefs.stu.buttonWidth);
	cancelBtn.onClick = async function() {
		await stopWizard();
		return true;
	}
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	const startBtn = wizCtl.addObjectButton("start", "right", "bottom", "Start >>", padDefs.stu.buttonWidth);
	startBtn.onClick = async function() {
		await wizard_step1();
		return true;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
	enableControlBtn(["cancel_btn", "start_btn"]);
}

async function wizard_step1() {
	await reset_wizard();	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
	
	wizCtl.setProperty({backColor:"white"});
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Checkbox control");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", +10, "Step 1 of 6");	
	
	wizCtl.setProperty({font:{name:"arial", size:padDefs.stu.controlTextWidth, color:"black"}});
	wizCtl.addObjectCheckBox("checkbox1", padDefs.stu.controlLeft, padDefs.stu.controlTop1, "This is a checkbox with the default options.");	
	
	wizCtl.addObjectCheckBox("checkbox2", padDefs.stu.controlLeft, padDefs.stu.controlTop2, "Checkbox checked by default with cross instead of tick.", 
	                         WizCtl.CheckboxOptions.CheckboxChecked | WizCtl.CheckboxOptions.CheckboxDisplayCross);	
							 
    wizCtl.setProperty({checkbox:{size:padDefs.stu.bigControlSize}});							 
	const checkBox = wizCtl.addObjectCheckBox("checkbox3", padDefs.stu.controlLeft, padDefs.stu.controlTop3, "Checkbox with bigger Box. You need to check this checkbox to go to the next step.");
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	const backBtn = wizCtl.addObjectButton("back", "left", "bottom", "<< Back", padDefs.stu.buttonWidth);
	backBtn.onClick = async function() {
		await wizard_step_init();
		return true;
	}
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	const nextBtn = wizCtl.addObjectButton("next", "right", "bottom", "Next >>", padDefs.stu.buttonWidth);
	nextBtn.onClick = async function() {
		if (checkBox.checked) {
		    await wizard_step2();
		    return true;
		}
		return false;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
	enableControlBtn(["back_btn", "next_btn", "big_check_btn"]);
}

async function wizard_step2() {
	await reset_wizard();	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
	
	wizCtl.setProperty({backColor:"white"});
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Radio button control");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 2 of 6");	
	
	wizCtl.setProperty({font:{name:"arial", size:padDefs.stu.controlTextWidth, color:"black"}});
	wizCtl.addObjectRadioButton("radio1", padDefs.stu.controlLeft, padDefs.stu.controlTop1, "This is a radio button with the default options.", {Group:"group1"});	
	
	wizCtl.addObjectRadioButton("radio2", padDefs.stu.controlLeft, padDefs.stu.controlTop2, "Second option of the radio buttons", {Group:"group1", Checked:true});	
							 
    wizCtl.setProperty({radiobutton:{size:padDefs.stu.bigControlSize}});							 
	wizCtl.addObjectRadioButton("radio3", padDefs.stu.controlLeft, padDefs.stu.controlTop3, "Radio button with bigger select circle.", {Group:"group1"});
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	const backBtn = wizCtl.addObjectButton("back", "left", "bottom", "<< Back", padDefs.stu.buttonWidth);
	backBtn.onClick = async function() {
		await wizard_step2();
		return true;
	}
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	const nextBtn = wizCtl.addObjectButton("next", "right", "bottom", "Next >>", padDefs.stu.buttonWidth);
	nextBtn.onClick = async function() {
		await wizard_step3();
		return true;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
	enableControlBtn(["back_btn", "next_btn", "big_radio_btn"]);
}

async function wizard_step3() {
	await reset_wizard();	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
	
	wizCtl.setProperty({backColor:"white"});
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Input control");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	const stepObject = wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 3 of 6");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.inputTextWidth}});
	const infoObject = wizCtl.addObject(WizCtl.ObjectType.ObjectText, "txt", 10, stepObject.rect.lowerRightYpixel+10, "Enter a 4 digit PIN code: ", null);		
	const infoObjectWidth = infoObject.rect.lowerRightXpixel - infoObject.rect.upperLeftXpixel;
	const infoObjectHeight = infoObject.rect.lowerRightYpixel - infoObject.rect.upperLeftYpixel;

    // input control gets inputs from buttons with id with lenght of 1		
	wizCtl.setProperty({backColor:"white", borderColor:"black"});
	wizCtl.setProperty({font:{size:padDefs.stu.inputTextWidth}});
	const testInput = {minLength:1, maxLength:4};
	const inputObject = wizCtl.addObject(WizCtl.ObjectType.ObjectInput, "Input", 0, 0, testInput, null);
	inputObject.onInput = function(text, inputId, minLength, maxLength) {
		console.log("Pressed "+inputId+" the text is "+text+" with min lenght: "+minLength+" and maxLength: "+maxLength);
	}	
		
    let options = 0;
	if (document.getElementById("input_echo_underscore").checked) {
		options |= WizCtl.InputEchoOptions.EchoUnderline;
	}
	
	let echoChar = document.getElementById("input_echo_char").value;
	if (echoChar.length > 0) {
		echoChar = echoChar[0];
	} else {
		echoChar = null;
	}
	
	const echoSpacing = document.getElementById("input_echo_spacing").value;
	switch (echoSpacing) {
		case "no_spacing": options |= WizCtl.InputEchoOptions.EchoNoSpacing; 
		                   break;
		case "half_spacing": options |= WizCtl.InputEchoOptions.EchoHalfSpacing;
		                     break;
		case "single_spacing": options |= WizCtl.InputEchoOptions.EchoSingleSpacing;
		                       break;
		case "double_spacing": options |= WizCtl.InputEchoOptions.EchoDoubleSpacing;
		                       break;
	}
		
	wizCtl.addObject(WizCtl.ObjectType.ObjectInputEcho, "", infoObject.rect.upperLeftXpixel+infoObjectWidth+10, infoObject.rect.upperLeftYpixel, echoChar, options);		
													
	wizCtl.setProperty({font:{name:"verdana",size:padDefs.stu.inputButtonTextWidth, style:"bold"}});
    wizCtl.setProperty({border:{size:3, color:"black"}});				
	wizCtl.setProperty({backColor:"grey", borderColor:"black"});
	wizCtl.setProperty({pushed:{font:{color:"blue"}, backColor:"green", invert:true}});			
		
	const keyWidth = padDefs.stu.inputButtonWidth;
	let y = infoObject.rect.upperLeftYpixel+infoObjectHeight+10;							
	let x = wizCtl.padWidth() / 2 - keyWidth / 2 - 2 * keyWidth;
	
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "1", x, y, "1", keyWidth);
    
	x = wizCtl.padWidth() / 2 - keyWidth / 2;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "2", x, y, "2", keyWidth);
    
	x += 2 * keyWidth;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "3", x, y, "3", keyWidth);

    x = wizCtl.padWidth() / 2 - keyWidth / 2 - 2 * keyWidth;
    y += keyWidth;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "4", x, y, "4", keyWidth);
    
	x = wizCtl.padWidth() / 2 - keyWidth / 2;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "5", x, y, "5", keyWidth);

	x += 2 * keyWidth;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "6", x, y, "6", keyWidth);

    x = wizCtl.padWidth() / 2 - keyWidth / 2 - 2 * keyWidth;
    y += keyWidth;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "7", x, y, "7", keyWidth);
    
	x = wizCtl.padWidth() / 2 - keyWidth / 2;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "8", x, y, "8", keyWidth);
    
	x += 2 * keyWidth;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "9", x, y, "9", keyWidth);

    x = wizCtl.padWidth() / 2 - keyWidth / 2 - 2 * keyWidth;
    y += keyWidth;
	
    wizCtl.setProperty({border:{size:3, color:"green"}});				
	wizCtl.setProperty({backColor:"red", borderColor:"blue"});
	wizCtl.setProperty({pushed:{font:{color:"blue"}, backColor:"green", invert:true}});	
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "delete", x, y, "<< Delete", 3 * keyWidth);
    
	wizCtl.setProperty({border:{size:3, color:"black"}});				
	wizCtl.setProperty({backColor:"grey", borderColor:"black"});
	wizCtl.setProperty({pushed:{font:{color:"blue"}, backColor:"green", invert:true}});	
	x = wizCtl.padWidth() / 2 - keyWidth / 2 + 2 * keyWidth;
    wizCtl.addObject(WizCtl.ObjectType.ObjectButton, "0", x, y, "0", keyWidth);
	    
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	const backBtn = wizCtl.addObjectButton("back", "left", "bottom", "<< Back", padDefs.stu.buttonWidth);
	backBtn.onClick = async function() {
		await wizard_step2();
		return true;
	}
	
	const clearBtn = wizCtl.addObjectButton("clear", "centre", "bottom", "Clear", padDefs.stu.buttonWidth);
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	const nextBtn = wizCtl.addObjectButton("next", "right", "bottom", "Next >>", padDefs.stu.buttonWidth);
	nextBtn.onClick = async function() {
		await wizard_step4();
		return true;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
	enableControlBtn(["back_btn", "next_btn", "clear_btn"]);
}

async function wizard_step4() {
    await reset_wizard();	
	
	const useColor = !document.getElementById("force_monochrome_checkbox").checked && wizCtl.padWidth() == 800;	
	
	let imgSrc = "";
	let colorImg = false;
	switch (wizCtl.padModelName()) {
		case "STU-300": imgSrc = stu300Img; break;
		case "STU-500": imgSrc = stu500Img; break;
		case "STU-430": imgSrc = stu430Img; break;
		default: imgSrc = stu530Img; colorImg = true;
	}
	
	const img = await loadImage(imgSrc);
    wizCtl.addObject(WizCtl.ObjectType.ObjectImage, "img", "centre", "bottom", img);
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	wizCtl.setProperty({backColor:"#B1B3B3"});		
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
			
	//wizCtl.setProperty({backColor:"white"});		
	wizCtl.setProperty({backColor:"#B1B3B3"});		
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Image object");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 4 of 6");					
	
	const acceptImage = await loadImage(useColor?acceptBtnColor:acceptBtnBW);
	acceptImage.width = 40;
	acceptImage.height = 20;
	
	const options = {};
	if (padDefs.stu.imageButtonWidth) {
		options.width = padDefs.stu.imageButtonWidth;
	}
	if (padDefs.stu.imageButtonHeight) {
		options.height = padDefs.stu.imageButtonHeight;
	}
	
	const acceptObj = wizCtl.addObject(WizCtl.ObjectType.ObjectImage, "next", "right", "bottom", acceptImage,options);
	acceptObj.onClick = async function() {
		await wizard_step5();
		return true;
	}
	
	const cancelImage = await loadImage(useColor?cancelBtnColor:cancelBtnBW);
	const cancelBtn = wizCtl.addObject(WizCtl.ObjectType.ObjectImage, "back", "left", "bottom", cancelImage,options);
	cancelBtn.onClick = async function() {
		await wizard_step4();
		return true;
	}		
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
	enableControlBtn(["back_btn", "next_btn"]);
}

async function wizard_step5() {
    await reset_wizard();	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
			
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Primitive objects");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 5 of 6");	
	
	wizCtl.setProperty({fillColor:"green", borderColor:"blue"});
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, padDefs.stu.shape.line1X1, padDefs.stu.shape.line1Y1, padDefs.stu.shape.line1X2, padDefs.stu.shape.line1Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.LineSolid);			
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, padDefs.stu.shape.line2X1, padDefs.stu.shape.line2Y1, padDefs.stu.shape.line2X2, padDefs.stu.shape.line2Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.LineDashed);			
	
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Rectangle, padDefs.stu.shape.rect1X1, padDefs.stu.shape.rect1Y1, padDefs.stu.shape.rect1X2, padDefs.stu.shape.rect1Y2, padDefs.stu.shape.lineWidth); //default line solid outline
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Rectangle, padDefs.stu.shape.rect2X1, padDefs.stu.shape.rect2Y1, padDefs.stu.shape.rect2X2, padDefs.stu.shape.rect2Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.LineSolid | WizCtl.PrimitiveOptions.Fill);
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Rectangle, padDefs.stu.shape.rect3X1, padDefs.stu.shape.rect3Y1, padDefs.stu.shape.rect3X2, padDefs.stu.shape.rect3Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.LineDashed | WizCtl.PrimitiveOptions.Fill);
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Rectangle, padDefs.stu.shape.rect4X1, padDefs.stu.shape.rect4Y1, padDefs.stu.shape.rect4X2, padDefs.stu.shape.rect4Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.Fill);
	//wizCtl.addPrimitive(WizCtl.PrimitiveType.Rectangle, "410", "200", "460", "250", 10, WizCtl.PrimitiveOptions.FillXOR);
	
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Ellipse, padDefs.stu.shape.ellipse1X1, padDefs.stu.shape.ellipse1Y1, padDefs.stu.shape.ellipse1X2, padDefs.stu.shape.ellipse1Y2, padDefs.stu.shape.lineWidth); //default line solid outline
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Ellipse, padDefs.stu.shape.ellipse2X1, padDefs.stu.shape.ellipse2Y1, padDefs.stu.shape.ellipse2X2, padDefs.stu.shape.ellipse2Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.LineSolid | WizCtl.PrimitiveOptions.Fill);
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Ellipse, padDefs.stu.shape.ellipse3X1, padDefs.stu.shape.ellipse3Y1, padDefs.stu.shape.ellipse3X2, padDefs.stu.shape.ellipse3Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.LineDashed | WizCtl.PrimitiveOptions.Fill);
	wizCtl.addPrimitive(WizCtl.PrimitiveType.Ellipse, padDefs.stu.shape.ellipse4X1, padDefs.stu.shape.ellipse4Y1, padDefs.stu.shape.ellipse4X2, padDefs.stu.shape.ellipse4Y2, padDefs.stu.shape.lineWidth, WizCtl.PrimitiveOptions.Fill);
	//wizCtl.addPrimitive(WizCtl.PrimitiveType.Ellipse, "410", "300", "460", "350", 10, WizCtl.PrimitiveOptions.FillXOR);
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	const backBtn = wizCtl.addObjectButton("back", "left", "bottom", "<< Back", padDefs.stu.buttonWidth);
	backBtn.onClick = async function() {
		await wizard_step4();
		return true;
	}
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	const nextBtn = wizCtl.addObjectButton("next", "right", "bottom", "Next >>", padDefs.stu.buttonWidth);
	nextBtn.onClick = async function() {
		await wizard_step6();
		return true;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);
    enableControlBtn(["back_btn", "next_btn"]);	
}

async function wizard_step6() {
	await reset_wizard();	
	
	const signatureOpts = {
		integrityKey:sigSDK.KeyType.SHA512
	};
	
	if (documentHash) {
		signatureOpts.documentHash = documentHash;
	}
	
	const signComponent = wizCtl.addObjectSignature("Sig", sigSDK, mSigObj, signatureOpts);
	signComponent.onSignatureCaptured = async function(signature) {
		document.getElementById("signatureImage").src= await renderSignature(signature);
		document.getElementById("mirror_div").style.display="none";
		document.getElementById("signature_div").style.display="block";
		await stopWizard();
		return true;
	}
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
			
	wizCtl.setProperty({backColor:"white"});		
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Signature object");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 7 of 7");	
			
	wizCtl.setProperty({font:{size:padDefs.stu.xCharFontSize}});
	wizCtl.addObjectText("", padDefs.stu.xCharPosX, padDefs.stu.xCharPosY, "X");

	wizCtl.setProperty({font:{size:padDefs.stu.signLineFontSize}});
	wizCtl.addObjectText("", padDefs.stu.signLinePosX, padDefs.stu.signLinePosY, padDefs.stu.signLine);
	
	wizCtl.setProperty({font:{name:"Verdana", size:padDefs.stu.whoFontSize, style:" "}});
    const whoObject = wizCtl.addObjectText("who", "right", 0.65*wizCtl.padHeight(), document.getElementById("who").value);	
	const whoObjectHeight = whoObject.rect.lowerRightYpixel - whoObject.rect.upperLeftYpixel;
    wizCtl.addObjectText("why", "right", 0.65*wizCtl.padHeight()+whoObjectHeight+10, document.getElementById("why").value);	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	
	const backBtn = wizCtl.addObjectButton("back", "left", "bottom", "<< Back", padDefs.stu.buttonWidth);
	backBtn.onClick = async function() {
		await wizard_step5();
		return true;
	}
	
	const clearBtn = wizCtl.addObjectButton("clear", "centre", "bottom", "Clear", padDefs.stu.buttonWidth);
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	//Important: we should not use the onClick method of ok button to get a captured signature, becouse this event it is raised
	//event if there is no signature captured due to no pen data has been added.
	const okBtn = wizCtl.addObjectButton("ok", "right", "bottom", "Ok", padDefs.stu.buttonWidth);
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);
    enableControlBtn(["back_btn", "clear_btn", "ok_btn"]);	
}

async function shutdown_step() {
	await reset_wizard();	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	wizCtl.addObject(WizCtl.ObjectType.ObjectText, "txt1", "centre", "top", wizCtl.padModelName(), null);
    wizCtl.addObject(WizCtl.ObjectType.ObjectDisplayAtShutdown, "txt", 0, 0);
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
    await wizCtl.padDisconnect();
	enableControlBtn([]);
	
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

/*async function renderSignature(signature) {
	console.log(signature.getWho());
	console.log(signature.getWhy());
	await stopWizard();
}*/

function enableControlBtn(ids) {
	document.getElementById("start_btn").disabled = true;
	document.getElementById("back_btn").disabled = true;
	document.getElementById("next_btn").disabled = true;
	document.getElementById("cancel_btn").disabled = true;
	document.getElementById("clear_btn").disabled = true;
	document.getElementById("ok_btn").disabled = true;
	document.getElementById("big_check_btn").disabled = true;
	document.getElementById("big_radio_btn").disabled = true;
	
	for (var i=0; i<ids.length; i++) {
		document.getElementById(ids[i]).disabled = false;
	}
}