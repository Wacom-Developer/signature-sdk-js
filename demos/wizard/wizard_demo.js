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
	wizCtl.addObjectText("", "right", +10, "Step 1 of 7");	
	
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
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 2 of 7");	
	
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
	const stepObject = wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 3 of 7");	
	
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
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
			
	wizCtl.setProperty({backColor:"white"});		
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Inking object");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 4 of 7");		
	
	const inkingObject = wizCtl.addObjectInking();
	inkingObject.onInkingCaptured = async function(imageString) {
		await wizard_step5(imageString);
		return true;
	}
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.buttonTextWidth, color:"black"}});
	wizCtl.setProperty({backColor:"#D3D3D3", 
	                    border:{size:padDefs.stu.buttonBorderSize, color:"black"},
	                    pushed:{backColor:"#A9A9A9", 
						        font:{color:"black"},
								border:{size:padDefs.stu.buttonBorderSize, color:"#D3D3D3"}}});
	const backBtn = wizCtl.addObjectButton("back", "left", "bottom", "<< Back", padDefs.stu.buttonWidth);
	backBtn.onClick = async function() {
		await wizard_step3();
		return true;
	}
	
	wizCtl.addObjectButton("clear", "centre", "bottom", "Clear", padDefs.stu.buttonWidth);
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	wizCtl.addObjectButton("ok", "right", "bottom", "Ok >>", padDefs.stu.buttonWidth);
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);
    enableControlBtn(["back_btn", "ok_btn", "clear_btn"]);	
}

async function wizard_step5(imageString) {
    await reset_wizard();	
	
	const useColor = !document.getElementById("force_monochrome_checkbox").checked && wizCtl.padWidth() == 800;
	
	const img = await loadImage(imageString);
    wizCtl.addObject(WizCtl.ObjectType.ObjectImage, "img", 0, 0, img);
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
			
	wizCtl.setProperty({backColor:"white"});		
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Image object");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 4 of 7");					
	
	const acceptImage = await loadImage(useColor?"./images/accept_btn.png":"./images/accept_btn_bw.png");
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
		await wizard_step6();
		return true;
	}
	
	const cancelImage = await loadImage(useColor?"./images/cancel_btn.png":"./images/cancel_btn_bw.png");
	const cancelBtn = wizCtl.addObject(WizCtl.ObjectType.ObjectImage, "back", "left", "bottom", cancelImage,options);
	cancelBtn.onClick = async function() {
		await wizard_step4();
		return true;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);	
	enableControlBtn(["back_btn", "next_btn"]);
}

async function wizard_step6() {
    await reset_wizard();	
	
	wizCtl.setProperty({font:{name:"verdana", size:padDefs.stu.titleSize, color:"black"}});
	const titleText = wizCtl.addObjectText("", "left", "top", "Wizard Demo");
	
	wizCtl.setProperty({borderColor:"red"});
	const lineObject = wizCtl.addPrimitive(WizCtl.PrimitiveType.Line, "left", titleText.rect.lowerRightYpixel, "right", titleText.rect.lowerRightYpixel, padDefs.stu.tileLineWidth);	
			
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"blue", style:"bold"}});
	wizCtl.addObjectText("", 10, lineObject.rect.lowerRightYpixel+10, "Primitive objects");	
	
	wizCtl.setProperty({font:{size:padDefs.stu.subTitleWidth, color:"black", style:" "}});
	wizCtl.addObjectText("", "right", lineObject.rect.lowerRightYpixel+10, "Step 6 of 7");	
	
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
		await wizard_step5();
		return true;
	}
		
	wizCtl.setProperty({font:{color:"green"}, pushed:{font:{color:"green"}}});	
	const nextBtn = wizCtl.addObjectButton("next", "right", "bottom", "Next >>", padDefs.stu.buttonWidth);
	nextBtn.onClick = async function() {
		await wizard_step7();
		return true;
	}
	
	await wizCtl.display(document.getElementById("show_wait_checkbox").checked);
    enableControlBtn(["back_btn", "next_btn"]);	
}

async function wizard_step7() {
	await reset_wizard();	
	
	const signatureOpts = {
		integrityKey:Module.KeyType.SHA512
	};
	
	if (documentHash) {
		signatureOpts.documentHash = documentHash;
	}
	
	const signComponent = wizCtl.addObjectSignature("Sig", mSigObj, signatureOpts);
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
		await wizard_step6();
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

async function renderSignature(signature) {
	console.log(signature.getWho());
	console.log(signature.getWhy());
	await stopWizard();
}

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