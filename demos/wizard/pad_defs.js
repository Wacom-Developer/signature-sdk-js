/**
 * Copyright (C) 2023 Wacom.
 * Use of this source code is governed by the MIT License that can be found in the LICENSE file.
 */
 
class PadDefs {

	static STU430 = {
		titleSize: "16pt",
		tileLineWidth: 5,
		descriptionWidth: "10pt",
		buttonTextWidth: "14pt",
		buttonWidth: 100,
		buttonBorderSize: 2,
		subTitleWidth: "12pt",
		controlTextWidth: "8pt",
		controlLeft: 10,
		controlTop1: 80,
		controlTop2: 100,
		controlTop3: 130,
		bigControlSize: "20pt",
		inputTextWidth: "10pt",
		inputButtonTextWidth: "10pt",
		inputButtonWidth: 20,
		imageButtonWidth: 100,
		imageButtonHeight: 40,
		shape : {
			line1X1: 10,
			line1Y1: 70,
			line1X2: 110,
			line1Y2: 70,			
			line2X1: 130,
			line2Y1: 70,
			line2X2: 230,
			line2Y2: 70,
			rect1X1: 10,
			rect1Y1: 80,
			rect1X2: 60,
			rect1Y2: 100,
			rect2X1: 90,
			rect2Y1: 80,
			rect2X2: 140,
			rect2Y2: 100,
			rect3X1: 170,
			rect3Y1: 80,
			rect3X2: 220,
			rect3Y2: 100,
			rect4X1: 250,
			rect4Y1: 80,
			rect4X2: 300,
			rect4Y2: 100,
			ellipse1X1: 10,
			ellipse1Y1: 120,
			ellipse1X2: 60,
			ellipse1Y2: 170,
			ellipse2X1: 90,
			ellipse2Y1: 120,
			ellipse2X2: 140,
			ellipse2Y2: 170,
			ellipse3X1: 170,
			ellipse3Y1: 120,
			ellipse3X2: 220,
			ellipse3Y2: 170,
			ellipse4X1: 250,
			ellipse4Y1: 120,
			ellipse4X2: 300,
			ellipse4Y2: 170,
			lineWidth: 4,			
		},
		xCharPosX: 20,
		xCharPosY: 100,
		xCharFontSize: "15pt",
		signLinePosX: 40,
		signLinePosY: 100,
		signLineFontSize: "15pt",
		signLine: "..............................",
		whoFontSize: "12pt"
	}
	
	//Wacom STU-520, 530, 540 or 541
	static STU5X0 = {
		titleSize: "40pt",
		tileLineWidth: 10,
		descriptionWidth: "20pt",
		buttonTextWidth: "30pt",
		buttonWidth: 200,
		buttonBorderSize: 8,
		subTitleWidth: "20pt",
		controlTextWidth: "20pt",
		controlLeft: 100,
		controlTop1: 150,
		controlTop2: 200,
		controlTop3: 260,
		bigControlSize: "50pt",
		inputTextWidth: "20pt",
		inputButtonTextWidth: "30pt",
		inputButtonWidth: 60,
		imageButtonWidth: 100,
		imageButtonHeight: 40,
		shape : {
			line1X1: 10,
			line1Y1: 150,
			line1X2: 210,
			line1Y2: 150,			
			line2X1: 230,
			line2Y1: 150,
			line2X2: 430,
			line2Y2: 150,
			rect1X1: 10,
			rect1Y1: 200,
			rect1X2: 60,
			rect1Y2: 250,
			rect2X1: 90,
			rect2Y1: 200,
			rect2X2: 140,
			rect2Y2: 250,
			rect3X1: 170,
			rect3Y1: 200,
			rect3X2: 220,
			rect3Y2: 250,
			rect4X1: 250,
			rect4Y1: 200,
			rect4X2: 300,
			rect4Y2: 250,
			ellipse1X1: 10,
			ellipse1Y1: 270,
			ellipse1X2: 60,
			ellipse1Y2: 320,
			ellipse2X1: 90,
			ellipse2Y1: 270,
			ellipse2X2: 140,
			ellipse2Y2: 320,
			ellipse3X1: 170,
			ellipse3Y1: 270,
			ellipse3X2: 220,
			ellipse3Y2: 320,
			ellipse4X1: 250,
			ellipse4Y1: 270,
			ellipse4X2: 300,
			ellipse4Y2: 320,
			lineWidth: 4,			
		},
		xCharPosX: 80,
		xCharPosY: 250,
		xCharFontSize: "32pt",
		signLinePosX: 110,
		signLinePosY: 250,
		signLineFontSize: "32pt",
		signLine: "........................................",
		whoFontSize: "20pt"
	}
	
	constructor(padWidth, padHeight) {
		this.width = padWidth;
		this.height = padHeight;
		
		switch (padWidth) {
			case 640:
			    // stu 500 not supported yet
				break;
			case 800:
			    // for the moment only stu 540 is supported
				this.stu = PadDefs.STU5X0;
				break;
			case 396:
			    // stu 300 not supported yet
				break;
			case 320:
			    // stu 430 
				this.stu = PadDefs.STU430;
				break;
		}
	}
}

export default PadDefs;