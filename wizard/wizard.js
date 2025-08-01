/**
 * Defines the property that will be used to draw text.
 * @typedef Font
 * @property {string} name - name of the font, for example "verdana".
 * @property {string} size - size of the font following by its dimension, for example: "10px" or "15pt".
 * @property {string} color - color of the font, for example: "red" or "#ff0000".
 * @property {string} style - style to use, for example: "bold".
 */	 
	 
/**
 * Border properties.
 * @typedef Border
 * @property {number} size - size of the border in pixels.
 * @property {string} color - color of the border.
 * @property {string} style - style of the border, it can be "solid", "dash", etc.
 */	 	 
	 
/**
 * Defines that properties that will have a button object with it is pushed, (only valid for color devices).
 * @typedef Pushed
 * @property {Font} font - Font object with the properties for the pushed text button.
 * @property {Border} border - Border object with the properties for the border of the pushed button.
 * @property {string} backColor - Background color for the pushed button.
 * @property {string} borderColor - Border color for the pushed button.
 * @property {string} fillColor - Fill color for the pushed button.
 */
	 
/**
 * Defines properties for the Checkbox object.
 * @typedef Checkbox
 * @property {string} size - When defines indicates the size of the box, when not, the box will be drawn with the same size than the rest of the text.
 */
	 
/**
 * Defines properties for the Radiobutton object.
 * @typedef Radiobutton
 * @property {number} size - When defines indicates the size of the circle, when not, the circle will be drawn with the same size than the rest of the text.
 */	 
	 
/**
 * Defines the properties for mirror the image into the browser screen.
 * @typedef MirrorDiv
 * @property {string} id - Id of a parent div where the image will be drawed. 
 * @property {number} width - Width of the output image, if not defined it will take the devices width.
 * @property {number} height - Height of the output image, if not defined it will take the devices height.
 * @property {boolean} enable - If true the mirror image will allow input.
 */
	
/**
 * Defines the properties for an object. 
 * @typedef Config
 * @property {Font} font - This is the font object with the properties to draw the text.
 * @property {Border} border - Properties for the border.
 * @property {string} backColor
 * @property {string} borderColor
 * @property {string} fillColor
 * @property {Pushed} pushed
 * @property {Checkbox} checkbox
 * @property {Radiobutton} radiobutton
 * @property {MirrorDiv} mirrorDiv
 * @property {boolean} encrypted
 * @property {number} sessionId
 * @property {boolean} forceMonochrome
 * @property {boolean} invert
 */
 
/**
 * Defines the rectangle in where an object will be displayed.
 * @typedef Rectangle
 * @property {number} upperLeftXpixel - The x-coordinate of the upper-left corner of the area.
 * @property {number} upperLeftYpixel - The y-coordinate of the upper-left corner of the area.
 * @property {number} lowerRightXpixel - The x-coordinate of the lower-right corner of the area.
 * @property {number} lowerRightYpixel - The y-coordinate of the lower-right corner of the area.
 */
 
/**
 * Generic Wizard object.
 * @typedef ObjectWizard
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object.
 * @property {Rectangle} rect - If the object is displayed on screen contains the displayed area, otherwise it will be null.
 */
 
/**
 * Object for displaying a button on the pad.
 * @typedef ObjectButton
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectButton".
 * @property {Rectangle} rect - The displayed area.
 * @property {function} onClick - Defines a function to be called with the button is clicked. The function has the object as parameter an return a boolean.
 *                                When returns true the Wizard stops capturing points, otherwise continues capturing points.
 */ 
 
/**
 * Object for displaying a checkbox on the pad.
 * @typedef ObjectCheckbox
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectCheckbox".
 * @property {Rectangle} rect - The displayed area.
 * @property {function} onClick - Defines a function to be called with the checkbox is clicked. The function has the object as paremeter an return a boolean.
 *                                When returns true the Wizard stops capturing points, otherwise continues capturing points.
 * @property {boolean} checked - Indicates if the checkbox is checked or not.
 */  
 
/**
 * Object for displaying an image on the pad.
 * @typedef ObjectImage
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectImage".
 * @property {Rectangle} rect - The displayed area.
 * @property {function} onClick - Defines a function to be called with the image is clicked. The function has the object as paremeter an return a boolean.
 *                                When returns true the Wizard stops capturing points, otherwise continues capturing points.
 */ 
 
/**
 * Object for displaying a radio button on the pad.
 * @typedef ObjectRadioButton
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectRadioButton".
 * @property {Rectangle} rect - The displayed area.
 * @property {function} onClick - Defines a function to be called with the radio button is clicked. The function has the object as paremeter an return a boolean.
 *                                When returns true the Wizard stops capturing points, otherwise continues capturing points.
 * @property {boolean} selected - Indicates if the radio button is selected or not.
 */ 

/**
 * Object for capturing an inking image.
 * @typedef ObjectInking
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectInking".
 * @property {function} onInkingCaptured - Defines a function to be called with the image is captured. The function has a base 64 png image as paremeter. 
 */

/**
 * Object for input.
 * @typedef ObjectInput
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectInput".
 * @property {number} minLength - The minimum lenght for the input.
 * @property {number} maxLength - The maximum lenght for the input.
 * @property {function} onInput - Defines a function to be called when a input is pressed with the paremeters:
 *                                text - that defines the whole input.
 *								  inputId - the id of the input pressed.
 *								  minLength - the input minimum lenght.
 *								  maxLength - the input maximum lenght.
 */

/**
 * Object for capturing a signature.
 * @typedef ObjectSignature
 * @property {string} id - Optional object's id.
 * @property {string} type - The type of the object, in this case the string "ObjectInking".
 * @property {function} onSignatureCaptured - Defines a function to be called with the signature is captured. The signature is passed as parameter.
 */  
 
/**
 * @class WizCtl
 * The Wizard library provides interactive controls for STU tablets devices.
 */
class WizCtl {
		
	/**
     * Create a new WizCtl control
     */	 
	constructor(sigSDK) {
		this.sigSDK = sigSDK;
		this.reset(false);
		this.useColor = true;        
	}		
	
	/**
	 * Identifies the object type.	 
	 * @property {string} ObjectText
	 * @property {string} ObjectButton
	 * @property {string} ObjectCheckbox
	 * @property {string} ObjectRadioButton
	 * @property {string} ObjectSignature
	 * @property {string} ObjectInput
	 * @property {string} ObjectInputEcho
	 * @property {string} ObjectImage
	 * @property {string} ObjectDisplayAtShutdown
	 * @property {string} ObjectInking
	 * @property {string} ObjectPrimitive
	 */
	static ObjectType = {
	    ObjectText: "OBJECT_TEXT",
	    ObjectButton: "OBJECT_BUTTON",
	    ObjectCheckbox: "OBJECT_CHECK_BOX",
	    ObjectRadioButton: "OBJECT_RADIO_BUTTON",
	    ObjectSignature: "OBJECT_SIGNATURE",
	    ObjectInput: "OBJECT_INPUT",
	    ObjectInputEcho: "OBJECT_INPUT_ECHO",
	    ObjectImage: "OBJECT_IMAGE",
	    ObjectDisplayAtShutdown: "OBJECT_DISPLAY_AT_SHUTDOWN",
	    ObjectInking: "OBJECT_INKING",
	    ObjectPrimitive: "OBJECT_PRIMITIVE"
	}	
	
	static #PadMode = {
		 PadIndeterminate:0, // No limiting objects yet added
         PadInteractive:1,   // Interactive object (checkbox or button) added
         PadSigning:2,       // Signature object added
         PadInking:3,        // Inking object added
         PadInput:4,         // Input object added
         PadShutdown:5       // DisplayAtShutdown object added
	}
	
	/**
	 * Options for adding the button object.
	 * @property {number} BtnAlignCentre.
	 * @property {number} BtnAlignMiddle.
	 * @property {number} BtnAlignLeft.
	 * @property {number} BtnAlignRight.
	 * @property {number} BtnAlignTop.
	 * @property {number} BtnAlignBottom.
	 * @property {number} BtnInvert.
	 * @property {number} BtnGreyed.
	 * @property {number} BtnHiLitClick.
	 */
	static ButtonOptions = {
		BtnAlignCentre: 0x00,   // default
        BtnAlignMiddle: 0x00,   // default
        BtnAlignLeft: 0x01,
        BtnAlignRight: 0x02,
        BtnAlignTop: 0x04,
        BtnAlignBottom: 0x08,
		BtnInvert: 0x10,   // 'white' on 'black'
        BtnGreyed: 0x20,
        BtnHiLiteClick: 0x40
	}
	
	/**
	 * Used to specify initial checkbox state when adding a checkbox object and to select the display type.
	 * @property {number} CheckboxUnchecked - Initial state unchecked
	 * @property {number} CheckboxChecked - Initial state checked
	 * @property {number} CheckboxDisplayTick - Indicate checked with a tick symbol
	 * @property {number} CheckboxDisplayCross - Indicate checked with a cross
	 */
	static CheckboxOptions = {
        CheckboxUnchecked: 0x0,
        CheckboxChecked: 0x1,    
        CheckboxDisplayTick: 0x2,
        CheckboxDisplayCross: 0x4,
    }
	
	/**
	 * Used to specify the way an InputEcho field echoes user input.
	 * @property {number} EchoNoSpacing - No space between characters.
	 * @property {number} EchoHalfSpacing - Half space.
	 * @property {number} EchoSingleSpacing - Single space.
	 * @property {number} EchoDoubleSpacing - Double space.
	 * @property {number} EchoUnderline - Underline echoed characters.
	 */
	static InputEchoOptions = {
	    EchoNoSpacing: 0x00,
        EchoHalfSpacing: 0x01,
        EchoSingleSpacing: 0x02,
        EchoDoubleSpacing: 0x04,
        EchoUnderline: 0x08
	}
	
	/**
	 * Used to specify graphics primitive type required in calls to {@link addPrimitive} method.
	 * @property {number} Line.
	 * @property {number} Rectangle.
	 * @property {number} Ellipse.
	 */
	static PrimitiveType = {
		Line: 0,
		Rectangle: 1,
		Ellipse: 2
	}
	
	/**
	 * Used to specify options for graphics primitives in calls to {@link addPrimitive} method.
	 * @property {number} LineSolid.
	 * @property {number} LineDashed.
	 * @property {number} Outline.
	 * @property {number} Fill.
	 * @property {number} FillXOR.
	 */
	static PrimitiveOptions = {
		LineSolid: 0x01,
		LineDashed: 0x02,
		Outline: 0x04,
		Fill: 0x08,
		FillXOR: 0x10
	}
	
	#IdRules = {
	    "OBJECT_TEXT": {
			bReqd:false,
			reserved: {"who":this.#setWho.bind(this), "why":this.#setWhy.bind(this), "when":this.#setWhen.bind(this)}
		},
		"OBJECT_BUTTON": {
			bReqd:true,
			reserved: {"ok":this.#onOk.bind(this), "clear":this.#onClear.bind(this), "cancel":this.#onCancel.bind(this), "delete":this.#onDelete.bind(this)}
		},
		"OBJECT_IMAGE": {
			bReqd:true,
			reserved: {"ok":this.#onOk.bind(this), "clear":this.#onClear.bind(this), "cancel":this.#onCancel.bind(this), "delete":this.#onDelete.bind(this)}
		},
		"OBJECT_CHECK_BOX": {
			bReqd:true,
			reserved: {}
		},
		"OBJECT_RADIO_BUTTON": {
			bReqd:true,
			reserved: {}
		},
		"OBJECT_SIGNATURE": {
			bReqd:false,
			reserved: {}
		},
		"OBJECT_INPUT": {
			bReqd:false,
			reserved: {}
		},
		"OBJECT_INPUT_ECHO": {
			bReqd:false,
			reserved: {}
		},
		"OBJECT_HASH": {
			bReqd:false,
			reserved: {}
		},
		"OBJECT_DISPLAY_AT_SHUTDOWN": {
			bReqd:false,
			reserved: {}
		},
		"OBJECT_INKING": {
			bReqd:false,
			reserved: {}
		}		
    };
	
	/**
	 * Adds an item to the pad control list.
	 * @param {ObjectType} type - Type object type to add.
	 * @param {string} id - Specifies an identifier for the object.
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  |
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  |
     *             "top", "middle", "bottom". 	 
	 * @returns {WizardObject} The added object.
	 */
	addObject(type, id, x, y, data, options) {
		switch (type) {			
			case WizCtl.ObjectType.ObjectButton: return this.addObjectButton(id, x, y, data, options);
			case WizCtl.ObjectType.ObjectCheckbox: return this.addObjectCheckBox(id, x, y, data, options);
			case WizCtl.ObjectType.ObjectDisplayAtShutdown: return this.addObjectDisplayAtShutdown(id);
			case WizCtl.ObjectType.ObjectImage: return this.addObjectImage(id, x, y, data, options);	
            case WizCtl.ObjectType.ObjectInking: return this.addObjectInking(id);						
			case WizCtl.ObjectType.ObjectInput: return this.addObjectInput(id, data);
			case WizCtl.ObjectType.ObjectInputEcho: return this.addObjectInputEcho(id, x, y, data, options);
			case WizCtl.ObjectType.ObjectRadioButton: return this.addObjectRadioButton(id, x, y, data, options);			
			case WizCtl.ObjectType.ObjectSignature: return this.addObjectSignature(id, data, options);			
			case WizCtl.ObjectType.ObjectText: return this.addObjectText(id, x, y, data);
		}
		
		return null;
	}
			
	/**
	 * Creates a button – text surrounded by a rectangle which generates a click event when tapped with the pen. Text is displayed in the
     * current font.
	 * @param {string} id - The following values have special meanings when used with a signature or input object:                                 
     *                      ok - Accepts current input. With a signature, stores the captured signature in the signature object and terminates input. 
	 *                           Until a signature has been captured, the button is disabled by the Wizard Control.
     *                           With an Input object, the button is disabled until the required minimum number of characters has been entered.
	 *                      clear - Clears current input allowing user to start again With a signature, clears any captured 'ink' from the display.
     *                              With an Input object, clears all entered input.
	 *                      cancel - With a signature, clears any captured 'ink' and terminates input.
	 *                      delete - With an input object, deletes the last character.
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  
     *             "top", "middle", "bottom". 	 
	 * @param {string} data - Text to display.
	 * @param options - Either, an integer specifying button width in pixels or an ObjectOptions object.                                
     *                  It the given width is less than the width of the text (in the current font), it is ignored (optional). 
	 * @returns {ObjectButton} The added object.
     */	
	addObjectButton(id, x, y, text, options) {
		if (this.mPadMode == WizCtl.#PadMode.PadShutdown) {
			throw "Display already set as shutdown screen: interactive elements not allowed";
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectButton)) {
			throw "Invalid Id";
		} else if(text === "") {
			throw "Empty test";
		} else {
			 let badOptions = false;
             let btnWdth = -1;
             let btnHght = -1;
             let flags = WizCtl.ButtonOptions.BtnAlignCentre | WizCtl.ButtonOptions.BtnAlignMiddle;

			 if (typeof options === 'object' ) {
				 btnWdth = options.width;
				 if (!btnWdth || btnWdth <= 0) {
					 badOptions = true;
				 }
				 
				 btnHght = options.height;
				 if (!btnHght || btnHght <= 0) {
					 badOptions = true;
				 }
				 
				 if (options.flags && !this.#btnAlignOption(options.flags)) {
					 badOptions = true;
				 } else {
					 flags = options.flags;
				 }			 
    		 } else if (typeof options === 'number') {
				 if (options <= 0) {
					 badOptions = true;
				 } else {
					 btnWdth = options;
				 }
			 } else {
				 badOptions = true;
			 }
			 
			 if (badOptions) {
				 throw "Invalid options";
			 } else {
			     const metrics = this.ctx.measureText(text);		
		         const width = metrics.width;
		         const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
				 
				 if (width > btnWdth) {
					 btnWdth = width;
				 }
				 
				 if (height > btnHght) {
					 btnHght = height;
				 }
				 
				 const canvas = document.createElement("canvas");
		         canvas.width = btnWdth;
		         canvas.height = btnHght;
		
		         const ctx = canvas.getContext("2d");
		         ctx.font = this.ctx.font;
		         
				 /*let baseColor;
				 let textColor;
				 
				 if (options.greyed) {
					 textColor = "LightGray";
					 baseColor = "Gray";
				 } else {
					 baseColor = this.mObjectBackgroundColor;
				     textColor = this.mObjectForegroundColor;
				 }
				 
	             if (options.invert) {					 					 
					 ctx.fillStyle = textColor;
				     ctx.strokeStyle = baseColor;
				 } else {
					 ctx.fillStyle = baseColor;
				     ctx.strokeStyle = textColor;
				 }*/					 
				 
				 ctx.fillStyle = this.useColor ? this.config.backColor : "white";
				 ctx.fillRect(0, 0, canvas.width, canvas.height);

                 if (this.config.border.size) {
			         ctx.lineWidth = this.config.border.size;
			         ctx.strokeStyle = this.useColor ? this.config.border.color : "black";
			         ctx.strokeRect(0, 0, canvas.width, canvas.height);
		         }
				 
				 let offsetX = 0;
				 if (flags & WizCtl.ButtonOptions.BtnAlignLeft) {                 
				     offsetX = 0;
                 } else if (flags & WizCtl.ButtonOptions.BtnAlignRight) {
                     offsetX = canvas.width - width;					
				 } else {
					 offsetX = Math.floor(canvas.width/2 - width/2);					
				 }
				 
				 let offsetY = 0;
                 if (flags & WizCtl.ButtonOptions.BtnAlignTop) {
                     offsetY = 0;
				 } else if (flags & WizCtl.ButtonOptions.BtnAlignBottom) {
                     offsetY = 0; // fix this
                 } else {
					 offsetY = 0; // fix this
				 }
  
                 ctx.fillStyle = this.useColor ? this.config.font.color : "black";
                 ctx.fillText(text, offsetX, metrics.fontBoundingBoxAscent);
	
				 const position = this.#getPosition(x, y, canvas.width, canvas.height);
                 const buttonObject = {
				     "id":id,
				     "type":WizCtl.ObjectType.ObjectButton,
				     "rect":new this.sigSDK.Rectangle(position.x, 
					                                                position.y, 
																	position.x+canvas.width-1, 
																	position.y+canvas.height-1),	
					 "image":canvas,
					 "painted":false,
					 "font":ctx.font,
				     "backColor": this.mObjectBackgroundColor,
				     "foreColor": this.mObjectForegroundColor,
					 "text": text,
					 "flags": flags,
					 "config":JSON.parse(JSON.stringify(this.config))
				 }				 
			     this.objects.push(buttonObject);		
					
                 if (this.mPadMode == WizCtl.#PadMode.PadIndeterminate) {
					 this.mPadMode = WizCtl.#PadMode.PadInteractive;
				 }

                 return buttonObject;				 
			 }
		}

        return null;		
	}
	
	/**
	 * Creates a checkbox – a small rectangle followed by text which toggles its state and generates an event when tapped with the pen.
     * Text is displayed in the current font.
	 * @param {string} id - Cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete.
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  
     *             "top", "middle", "bottom". 	 
	 * @param {string} data - Text to display.
	 * @param options - A combination of values from the CheckboxOptions enum (Optional).
	 * @returns {ObjectCheckbox} The added object.
     */	
	addObjectCheckBox(id, x, y, text, options) {
		let option = WizCtl.CheckboxOptions.CheckboxUnchecked;
		
		if (options) {
			if (!this.#checkboxOption(options)) {
				throw "Invalid options";
			} else {
				option = options;
			}			
		}
		
		if (this.mPadMode == WizCtl.#PadMode.PadShutdown) {
		    throw "Display already set as shutdown screen: interactive elements not allowed";
		} else if (this.mPadMode == WizCtl.#PadMode.PadInking) {
			throw "Incompatible mode"
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectCheckbox)) {
			throw "Invalid id";
		} else if (text === "") {
			throw "Empty test";
		} else if (!this.ctx) {
			throw "Not drawing context";
		} else {
			let checkboxFont;
			if (this.config.checkbox && this.config.checkbox.size) {
				this.ctx.font = this.#getFont({size:this.config.checkbox.size});
			}
			checkboxFont = this.ctx.font;
			
			let metrics = this.ctx.measureText("\u2610 ");
			const offsetX = metrics.width;		
            const width = metrics.width;
            const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
			
			metrics = this.ctx.measureText("\u2610");
			const checkBoxWidth = metrics.width;
			const checkBoxHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;			
			
			const position = this.#getPosition(x, y, width, height);
			
			if (this.config.checkbox && this.config.checkbox.size) {
				this.ctx.font = this.#getFont({size:this.config.font.size});
			}

            //draw the text
			const textObject = this.addObjectText("", Math.floor(x+offsetX), Math.floor(y), text);										            
			const textObjectHeight = textObject.rect.lowerRightYpixel - textObject.rect.upperLeftYpixel;
			
			const checkObject = {
				"id":id,
				"type":WizCtl.ObjectType.ObjectCheckbox,
				"checked":(option & WizCtl.CheckboxOptions.CheckboxChecked),
				"style":(option & ~WizCtl.CheckboxOptions.CheckboxChecked),
				"font":checkboxFont,
				"rect":new this.sigSDK.Rectangle(position.x, 
				                                               Math.floor(position.y-Math.trunc((checkBoxHeight-textObjectHeight)/2)), 
															   Math.floor(position.x+checkBoxWidth), 
															   Math.floor(position.y-((checkBoxHeight-textObjectHeight)/2)+checkBoxHeight)),		   
				"backColor": this.mObjectBackgroundColor,
				"foreColor": this.mObjectForegroundColor,
				"text":text
			}
			this.objects.push(checkObject);		
			
			//draw the checkbox				
			this.#drawState(checkObject);	           
			
			return checkObject;
		}
		
		return null;
	}
	
	/**
	 * Causes the current control set to remain displayed on the pad following disconnection.
	 * @param {string} id - Optional, cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete. 
	 * @returns {ObjectWizard} The added object.
	 */
	addObjectDisplayAtShutdown(id) {
		if ((this.mPadMode != WizCtl.#PadMode.PadIndeterminate) && (this.mPadMode != WizCtl.PadMode.PadShutdown)) {
			throw "Objects already set include interactive elements (not allowed on shutdown screen)";
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectDisplayAtShutdown)) {
			throw "Invalid Id";
		} else {
			this.mPadMode = WizCtl.#PadMode.PadShutdown;
		}
        
        return {"id":id, "type":WizCtl.ObjectType.ObjectDisplayAtShutdown};		
	}
	
	/**
	 * Displays an image on the pad. The image can optionally be made clickable in which case click events are generated when the image is
     * tapped with the pen.
	 * @param {string} id - The following values have special meanings when used with a signature or input object:                                 
     *                      ok - Accepts current input. With a signature, stores the captured signature in the signature object and terminates input. 
	 *                           Until a signature has been captured, the button is disabled by the Wizard Control.
     *                           With an Input object, the button is disabled until the required minimum number of characters has been entered.
	 *                      clear - Clears current input allowing user to start again With a signature, clears any captured 'ink' from the display.
     *                              With an Input object, clears all entered input.
	 *                      cancel - With a signature, clears any captured 'ink' and terminates input.
	 *                      delete - With an input object, deletes the last character.
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  
     *             "top", "middle", "bottom". 	 
	 * @param {string} img - Image to display.
	 * @param options - Optional object with the dimensions to use for the images:
     *                  width - number with the width that will be drawn the image, if not defined it will take the image's orignal width. 
	 *                  height - number with the height that will be drawn the image, if not defined it will take the image's original height.					
	 * @returns {ObjectImage} The added object.
     */
	addObjectImage(id, x, y, img, options) {
		if (this.mPadMode == WizCtl.#PadMode.PadShutdown) {
			throw "Display already set as shutdown screen: interactive elements not allowed";
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectImage)) {
			throw "Invalid Id";
		} else if(!img) {
			throw "Empty image";
		} else {
			const canvas = document.createElement("canvas");
		    canvas.width = options && options.width ? options.width : img.width;
		    canvas.height = options && options.height ? options.height : img.height;
			
			const ctx = canvas.getContext("2d");
			ctx.fillStyle = this.config.backColor;
		    ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);					    
			
			const position = this.#getPosition(x, y, canvas.width, canvas.height);
            const imageObject = {
				"type":WizCtl.ObjectType.ObjectImage,
				"rect":new this.sigSDK.Rectangle(position.x, 
				                                               position.y, 
															   position.x+canvas.width-1, 
															   position.y+canvas.height-1),																		   
				"image": canvas,
				"painted":false
			}
			
			if (id) {
			    imageObject.id = id;													
			}
			this.objects.push(imageObject);					

            if (this.mPadMode == WizCtl.#PadMode.PadIndeterminate) {
			    this.mPadMode = WizCtl.#PadMode.PadInteractive;
			}		

            return imageObject;			
		}				
		
		return null;
	}
	
	/**
	 * Provides a mechanism for capturing pad 'ink' as an image.
	 * @param {string} id - Optional, cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete. 
	 * @returns {ObjectWizard} The added object.
	 */
	addObjectInking(id) {
		if ((this.mPadMode == WizCtl.#PadMode.PadSigning) || 
		    (this.mPadMode == WizCtl.#PadMode.PadShutdown) || 
			(this.mPadMode == WizCtl.#PadMode.PadInking)) {
			throw "Already setted incompabitle objects";
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectInking)) {
			throw "Invalid Id";
		} else {
			this.mPadMode = WizCtl.#PadMode.PadInking;
			this.inkingCanvas = document.createElement("canvas");
		    this.inkingCanvas.width = this.mCapability.screenWidth;
		    this.inkingCanvas.height = this.mCapability.screenHeight;
			const inkingObject = {"id":id, 
		                          "type":WizCtl.ObjectType.ObjectInking};		
            this.objects.push(inkingObject);
		    return inkingObject;
		}
		
		return null;
	}
	
	/**
	 * Provides an input mechanism for PIN code entry.
	 * @param {string} id - Optional, cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete. 
	 * @param data - Object with a field called minLength for the minimum accepted lenght and maxLength for the maximum.
	 * @returns {ObjectInput} The added object.
	 */
	addObjectInput(id, data) {
	    if (this.mInput) {
			throw "Multiple inputs";
		} else if (this.mSig) {
			throw "Input is incompatible with signature object";
		} else if (this.mPadMode == WizCtl.#PadMode.PadShutdown) {
			throw "Display already set as shutdown screen: interactive elements not allowed";
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectInput)) {
			throw "Invalid Id";
		} else if (!data instanceof Object) {
			throw "Invalid input object";
		} else {
			this.mInput = data;
			if (!data.maxLength) {
				data.maxLength = 4;			
			}
			
			if (!data.minLength) {
				data.minLength = 0;
			}
			
			this.mInput.input = "";
			this.mPadMode = WizCtl.#PadMode.PadInput;
			
			const inputObject = {"id":id,
			                     "type":WizCtl.ObjectType.ObjectInput,
					             "minLength":data.minLength,
					             "maxLength":data.maxLength};
					
			this.objects.push(inputObject);																						   
			return inputObject;
		}
	}
	
	/**
	 * Specifies location of and character to use for ObjectInput 'echo'.
	 * @param {string} id - Optional, cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete. 
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  
     *             "top", "middle", "bottom". 	 
	 * @param data - Character to be used for each button press.
	 * @param options - A combination of values from the InputEchoOptions enum (optional).
	 * @returns {ObjectWizard} The added object.
	 */
	addObjectInputEcho(id, x, y, data, options) {
		if (!this.mInput) {
			throw "There is no input object";
		} else if ((data) && (data.length != 1)) {
			throw "data parameter should be either empty or a single char";
		} else {
			// no needed more checks as we did it when added input object
            let spacing = 0;         
			const spacingMask = WizCtl.InputEchoOptions.EchoNoSpacing | 
			                    WizCtl.InputEchoOptions.EchoHalfSpacing | 
								WizCtl.InputEchoOptions.EchoSingleSpacing | 
								WizCtl.InputEchoOptions.EchoDoubleSpacing;
								
            switch (options & spacingMask) {
                case WizCtl.InputEchoOptions.EchoNoSpacing: spacing = 0.0; break; 
                case WizCtl.InputEchoOptions.EchoHalfSpacing: spacing = 0.5; break;
                case WizCtl.InputEchoOptions.EchoSingleSpacing: spacing = 1.0; break;
                case WizCtl.InputEchoOptions.EchoDoubleSpacing: spacing = 2.0; break;
            }			
			
			const putUnderline = options & WizCtl.InputEchoOptions.EchoUnderline;
			let metrics = this.ctx.measureText("_");			        
							
		    for (var i=0; i<this.mInput.maxLength; i++) {				
			    const canvas = document.createElement("canvas");
	            canvas.width = metrics.width + 1;
	            canvas.height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + 1;
		
	            const ctx = canvas.getContext("2d");
	            ctx.font = this.ctx.font;						
	            ctx.fillStyle = this.useColor ? this.config.backColor : "white";
	            ctx.fillRect(0, 0, canvas.width, canvas.height);
		
	            ctx.fillStyle = this.useColor ? this.config.borderColor : "black";	
				ctx.fillText(i==0||putUnderline?"_":" ", 0, metrics.fontBoundingBoxAscent);
				
                const position = this.#getPosition(x, y, canvas.width, canvas.height);			        
	            const newX = position.x+(i*metrics.width)+(i*spacing*metrics.width);
	            const inputEchoObject = {
			         "id":id,
			         "type":WizCtl.ObjectType.ObjectInputEcho,
			         "rect":new this.sigSDK.Rectangle(newX, position.y, newX+canvas.width-1, position.y+canvas.height-1),																   
				     "image":canvas,
				     "painted":false,
					 "index":i,
					 "font":ctx.font,
					 "backColor": this.config.backColor,
			         "foreColor": this.config.borderColor,
					 "putUnderline": putUnderline,
					 "data":data
					 
			    }				 
                this.objects.push(inputEchoObject);																						   
			}			
		}
	}
	
	/**
	 * Creates a radio button – a small circle followed by text. Radio buttons are used in groups where tapping on one with the pen selects it
     * and deselects the currently selected button in the group. Tapping with the pen also generates an event. 
	 * Text is displayed in the current font.
	 * @param {string} id - Cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete.
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  
     *             "top", "middle", "bottom". 	 
	 * @param {string} text - Text to display.
	 * @param options - Specifying the name of the group to which this radio button belongs and, optionally,                            |       
     *                  whether this option is initially selected. 
	 * @returns {ObjectRadioButton} The added object.
     */	
	addObjectRadioButton(id, x, y, text, options) {		
		if (this.mPadMode == WizCtl.#PadMode.PadShutdown) {
		    throw "Display already set as shutdown screen: interactive elements not allowed";
		} else if (this.mPadMode == WizCtl.#PadMode.PadInking) {
			throw "Incompatible mode"
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectRadioButton)) {
			throw "Invalid id";
		} else if (text === "") {
			throw "Empty test";
		} else if ((!options) || (!options.Group)) {
			throw "Invalid group";
		} else {
			let radioFont;
			if (this.config.radiobutton && this.config.radiobutton.size) {
				this.ctx.font = this.#getFont({size:this.config.radiobutton.size});
			}
			radioFont = this.ctx.font;
			
			let metrics = this.ctx.measureText("\u25EF ");
			const offsetX = metrics.width;
			const width = metrics.width;
            const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
			
			metrics = this.ctx.measureText("\u25EF");
			const radioButtonWidth = metrics.width;
			const radioButtonHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;			
			
			const position = this.#getPosition(x, y, width, height);
			
			if (this.config.radiobutton && this.config.radiobutton.size) {
				this.ctx.font = this.#getFont({size:this.config.font.size});
			}
			
			//draw the text
			const textObject = this.addObjectText("", Math.floor(position.x+offsetX), position.y, text);										            
			const textObjectHeight = textObject.rect.lowerRightYpixel - textObject.rect.upperLeftYpixel;
						
			const radioObject = {
				"id":id,
				"type":WizCtl.ObjectType.ObjectRadioButton,
				"group":options.Group,
				"checked":options.Checked,
				"font":radioFont,
				"rect":new this.sigSDK.Rectangle(position.x,
                                 				               Math.floor(position.y-Math.trunc((radioButtonHeight-textObjectHeight)/2)), 
															   Math.floor(position.x+radioButtonWidth), 
															   Math.floor(position.y-((radioButtonHeight-textObjectHeight)/2)+radioButtonHeight)),
				"backColor": this.mObjectBackgroundColor,
				"foreColor": this.mObjectForegroundColor,
				"text":text
			}
			this.objects.push(radioObject);		
			
			if (radioObject.checked) {
				// this is to unckeck any other possible checked value
				radioObject.checked = false;
				this.#selectRadioButton(radioObject);
			} else {
			    this.#drawState(radioObject);	           
			}
			
			return radioObject;
		}
		
		return null;
	}			
		
	/**
	 * Puts the pad into signature capture mode and specifies a signature object or control in which a captured signature is saved. 
	 * It is an error to add more than one ObjectSignature to the current control list.
	 * @param {string} id - Cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete.
	 * @param signature - Signature SDK object with a valid licence.
	 * @param options - Object with the integrity type or hash to attach to the signature. It is optional.
	 * @returns {ObjectSignature} The added object.
     */	
	addObjectSignature(id, sigSDK, signature, options) {
		if ((this.mPadMode != WizCtl.#PadMode.PadIndeterminate) && (this.mPadMode != WizCtl.PadMode.PadSigning)) {
			throw "Already setted incompabitle objects";
		} else if (!this.#idOK(id, WizCtl.ObjectType.ObjectSignature)) {
			throw "Invalid Id";
		} else if (!signature) {
			throw "Invalid signature object";
		} else {
			this.mPadMode = WizCtl.#PadMode.PadSigning;			
			this.sigSDK = sigSDK;
			this.mSigObj = signature;
			this.mSigOptions = options;			
		}				
        
		const signatureObject = {"id":id, 
		                         "type":WizCtl.ObjectType.ObjectSignature};		
        this.objects.push(signatureObject);
		return signatureObject;
	}
	
	/**
	 * Displays a text string on the pad using the current properties.
	 * @param {string} id - The following values have special meanings when used with a signature object:
     *                      who - Text in Data will also be used as name of signatory.
     *                      why - Text in Data will also be used as reason for signing.
     *                      when - Reserved for future use
     *                      Can be null or an empty string and cannot be any of the values reserved for text or button objects:
     *                      who, why, ok, clear, cancel, delete.
	 * @param x - Position of the left corner of the object on the pad display. 
	 *            Value can either be absolute position in pixels, or one of the strings:                                                  
     *            "left", "right", "centre". 
     * @param  y - Position of the top corner of the object on the pad display. 
	 *             Value can either be absolute position in pixels, or one of the strings:                                                  
     *             "top", "middle", "bottom". 	 
	 * @param {string} text - Text to display.
	 * @returns {WizardObject} The added object.
     */		
	addObjectText(id, x, y, text) {
		if(text === "") {
			throw "Empty text";
		}
		
		if (!this.#idOK(id, WizCtl.ObjectType.ObjectText)) {
			throw "Invalid Id";
		}
		
		if (!this.ctx) {
			throw "Not drawing context";
		}	

		let lines = [];				
		let maxLine = 0;		
		let maxLineIndex = 0;
		let offsetX = 0;
		if (typeof x == 'number') {
			offsetX = x; 
		}
		const texts = text.split("\n");	
		for (var i=0; i<texts.length; i++) {			
			let newText = texts[i];
			let textSize = newText.length;
			let acumulate = 0;
		    do {
                const lineWidth = this.#getFirstLineWidth(newText, this.mCapability.screenWidth - offsetX);
			    const line = newText.substring(0, lineWidth).trim();
                if (line.length > maxLine) {
				    maxLineIndex = lines.length;
				    maxLine = line.length;
			    }				
			    lines.push(line);
			    newText = newText.substring(lineWidth);			
			    acumulate += lineWidth;						
		    } while (acumulate < textSize);     
		}   		
		
		const metrics = this.ctx.measureText(lines[maxLineIndex]);
		const lineHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
		const width = metrics.width;
		const height = lineHeight*lines.length;		
		
		const position = this.#getPosition(x, y, width, height);
		for (var i=0; i<lines.length; i++) {
			const line = lines[i];
		    let metrics = this.ctx.measureText(line);
            let borderWidth = 0;
		    if (this.config.border.size) {
			    borderWidth = this.config.border.size;
		    }
		
		    let canvas = document.createElement("canvas");								
		    canvas.width = metrics.width + (borderWidth*2) + 1;
		    canvas.height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + (borderWidth*2) + 1;		
		    let ctx = canvas.getContext("2d");
		    ctx.imageSmoothingEnabled = false;			
			ctx.fontSmooth = "never";
		    ctx.font = this.ctx.font;
		
		    ctx.fillStyle = this.useColor ? this.config.backColor : "white";
		    ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		    ctx.fillStyle = this.useColor ? this.config.font.color : "black";
		    ctx.fillText(line, borderWidth, metrics.fontBoundingBoxAscent + borderWidth);
		
		    if (this.config.border.size) {
			    ctx.lineWidth = this.config.border.size;
			    ctx.strokeStyle = this.useColor ? this.config.border.color : "black";
			    ctx.strokeRect(0, 0, canvas.width, canvas.height);
		    }
		
		    //const image = canvas.toDataURL("image/png");
		
		    const textObject = {
			   	         "id":id,
				         "type":WizCtl.ObjectType.ObjectText,
				         "rect":new this.sigSDK.Rectangle(position.x, 
						                                                position.y+(lineHeight*i), 
																		position.x+canvas.width-1, 
																		position.y+canvas.height-1+(lineHeight*i)),																   
					     "image":canvas,
					     "painted":false
				    }				 
	        this.objects.push(textObject);																						   
				
		    let reserved = this.#IdRules[WizCtl.ObjectType.ObjectText].reserved[id];
            if (reserved) {
			    reserved(text);
		    }
            return textObject;			
		}
		
		return null;
	}
	
	/**
	 * Adds a graphics primitive item to the internal list.
	 * @param {WizCtl.PrimitiveType} type - The type of the primitive.
	 * @param {Integer} x1, y1 - If type is PrimitiveLine, start position of line, otherwise position
     *                           of top-left corner of bounding rectangle of item. Value can be
     *                           the absolute position in pixels or one of the strings "left", "right",
     *                           "centre" (for X1) or "top", "middle", "bottom" (for Y1).
	 * @param {Integer} x2, y2 - If type is PrimitiveLine, end position of line, otherwise position
     *                           of bottom-right corner of bounding rectangle of item. Value can
     *                           be the absolute position in pixels, one of the strings "left", "right",
     *                           "centre" (for X2) or "top", "middle", "bottom" (for Y2) or a string
     *                           in the format "+V" or " V" (where V is an integer) for a value
     *                           relative to X1 or Y1. 
	 * @param {Float} lineWidth - line width in pixels (Optional, default value 1)
	 * @param {Integer} options - Combination of PrimitiveOptions values (Optional,
     *                            default value LineSolid + Outline)
	 * @returns {WizardObject} The added object.
	 */	
	addPrimitive(type, x1, y1, x2, y2, lineWidth = 1, options) {
		
		if (x1 == "left") {
		    x1 = 0;
		} else if (x1 == "centre") {
		    x1 = this.mCapability.screenWidth/2;
		} else if (x1 == "right") {
		    x1 = this.mCapability.screenWidth;
		}		
		x1 = Math.floor(x1);
		
		if (y1 == "top") {
		    y1 = 0;
		} else if (y1 == "middle") {
		    y1 = this.mCapability.screenHeight/2;
		} else if (y1 == "bottom") {
		    y1 = this.mCapability.screenHeight;
		}
		y1 = Math.floor(y1);
		
		if (x2 == "left") {
		    x2 = 0;
		} else if (x2 == "centre") {
		    x2 = this.mCapability.screenWidth/2;
		} else if (x2 == "right") {
		    x2 = this.mCapability.screenWidth;
		}		
		x2 = Math.floor(x2);
		
		if (y2 == "top") {
		    y2 = 0;
		} else if (y2 == "middle") {
		    y2 = this.mCapability.screenHeight/2;
		} else if (y2 == "bottom") {
		    y2 = this.mCapability.screenHeight;
		}
		y2 = Math.floor(y2);
		
		switch (type) {
	        case WizCtl.PrimitiveType.Line:
			     if (options) {
			         if (!this.#lineOption(options)) {
		                 throw "Parameter options invalid";
		             }
				 } else {
					 options = WizCtl.PrimitiveOptions.LineSolid;
				 }
		         break;
		    case WizCtl.PrimitiveType.Rectangle:
			case WizCtl.PrimitiveType.Ellipse:
			     if (options) {
					 if (!this.#shapeOption(options)) {
		                 throw "Parameter options invalid";
		             }
				 } else {
			         options = WizCtl.PrimitiveOptions.LineSolid | WizCtl.PrimitiveOptions.Outline;
				 }
			     break;
		}			
		
		const canvas = document.createElement("canvas");
		canvas.width = x2-x1>lineWidth?x2-x1:lineWidth;
		canvas.height = y2-y1>lineWidth?y2-y1:lineWidth;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = this.config.backColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = lineWidth;			
		ctx.strokeStyle = this.useColor ? this.config.borderColor : "black";
		ctx.fillStyle = this.useColor ? this.config.fillColor : "black";
		
        if (options & WizCtl.PrimitiveOptions.LineDashed) {
			ctx.setLineDash([lineWidth]);
		}		

		switch (type) {
			case WizCtl.PrimitiveType.Line:			     
				 ctx.beginPath();
				 ctx.moveTo(0, 0);
				 ctx.lineTo(x2-x1, y2-y1);
				 ctx.stroke();
			     break;
		    case WizCtl.PrimitiveType.Rectangle:
			     if (options & WizCtl.PrimitiveOptions.Fill) {
					 if (options & WizCtl.PrimitiveOptions.LineDashed) {
						 ctx.fillRect(lineWidth/2, lineWidth/2, x2-x1-lineWidth, y2-y1-lineWidth);
					 } else {
					     ctx.fillRect(0, 0, x2-x1, y2-y1);
					 }
				 }	 
				 if ((options & WizCtl.PrimitiveOptions.LineSolid) ||
                     (options & WizCtl.PrimitiveOptions.LineDashed)) {
					 ctx.strokeRect(0, 0, x2-x1, y2-y1);
		         }			     
			     break;
		    case WizCtl.PrimitiveType.Ellipse:
			    if (options & WizCtl.PrimitiveOptions.Fill) {
					if ((options & WizCtl.PrimitiveOptions.LineSolid) ||
                        (options & WizCtl.PrimitiveOptions.LineDashed)) {
					        ctx.beginPath();
					        ctx.ellipse((x2-x1)/2, (y2-y1)/2, (x2-x1)/2-lineWidth, (y2-y1)/2-lineWidth, Math.PI / 4, 0, 2 * Math.PI);
                            ctx.fill();
							
							ctx.beginPath();
						    ctx.ellipse((x2-x1)/2, (y2-y1)/2, (x2-x1-lineWidth)/2, (y2-y1-lineWidth)/2, Math.PI / 4, 0, 2 * Math.PI);
                            ctx.stroke();
					} else {
						ctx.beginPath();
						ctx.ellipse((x2-x1)/2, (y2-y1)/2, (x2-x1)/2, (y2-y1)/2, Math.PI / 4, 0, 2 * Math.PI);
                        ctx.fill();
					}
				} else {
				    ctx.beginPath();
					ctx.ellipse((x2-x1)/2, (y2-y1)/2, (x2-x1-lineWidth)/2, (y2-y1-lineWidth)/2, Math.PI / 4, 0, 2 * Math.PI);
                    ctx.stroke(); 
				}					 
			    break;
		}
		
		const primitiveObject = {
		    "type":WizCtl.ObjectType.ObjectPrimitive,
			"rect":new this.sigSDK.Rectangle(x1, y1, x2-x1>lineWidth?x2-1:x1+lineWidth-1, y2-y1>lineWidth?y2-1:y1+lineWidth-1),																		   
			"image": canvas,
			"painted": false
		}
			
		this.objects.push(primitiveObject);	

        return primitiveObject;		
	}
	
	/**
	 * Clears current display contents, turns on backlight (if not already on), 
	 * updates display with all buffered objects and primitives and enables event handling.
	 * @param {bool} showWait - Indicates if it will show a wait hourglass while the image is drawed on the STU device.
	 */
	async display(showWait) { 
	    if (showWait) {
			showWait = this.supportsArea;
		}
	    if (this.config.forceMonochrome) {
            this.mEncodingMode = this.sigSDK.EncodingMode.EncodingMode_1bit; 
			this.useColor = false;
		}
		    
	    /*const encrypted = (this.config.encrypted != undefined) && (this.config.encrypted);
	    if (encrypted) {
			await this.stopEncryption();
		}*/
	
		if (showWait) {
			await this.#drawWait();						
		}				
		
		await this.#draw(showWait);				
		
		for (var i=0; i<this.objects.length; i++) {
			if (this.mInput) {
			    if (this.objects[i].id && this.objects[i].id.length == 1) {
					this.objects[i].handleInput = true;
				}				
			}				
		}
		
		if ((this.mPadMode == WizCtl.#PadMode.PadSigning) || 
		    (this.mPadMode == WizCtl.#PadMode.PadInking)) {
			await this.stuDevice.setInkingMode(this.sigSDK.InkingMode.On);	  	  
		} else {
			await this.stuDevice.setInkingMode(this.sigSDK.InkingMode.Off);	  	  
		}
		
		/*if (encrypted) {
			await this.startEncryption();
		}*/
	}
	
	/**
	 * Simulates 'click' on an object (button, checkbox, image etc). Allows, for example, a signature to be accepted by clicking a button on the
     * browser screen rather than taping the OK button on the pad.
	 * @param {string} id - Id of pad control for which to simulate click.
	 */
	async fireClick(id) {
		for (var i=0; i<this.objects.length; i++) {
			if (this.objects[i].id == id) {
				const object = this.objects[i];
				if (object.type == WizCtl.ObjectType.ObjectCheckbox) {
				    if (object.checked == 0) {
					    object.checked = 1;
					} else {
					    object.checked = 0;
					}
					this.#drawState(object);							
					await this.#draw();
				} else if (object.type == WizCtl.ObjectType.ObjectRadioButton) {
				    this.#selectRadioButton(object);
					await this.#draw();
				} else {				
				    const reserved = this.#IdRules[this.objects[i].type].reserved[id];
                    if (reserved) {
					    if (!await reserved()) {
				            if (this.objects[i].onClick) {
					            this.objects[i].onClick(this.objects[i]);
				            }		
					    }
				    } else {
					    if (this.objects[i].onClick) {
					        this.objects[i].onClick(this.objects[i]);
				        }
					}
				}					
			}				
		}
	}
	
	/**
	 * Connects to the signature tablet / pad.
	 * @param options - optional object with the fields:
     *                  encryptionHandler - Encryption handler for old stu devices.
     *                 	encryptionHandler2 - Encryption handler for recent stu devices.
	 */
	async padConnect(hidDevice) {        
	    this.stuDevice = new this.sigSDK.STUDevice(hidDevice);    
		//hidDevice.addEventListener("inputreport", this.stuDevice.onInputReport.bind(this.stuDevice));
	    try {
			//this.stuDevice.setPenDataHandler(this.sigSDK.PenDataHandler.implement(this));
			this.stuDevice.addPenDataListener(this.sigSDK.PenDataType.PEN_DATA, this.onPenData.bind(this));
            this.stuDevice.addPenDataListener(this.sigSDK.PenDataType.PEN_DATA_OPTION, this.onPenDataOption.bind(this));
            this.stuDevice.addPenDataListener(this.sigSDK.PenDataType.PEN_DATA_TIME_COUNT_SEQUENCE, this.onPenDataTimeCountSequence.bind(this));
            this.stuDevice.addPenDataListener(this.sigSDK.PenDataType.PEN_DATA_ENCRYPTED, this.onPenDataEncrypted.bind(this));
            this.stuDevice.addPenDataListener(this.sigSDK.PenDataType.PEN_DATA_ENCRYPTED_OPTION, this.onPenDataEncryptedOption.bind(this));
            this.stuDevice.addPenDataListener(this.sigSDK.PenDataType.PEN_DATA_TIME_COUNT_SEQUENCE_ENCRYPTED, this.onPenDataTimeCountSequenceEncrypted.bind(this));			
			
	        await this.stuDevice.connect(true);
	        this.mCapability = await this.stuDevice.getCapability();
	        this.mInformation = await this.stuDevice.getInformation();
	        this.mInkThreshold = await this.stuDevice.getInkThreshold();
			this.#setEncoding();						
	  
	        try {
		        await this.stuDevice.setPenDataOptionMode(this.sigSDK.PenDataOptionMode.TimeCountSequence);	
	        } catch (e) {
	        }	

			await this.stuDevice.setClearScreen();					
			await this.stuDevice.setInkingMode(this.sigSDK.InkingMode.Off);	  	  									
	    } catch (e) {
	        console.log(e);
	        return false;
	    }
		
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.mCapability.screenWidth;
		this.canvas.height = this.mCapability.screenHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = this.#getFont();				
		this.mScaleX = this.mCapability.screenWidth / this.mCapability.tabletMaxX;
	    this.mScaleY = this.mCapability.screenHeight / this.mCapability.tabletMaxY;
		
		this.supportsArea = this.#supportsWriteImageArea();
		this.connected = true;		
	    return true;
	}
	
	/**
	 * Disconnects the signature tablet / pad.
	 **/
	async padDisconnect() {
		// Ensure that you correctly disconnect from the tablet, otherwise you are 
        // likely to get errors when wanting to connect a second time.
		this.connected = false;
        if (this.stuDevice != null) {			
	        if (this.mIsEncrypted) {
	            await this.stuDevice.endCapture();
		        this.mIsEncrypted = false;
	        }		
		
	        await this.stuDevice.setInkingMode(this.sigSDK.InkingMode.Off);
			
			if (this.mPadMode != WizCtl.#PadMode.PadShutdown) {			
	            await this.stuDevice.setClearScreen();
			}
			
	        await this.stuDevice.disconnect();
		    delete this.stuDevice;
		    this.stuDevice = null;			
        }	
	}
	
	/**
	 * Returns the pad model name.
	 **/
	padModelName() {
		if (this.mInformation) {
			return this.mInformation.modelName;
		}
		return "";
	}
	
	/**
	 * Returns the pad screen's height.
	 **/
	padHeight() {
		if (this.mCapability) {
			return this.mCapability.screenHeight;
		}
		return 0;
	}
	
	/**
	 * Returns the pad screen's width.
	 **/
	padWidth() {
		if (this.mCapability) {
			return this.mCapability.screenWidth;
		}
		return 0;
	}
	
	/**
	 * Disables events, removes all internal controls and prepares for setting the display. 
	 * @param {bool} clear - If true clears the screen, otherwise does not change the current display.
	 */
	async reset(clear=true) {
		this.objects = [];
		this.mPadMode = WizCtl.#PadMode.PadIndeterminate;
		this.mObjectForegroundColor = "black";
		this.mObjectBackgroundColor = "white";
		this.mFont = {};		
		this.mInput = null;
		this.mPenEvents = [];
		this.mResolvers = [];
		this.mPromises = [];
		this.penDatas = [];		
		this.mPenData = [];
		this.mObject = null;
		this.mSigObj = null;
	    this.mSigOptions = null;
		this.emptyWaitCanvas = null;
		this.emptyWaitRect = null;
		this.inkingCanvas = null;		
		
		if (this.mirrorCanvas) {
			const div = document.getElementById(this.config.mirrorDiv.id);
			div.removeChild(this.mirrorCanvas);
			this.mirrorCanvas = null;
		}
		
		if (clear) {
			if (this.stuDevice) {
			  await new Promise(resolve => setTimeout(resolve, 100));
			  await this.stuDevice.setClearScreen();
			}
			
			if (this.config.mirrorDiv) {
				this.ctx.fillStyle = "white";
			    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
				this.ctx.drawImage(this.canvas, 0, 0);
		    }
		}
		
		this.config = {
			font: {name:"Verdana", size:"10px", color:"black"},
			border: {color:"black", style:"none"},
			backColor: "white",
			borderColor: "black",
			fillColor: "white",
            pushed: {
				font: {color:"white"},
				border: {color:"white"},
				backColor: "black",
				borderColor: "white",
				fillColor: "white"
			}
		};				
		this.#setEncoding();
	}
	
	/**
	 * Set some configuration parameters.
	 */
	async setProperty(config) {
		this.#mapConfig(config, this.config);
		
		if (config.pushed) {
			if (!this.config.pushed) {
				this.config.pushed = {};
			}
			this.#mapConfig(config.pushed, this.config.pushed);
		}
		
		if (this.ctx) {
		    this.ctx.font = this.#getFont();
		}

        if (this.config.encrypted != undefined) {
			if (this.config.encrypted) {
				if (!this.mIsEncrypted) {
					await this.#startEncryption();
				}
			} else {
				if (this.mIsEncrypted) {
					await this.#stopEncryption();
				}
			}
		}			
	}
	
	#mapConfig(src, dst) {
		if (src.font) {
			if (!dst.font) {
				dst.font = {};
			}
			if (src.font.name) {
				dst.font.name = src.font.name;
			}
			if (src.font.size) {
				dst.font.size = src.font.size;
			}
			if (src.font.style) {
				dst.font.style = src.font.style;
			}
			if (src.font.color) {
				dst.font.color = src.font.color;
			}						
		}
		
		if (src.border) {
			if (!dst.border) {
				dst.border = {};
			}
			if (src.border.size) {
				dst.border.size = src.border.size;
			}				
			if (src.border.color) {
				dst.border.color = src.border.color;
			}
			if (src.border.style) {
				dst.border.style = dst.border.style;
			}
		}
		
		if (src.checkbox) {
			if (!dst.checkbox) {
				dst.checkbox = {};
			}
			
			if (src.checkbox.size) {
				dst.checkbox.size = src.checkbox.size;
			}
		}

        if (src.radiobutton) {
			if (!dst.radiobutton) {
				dst.radiobutton = {};
			}
			
			if (src.radiobutton.size) {
				dst.radiobutton.size = src.radiobutton.size;
			}
		}			
		
		if (src.backColor) {
			dst.backColor = src.backColor;
		}
		
		if (src.borderColor) {
			dst.borderColor = src.borderColor;
		}
		
		if (src.fillColor) {
			dst.fillColor = src.fillColor;
		}
		
		if (src.mirrorDiv) {
			if (!dst.mirrorDiv) {
				dst.mirrorDiv = {};
			}
			if (src.mirrorDiv.id) {
			    dst.mirrorDiv.id = src.mirrorDiv.id;
			}
			if (src.mirrorDiv.width) {
				dst.mirrorDiv.width = src.mirrorDiv.width;
			}
			if (src.mirrorDiv.height) {
				dst.mirrorDiv.height = src.mirrorDiv.height;
			}
			if (src.mirrorDiv.enable !== undefined) {
				dst.mirrorDiv.enable = src.mirrorDiv.enable;
			}
		}
		
		if (src.encrypted !== undefined) {
			dst.encrypted = src.encrypted;
		}
		
		if (src.sessionId) {
			dst.sessionId = src.sessionId;
		}
		
		if (src.forceMonochrome !== undefined) {
			dst.forceMonochrome = src.forceMonochrome;
			this.#setEncoding();
		}
		
		if (src.invert !== undefined) {
			dst.invert = src.invert;
		}
	}	
	
	
	async #startEncryption() {
		if (this.connected) {
		    if ((this.stuDevice.isSupported(this.sigSDK.ReportId.EncryptionStatus)) ||
	            (await this.sigSDK.ProtocolHelper.supportsEncryption(this.stuDevice.getProtocol()))) {						   
		
		        await this.stuDevice.startCapture(this.config.sessionId);
                this.mIsEncrypted = true;
			}
	    }
	}
	
	async #stopEncryption() {
		if (this.mIsEncrypted) {
			await this.stuDevice.endCapture();
			this.mIsEncrypted = false;
		}
	}
		
	
	#tabletToScreen(penData) {
        // Screen means LCD screen of the tablet.
        return new WizCtl.Point(penData.x * this.mScaleX, penData.y * this.mScaleY);
    }
	
	#screenToTablet(x, y) {
		return new WizCtl.Point(x/this.mScaleX, y/this.mScaleY);
	}
	
	#contains(rect, pt) {
		if (((pt.x >= rect.upperLeftXpixel) && 
		     (pt.x <= rect.lowerRightXpixel)) &&
             ((pt.y <= rect.lowerRightYpixel) && (pt.y >= rect.upperLeftYpixel))) {
            return true;
        } else {
            return false;
        }
	}
	
	#getObject(point) {
		for (var i=this.objects.length-1; i>-1; i--) {
			if ((this.objects[i].rect) && (this.#contains(this.objects[i].rect, point))) {
				return this.objects[i];
			}
		}
		
		return null;
	}		
	
	onPenDataOption(penData) {	
	    this.onPenData(penData);
    }
  
    onPenDataTimeCountSequence(penData) {
	    this.onPenData(penData);								
    }
	
    onPenDataTimeCountSequenceEncrypted(penData) {
	    this.onPenDataTimeCountSequence(penData);
    }
  
    onPenDataEncryptedOption(penData) {
        this.onPenData(penData.penData1);
        this.onPenData(penData.penData2);	
    }

    onPenDataEncrypted(penData) {
        this.onPenData(penData.penData1);
        this.onPenData(penData.penData2);	
    }
	
	onPenData(penData) {
		if (penData.sessionId && penData.sessionId !== this.config.sessionId) {
			return;
		}
		
		this.mPromises.push(new Promise(resolve => {
			this.mResolvers.push(resolve);
			this.mPenEvents.push(penData);
			if (this.mPenEvents.length === 1) {
		      this.#onPenDataInternal(penData);
		    }  
		}));		
	}
	
    async #onPenDataInternal() {
		if (!this.connected) {
			return;
		}
		
		const penData = this.mPenEvents[0]; // we cannot shift until the end.		
		
        //console.log(JSON.stringify(penData));	
        
		let redraw = false;
        const pt = this.#tabletToScreen(penData);
		const object = this.#getObject(pt);
		
		if ((this.mObject != null) && (object == null)) {
			if ((this.mObject.type == WizCtl.ObjectType.ObjectButton) && 
			     (this.mObject.pushed)) {
			    this.mObject.pushed = false;
				this.#drawState(this.mObject);
				//redraw = true;
			}
		}
		
		const isDown = (penData.pressure > this.mInkThreshold.onPressureMark);
        if (!this.mIsDown) {
            if (isDown) {
                // transition to down we save the button pressed
				this.mIsDown = true;
				this.mObject = object;
                if (this.mObject == null) {
                    // We have put the pen down outside an object.
                    // Treat it as part of the signature.
					if (!penData.fromMouse) {
					    if ((this.mPadMode == WizCtl.#PadMode.PadSigning) ||
                             (this.mPadMode == WizCtl.#PadMode.PadInking)) {
		                    this.mPenData.push(penData);
							
		                    var downEvent = new PointerEvent("pointerdown", {
			                               pointerId: 1,
                                           pointerType: "pen",							   
                                           isPrimary: true,
							               clientX: pt.x,
							               clientY: pt.y,
							               pressure: penData.pressure/this.mCapability.tabletMaxPressure
                                        });
		                    if (this.mirrorCanvas) {		                        
						        this.#inkToMirror(downEvent);		
							}	
							
							if (this.mPadMode == WizCtl.#PadMode.PadInking) {
							    this.#inkToCanvas(downEvent);
							}
						}
					}
							 							
                } else {
					// if we press a button change its color
					if (this.mObject.type == WizCtl.ObjectType.ObjectButton) {
						this.mObject.pushed = true;
						this.#drawState(this.mObject);
						//redraw = true;
					}
				}
            } else {
		        // hover point
				if ((this.mPadMode == WizCtl.#PadMode.PadSigning) ||
                    (this.mPadMode == WizCtl.#PadMode.PadInking)) {
					if (!penData.fromMouse) {
		                this.mPenData.push(penData);	
					}
				}
	        }
        } else {
	        if (!isDown) {
                // transition to up
				if (this.mObject != null) {
					if ((object != null) && (object.id == this.mObject.id)) {
						// The pen is over the same button that was pressed
						if (object.type == WizCtl.ObjectType.ObjectCheckbox) {
							if (object.checked == 0) {
								object.checked = 1;
							} else {
								object.checked = 0;
							}
							this.#drawState(object);							
							redraw = true;
						} else if (object.type == WizCtl.ObjectType.ObjectRadioButton) {
							this.#selectRadioButton(object);
							redraw = true;
						} else if (object.type == WizCtl.ObjectType.ObjectButton) {
							if (object.pushed) {
							    object.pushed = false;
							    this.#drawState(object);
							    redraw = true;
								
								let reserved = this.#IdRules[WizCtl.ObjectType.ObjectButton].reserved[object.id];
                                if (reserved) {
									if (object.id == "delete") {
										if (reserved()) {
											redraw = true;
										}										
									} else if (await reserved()) {
										return;
									}
		                        }			
							}
						}												
						
						if ((object.handleInput) &&				
							(this.#handleInput(object))) {							
                            this.#onInput(object);							
							redraw = true;
						}
						
						if ((object.onClick) && (await object.onClick(object))) {
							this.mPenEvents = [];
                            this.mPromises = [];
		                    this.mResolvers.forEach((value) => {
							  value();
							});		
                            this.mResolvers = [];							
							return;
						}
						
					}
				} else {
					if ((!penData.fromMouse) && 
					    ((this.mObject == null) || 
						 ((this.mObject.type != WizCtl.ObjectType.ObjectButton) && 
						 (this.mObject.type != WizCtl.ObjectType.ObjectImage)))) {
							                    						
					    if ((this.mPadMode == WizCtl.#PadMode.PadSigning) || 
						    (this.mPadMode == WizCtl.#PadMode.PadInking)) {						
						    this.mPenData.push(penData);
							
							var upEvent = new PointerEvent("pointerup", {
			                               pointerId: 1,
                                           pointerType: "pen",							   
                                           isPrimary: true,
							               clientX: pt.x,
							               clientY: pt.y,
							               pressure: penData.pressure/this.mCapability.tabletMaxPressure
                                        });
										
							if (this.mirrorCanvas) {				                
						        this.#inkToMirror(upEvent);
					        }
							
							if (this.mPadMode == WizCtl.#PadMode.PadInking) {
							    this.#inkToCanvas(upEvent);
							}
						}
					}
				}					
				this.mObject = null;
				this.mIsDown = false;
            } else {
				if ((!penData.fromMouse) && 
					    ((this.mObject == null) || 
						 ((this.mObject.type != WizCtl.ObjectType.ObjectButton) && 
						 (this.mObject.type != WizCtl.ObjectType.ObjectImage)))) {
				
				    if ((this.mPadMode == WizCtl.#PadMode.PadSigning) || 
					    (this.mPadMode == WizCtl.#PadMode.PadInking)) {
				        this.mPenData.push(penData);
						
						var moveEvent = new PointerEvent("pointermove", {
			                               pointerId: 1,
                                           pointerType: "pen",							   
                                           isPrimary: true,
							               clientX: pt.x,
							               clientY: pt.y,
							               pressure: penData.pressure/this.mCapability.tabletMaxPressure,
                                        });
										
						if (this.mirrorCanvas) {				            
					        this.#inkToMirror(moveEvent);			
				        }
						
						if (this.mPadMode == WizCtl.#PadMode.PadInking) {
						    this.#inkToCanvas(moveEvent);
						}
					}
				}
			}
        }
		
		if (redraw) {	
			//await new Promise(resolve => setTimeout(resolve, this.mIsEncrypted ? 200 : 100));
			await new Promise(resolve => setTimeout(resolve, 100));
	        await this.#draw();			  
		} 
		
		this.mPenEvents.shift();
		this.mPromises.shift();
		this.mResolvers.shift()();

		if (this.mPenEvents.length > 0) {
		    await this.#onPenDataInternal();
		}		
    }		
	
	
	
	#setEncoding() {
		if (this.config.forceMonochrome) {
			// assumes 1bit is available
	        this.mEncodingMode = this.sigSDK.EncodingMode.EncodingMode_1bit; 
		    this.useColor = false;
		} else if (this.stuDevice) {
	        let encodingFlag = this.sigSDK.ProtocolHelper.simulateEncodingFlag(this.stuDevice.getProductId(), this.mCapability.encodingFlag);
	        // Disable color if the bulk driver isn't installed (supportsWrite())
	        if ((encodingFlag & this.sigSDK.EncodingFlag.EncodingFlag_24bit.value) != 0) {
	            this.mEncodingMode = this.sigSDK.EncodingMode.EncodingMode_24bit; 
				this.useColor = true;
	        } else if ((encodingFlag & this.sigSDK.EncodingFlag.EncodingFlag_16bit.value) != 0) {
	            this.mEncodingMode = this.sigSDK.EncodingMode.EncodingMode_16bit; 
				this.useColor = true;
	        } else {
	            // assumes 1bit is available
	            this.mEncodingMode = this.sigSDK.EncodingMode.EncodingMode_1bit; 
			    this.useColor = false;
			}
	    }		
	}		
	
	#supportsWriteImageArea() {
		return this.stuDevice.isSupported(this.sigSDK.ReportId.StartImageDataArea);
	}
				
	
	#getFont(data) {
		let font = "";
		if (data && data.style) {
			font += this.data.style+" ";					
		} else if (this.config.font.style) { 
		    font += this.config.font.style+" ";					
		}		
		
		if (data && data.size) {
			font += data.size+" ";
		} else if (this.config.font.size) {
			font += this.config.font.size+" ";
		}
		
		if (data && data.name) {
			font += data.name+" ";
		} else if (this.config.font.name) {
		    font += this.config.font.name+" ";
		}		
			
		return font;
	}
	
	#getPosition(x, y, width, height) {
		if (x == "left") {
		    x = 0;
		} else if (x == "centre") {
		    x = this.mCapability.screenWidth/2 - width/2;
		} else if (x == "right") {
		    x = this.mCapability.screenWidth - width;
		}				
		
		if (y == "top") {
		    y = 0;
		} else if (y == "middle") {
		    y = this.mCapability.screenHeight/2 - height/2;
		} else if (y == "bottom") {
		    y = this.mCapability.screenHeight - height;
		}
		
		return {x:Math.floor(x), y:Math.floor(y)};
	}
	
	
	
	async #draw(oneBlock) {		
		if ((!this.supportsArea) || (oneBlock)) {			
            let x1, x2, y1, y2;
            if (!this.supportsArea) {
				x1 = 0;
				x2 = this.mCapability.screenWidth;
				y1 = 0;
				y2 = this.mCapability.screenHeight;
			} else {		
		        x1 = this.mCapability.screenWidth;
		        x2 = 0;
		        y1 = this.mCapability.screenHeight;
		        y2 = 0;
		 		
		        for (var i=0; i<this.objects.length; i++) {
			        if ((this.objects[i].painted !== undefined) && (!this.objects[i].painted)) {
					    x1 = Math.min(x1, this.objects[i].rect.upperLeftXpixel);
					    y1 = Math.min(y1, this.objects[i].rect.upperLeftYpixel);
					    x2 = Math.max(x2, this.objects[i].rect.lowerRightXpixel);
					    y2 = Math.max(y2, this.objects[i].rect.lowerRightYpixel);
				    }				
			    }
			
			    if (this.emptyWaitRect) {
				    x1 = Math.min(x1, this.emptyWaitRect.upperLeftXpixel);
				    y1 = Math.min(y1, this.emptyWaitRect.upperLeftYpixel);
				    x2 = Math.max(x2, this.emptyWaitRect.lowerRightXpixel);
				    y2 = Math.max(y2, this.emptyWaitRect.lowerRightYpixel);
			    }
			}
				
			const canvas = document.createElement("canvas");
			canvas.width = x2-x1;
			canvas.height = y2-y1;
			const ctx = canvas.getContext("2d");
			//ctx.fillStyle = this.useColor ? this.config.backColor : "white";
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			if (this.emptyWaitCanvas) {
				this.ctx.drawImage(this.emptyWaitCanvas, this.emptyWaitRect.upperLeftXpixel, this.emptyWaitRect.upperLeftYpixel);
			}
			
			for (var i=0; i<this.objects.length; i++) {
			    if ((this.objects[i].painted !== undefined) && (!this.objects[i].painted)) {
					ctx.drawImage(this.objects[i].image,
					              this.objects[i].rect.upperLeftXpixel-x1,
								  this.objects[i].rect.upperLeftYpixel-y1);
					this.objects[i].painted = true;			  
				}				
			}
									
			const rect = new this.sigSDK.Rectangle(x1, y1, x2-1, y2-1);
			const image = this.sigSDK.ProtocolHelper.resizeAndFlatten(canvas, 0, 0, canvas.width, canvas.height, 
	                                                                                canvas.width, canvas.height, this.mEncodingMode, 
		  																	        0, "white", false, false);		
																					
			if (this.supportsArea) {
			    await this.stuDevice.writeImageArea(this.mEncodingMode, rect, image);
			} else {
				await this.stuDevice.writeImage(this.mEncodingMode, image);
			}
			if (this.config.mirrorDiv) {
			    this.ctx.drawImage(canvas, x1, y1);
				this.#drawToMirror();
		    }
		} else {				
			for (var i=0; i<this.objects.length; i++) {
				if ((this.objects[i].painted !== undefined) && (!this.objects[i].painted)) {
					const canvas = this.objects[i].image;										
					
					const image =this.sigSDK.ProtocolHelper.resizeAndFlatten(canvas, 0, 0, canvas.width, canvas.height, 
	                                                                                        canvas.width, canvas.height, this.mEncodingMode, 
		  																	                0, "white", false, false);	               		

					await this.stuDevice.writeImageArea(this.mEncodingMode, this.objects[i].rect, image);
				    this.objects[i].painted = true;
					
					if (this.config.mirrorDiv) {
			            this.ctx.drawImage(canvas, 
						                   this.objects[i].rect.upperLeftXpixel, 
										   this.objects[i].rect.upperLeftYpixel);
						this.#drawToMirror();
		            }
				}
			}
		}
	}
	
	async #drawWait() {		
	    this.ctx.font = "60pt Wingdings";	
        const hourglass = String.fromCharCode(0x36);		
		const metrics = this.ctx.measureText(hourglass);
		const width = metrics.width;
		const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
		const size = Math.max(width, height);
		const lineWidth = 3;		        
		
		const canvas = document.createElement("canvas");								
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		ctx.font = this.ctx.font;
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = "black";
		ctx.fillText(hourglass, (width/2)-lineWidth, ((height+metrics.fontBoundingBoxAscent)/2)-lineWidth);
		
		ctx.strokeStyle = "black";
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.arc(size/2, size/2, (size-lineWidth*2)/2, 0, 2 * Math.PI);
		ctx.stroke();		
				
		const x = Math.floor(this.mCapability.screenWidth/2 - size/2);
		const y = Math.floor(this.mCapability.screenHeight/2 - size/2);
		const image = this.sigSDK.ProtocolHelper.resizeAndFlatten(canvas, 0, 0, canvas.width, canvas.height, 
	                                                                            canvas.width, canvas.height, this.mEncodingMode, 
		  																	    0, "white", false, false);																																				  		    
		
		const rect = new this.sigSDK.Rectangle(x, y, x+canvas.width-1, y+canvas.height-1);
		await this.stuDevice.writeImageArea(this.mEncodingMode, rect, image);		
		
		if (this.config.mirrorDiv) {
			this.ctx.drawImage(canvas, x, y);
			this.#drawToMirror();
		}
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.emptyWaitCanvas = canvas;
		this.emptyWaitRect = rect;
	}	
	
	#drawToMirror() {
		if (this.config.mirrorDiv) {
			const div = document.getElementById(this.config.mirrorDiv.id);
			let canvasWidth = this.canvas.width;
			let canvasHeight = this.canvas.height;
			if (this.config.mirrorDiv.width) {
				canvasWidth = this.config.mirrorDiv.width;
				if (this.config.mirrorDiv.height) {
					canvasHeight = this.config.mirrorDiv.height;
				} else {
					canvasHeight = (canvasWidth/this.canvas.width)*canvasHeight;
				}
			} else {
				if (this.config.mirrorDiv.height) {
					canvasHeight = this.config.mirrorDiv.height;
					canvasWidth = (canvasHeight/this.canvas.height)*canvasWidth;
				}
			}
			if (div) {
				if (this.mirrorCanvas) {
				    div.removeChild(this.mirrorCanvas);
				}
				const canvas = document.createElement("canvas");
				canvas.addEventListener("pointermove", this.#mirrorEvent.bind(this));
				canvas.addEventListener("pointerdown", this.#mirrorEvent.bind(this));
				canvas.addEventListener("pointerup", this.#mirrorEvent.bind(this));
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;
				const ctx = canvas.getContext("2d");
				ctx.imageSmoothingEnabled = true;
			    ctx.drawImage(this.canvas, 0, 0, canvasWidth, canvasHeight);
                this.mirrorCanvas = div.appendChild(canvas);
			}
		}
	}
	
	#inkToMirror(event) {		
		const x = (this.mirrorCanvas.width/this.canvas.width)*event.clientX;
		const y = (this.mirrorCanvas.height/this.canvas.height)*event.clientY;
		
		if ((event.type == "pointermove") && (this.lastX)) {			
		    const ctx = this.mirrorCanvas.getContext("2d");
			ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();			
		}
		
		if (event.type != "pointerup") {
		    this.lastX = x;
		    this.lastY = y;
		} else {
			this.lastX = null;
			this.lastY = null;
		}
	}
	
	#inkToCanvas(event) {
		if ((event.type == "pointermove") && (this.lastInkingX)) {			
		    const ctx = this.inkingCanvas.getContext("2d");
			ctx.beginPath();
            ctx.moveTo(this.lastInkingX, this.lastInkingY);
            ctx.lineTo(event.clientX, event.clientY);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();			
		}
		
		if (event.type != "pointerup") {
		    this.lastInkingX = event.clientX;
		    this.lastInkingY = event.clientY;
		} else {
			this.lastInkingX = null;
			this.lastInkingY = null;
		}
	}
	
	#mirrorEvent(event) {	
        if (this.config.mirrorDiv.enable) {	
		    const x = (this.canvas.width/this.mirrorCanvas.width)*event.offsetX;
		    const y = (this.canvas.height/this.mirrorCanvas.height)*event.offsetY;
		    const pt = this.#screenToTablet(x,y);			
		    this.onPenData({x:pt.x,
		                    y:pt.y,
						    pressure:event.buttons==1?this.mInkThreshold.onPressureMark+1:0,
						    rdy:1,
						    sw:event.buttons == 1,
						    timeCount:event.timeStamp,
						    fromMouse:true}, event.timeStamp);		
	    }
	}
		
	
	#idOK(id, objType) {
		if (!id) {
			if (this.#IdRules[objType].bReqd) {
				return false;
			} else {
				return true;
			}
		}
		
		// Check if id already in use
		if (this.#objectIndex(id) >=0) {
			return false;
		}
		
		// Check if id reserved for other object types
		if (!this.#IdRules[objType].reserved[id]) {
			for (var object in this.IdRules) {
				if (object != objType) {
					if (this.#IdRules[object].reserved[id]) {
						return false;
					}
				}
			}
		}
		
		return true;
	}
	
	#objectIndex(id) {
		this.objects.forEach(function(object, index) {
			if (object.id == id) {
				return index;
			}
		});
		return -1;
	}
	
	#setWho(text) {
		this.who = text;
	}
	
	#setWhy(text) {
		this.why = text;
	}
	
	#setWhen(text) {
		this.when = text;
	}	
	
	#hasPenData() {
		for (let index = 0; index < this.mPenData.length; index++) {
		    if (this.mPenData[index].sw != 0) {
				return true;
		    }
		}
		return false;		
	}
	
	async #onOk() {
		if (this.mPadMode == WizCtl.#PadMode.PadSigning) {
			if (this.#hasPenData()) {
			    const value = await this.#generateSignature();			
				if (value) {
			        this.#onCancel();
				
				    let signObject;
				    for (var i=this.objects.length-1; i>-1; i--) {
			            if (this.objects[i].type == WizCtl.ObjectType.ObjectSignature) {
				          signObject = this.objects[i];
				        }
				    }
				    if (signObject && signObject.onSignatureCaptured) {
				      return signObject.onSignatureCaptured(this.mSigObj);	
				    }
				}				
			}
		} else if (this.mPadMode == WizCtl.#PadMode.PadInking) {
			if (this.#hasPenData() > 0) {
				
				let inkingObject;
				for (var i=this.objects.length-1; i>-1; i--) {
			        if (this.objects[i].type == WizCtl.ObjectType.ObjectInking) {
					    inkingObject = this.objects[i];
				    }
				}
				if (inkingObject && inkingObject.onInkingCaptured) {
					return inkingObject.onInkingCaptured(this.inkingCanvas.toDataURL("image/png"));
				}
			}
		}
		return false;
	}
	
	async #onClear() {
		if ((this.mPadMode == WizCtl.#PadMode.PadInput) &&
		     (this.mInput)) {
			for (var i=0; i<this.objects.length; i++) {
			        if (this.objects[i].type == WizCtl.ObjectType.ObjectInputEcho) {												
					    this.#updateInputEcho(this.objects[i], 
						    this.objects[i].index == 0 || this.objects[i].putUnderline ? "_" : " ");					    
				    }
			}	
            this.mInput.input = "";			
			await this.#draw();
		} else if ((this.mPadMode == WizCtl.#PadMode.PadSigning) || 
		           (this.mPadMode == WizCtl.#PadMode.PadInking)){
					   
			if (this.mPadMode == WizCtl.#PadMode.PadInking) {
			    const ctx = this.inkingCanvas.getContext("2d");
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, this.inkingCanvas.width, this.inkingCanvas.height);
			}
			
			this.mPenData = [];
			await this.stuDevice.setClearScreen();
			for (var i=0; i<this.objects.length; i++) {
				if (this.objects[i].painted !== undefined) {
			        this.objects[i].painted = false;
				}
			}
			
			await this.display(this.emptyWaitCanvas);
		}				
		
		this.mPenEvents = [];
		return true;
	}
	
	#onCancel() {
	}
	
	async #onDelete() {
		let handle = false;
		if (this.mInput) {
		    const textSize = this.mInput.input.length;
			if (textSize > 0) {
			    for (var i=0; i<this.objects.length; i++) {
			        if (this.objects[i].type == WizCtl.ObjectType.ObjectInputEcho) {
						if (this.objects[i].index == textSize-1) {
					        this.#updateInputEcho(this.objects[i], "_");
					        this.mInput.input = this.mInput.input.slice(0, textSize-1);		
                            this.#onInput(this.objects[i]);
							if (this.objects[i].putUnderline) {
								return true;
							} else {
						        handle = true;
							}
						} else if ((!this.objects[i].putUnderline) && (this.objects[i].index >= textSize)) {
							this.#updateInputEcho(this.objects[i], " ");
						}
				    } 
				}
			}
		}			
        return handle;		
	}	

    #onInput(object) {
		for (var i=0; i<this.objects.length; i++) {
		    if (this.objects[i].type == WizCtl.ObjectType.ObjectInput) {
			    if (this.objects[i].onInput) {					
				    this.objects[i].onInput(this.mInput.input, object.id, 
					                        this.objects[i].minLength, this.objects[i].maxLength);
				}
			}
		}
	}		
	
	#btnAlignOption(align) {
        if (align) {
            const xAlign = WizCtl.ButtonOptions.BtnAlignCentre | WizCtl.ButtonOptions.BtnAlignLeft | WizCtl.ButtonOptions.BtnAlignRight;
            const yAlign = WizCtl.ButtonOptions.BtnAlignMiddle | WizCtl.ButtonOptions.BtnAlignTop | WizCtl.ButtonOptions.BtnAlignBottom;
            const allAlign = xAlign | yAlign;

            if ((align & ~allAlign) != 0          // unknwon bits
                   || ((align & xAlign) == xAlign)     // left AND right
                   || ((align & yAlign) == yAlign)) {  // top AND bottom
                return false;
            }
        }
        return true;
    }
	
	#drawState(object) {
		if (object.type == WizCtl.ObjectType.ObjectCheckbox) {
			this.#drawStateCheckbox(object);
		} else if (object.type == WizCtl.ObjectType.ObjectRadioButton) {
			this.#drawStateRadioButton(object);
		} else if (object.type == WizCtl.ObjectType.ObjectButton) {
			this.#drawStateButton(object);
		}			
	}
	
	#drawStateCheckbox(object) {
		const canvas = document.createElement("canvas");
		canvas.width = (object.rect.lowerRightXpixel - object.rect.upperLeftXpixel)+1;
		canvas.height = (object.rect.lowerRightYpixel - object.rect.upperLeftYpixel)+1;
		
		const ctx = canvas.getContext("2d");
		ctx.font = object.font;	

        ctx.fillStyle = object.backColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);				
		ctx.fillStyle = object.foreColor;
		
		if (object.checked == 0) {			
			const metrics = ctx.measureText("\u2610");
			ctx.fillText("\u2610", 0, metrics.fontBoundingBoxAscent); // empty
		} else {
			if (object.style == WizCtl.CheckboxOptions.CheckboxDisplayCross) {
				const metrics = ctx.measureText("\u2612");
				ctx.fillText("\u2612", 0, metrics.fontBoundingBoxAscent); // cross
			} else {
				const metrics = ctx.measureText("\u2611");
				ctx.fillText("\u2611", 0, metrics.fontBoundingBoxAscent); // check
			}
		}
		
        object.image = canvas;
        object.painted = false;		
	}
	
	#drawStateRadioButton(object) {
		const canvas = document.createElement("canvas");
		canvas.width = (object.rect.lowerRightXpixel - object.rect.upperLeftXpixel) + 1;
		canvas.height = (object.rect.lowerRightYpixel - object.rect.upperLeftYpixel) + 1;
		
		const ctx = canvas.getContext("2d");		
		ctx.font = object.font;	
		
        ctx.fillStyle = object.backColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);				
		
		ctx.fillStyle = object.foreColor;		
		const metrics = ctx.measureText("\u25EF");
		ctx.fillText("\u25EF", 0, metrics.fontBoundingBoxAscent); // empty
		
		if (object.checked) {
		    const metrics = ctx.measureText("\u25CF");
		    ctx.fillText("\u25CF", Math.floor((canvas.width-metrics.width)/2), 
			                       Math.floor((canvas.height+metrics.actualBoundingBoxAscent-metrics.actualBoundingBoxDescent)/2)); // filled
		}
		
        object.image = canvas;
        object.painted = false;		
	}
	
	#drawStateButton(object) {
		const canvas = document.createElement("canvas");
		canvas.width = (object.rect.lowerRightXpixel - object.rect.upperLeftXpixel)+1;
		canvas.height = (object.rect.lowerRightYpixel - object.rect.upperLeftYpixel)+1;
		
		const ctx = canvas.getContext("2d");
		ctx.font = object.font;
		
		const metrics = ctx.measureText(object.text);		
		const width = metrics.width;
		const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
		
		if ((object.pushed) && (object.config.pushed)) {
            if (this.useColor) {			
			    ctx.fillStyle = object.config.pushed.backColor ? object.config.pushed.backColor : object.config.backColor;
			} else {
				ctx.fillStyle = object.config.pushed.invert ? "black" : "white";
			}
			ctx.fillRect(0, 0, canvas.width, canvas.height);										
			
			//draw the border			
			if (object.config.pushed.border && object.config.pushed.border.size) {				
				ctx.lineWidth = object.config.pushed.border.size;
				if (this.useColor) {
			        ctx.strokeStyle = object.config.pushed.border.color;
				} else {
					ctx.fillStyle = object.config.pushed.invert ? "white" : "color";
				}
			    ctx.strokeRect(0, 0, canvas.width, canvas.height);
			}			
		} else {
			if (this.useColor) {
			    ctx.fillStyle = object.config.backColor;
			} else {
				ctx.fillStyle = object.config.invert ? "black" : "white";
			}
			ctx.fillRect(0, 0, canvas.width, canvas.height);										
			
			//draw the border
			if (object.config.border && object.config.border.size) {
				ctx.lineWidth = object.config.border.size;
				if (this.useColor) {
			        ctx.strokeStyle = object.config.border.color;
				} else {
					ctx.fillStyle = object.config.invert ? "white" : "color";
				}
			    ctx.strokeRect(0, 0, canvas.width, canvas.height);
			}
		}		
		
		let offsetX = 0;
	    if (object.flags & WizCtl.ButtonOptions.BtnAlignLeft) {                 
		    offsetX = 0;
        } else if (object.flags & WizCtl.ButtonOptions.BtnAlignRight) {
            offsetX = canvas.width - width;					
		} else {
		    offsetX = Math.floor(canvas.width/2 - width/2);					
		}
				 
		let offsetY = 0;
        if (object.flags & WizCtl.ButtonOptions.BtnAlignTop) {
            offsetY = 0;
		} else if (object.flags & WizCtl.ButtonOptions.BtnAlignBottom) {
            offsetY = 0; // fix this
        } else {
		    offsetY = 0; // fix this
		}
		
		if (object.pushed && object.config.pushed && object.config.pushed.font) {
			if (this.useColor) {
			    ctx.fillStyle = object.config.pushed.font.color ? object.config.pushed.font.color : object.config.font.color;
			} else {
				ctx.fillStyle = object.config.pushed.invert ? "white" : "black";
			}
		} else {
			if (this.useColor) {
			    ctx.fillStyle = object.config.font.color;
			} else {
				ctx.fillStyle = object.config.invert ? "white" : "black";
			}
		}
		ctx.fillText(object.text, offsetX, metrics.fontBoundingBoxAscent);
	
        object.image = canvas;
        object.painted = false;		
	}
	
	async #selectRadioButton(object) {
		if (!object.checked) {						
			for (var i=0; i<this.objects.length; i++) {
				if (object.group == this.objects[i].group) {
					if (this.objects[i].checked) {
						this.objects[i].checked = false;
						this.#drawStateRadioButton(this.objects[i]);
					}
				}
			}
			
			object.checked = true;
			this.#drawStateRadioButton(object);			
		}
	}
	
	#checkboxOption(option) {
        if (typeof option === 'number') {
            const checkOptions = WizCtl.CheckboxOptions.CheckboxUnchecked | WizCtl.CheckboxOptions.CheckboxChecked;
            const displayOptions = WizCtl.CheckboxOptions.CheckboxDisplayTick | WizCtl.CheckboxOptions.CheckboxDisplayCross;
            const allOptions = checkOptions | displayOptions;

            if ( /*(option & CheckOptions)   != CheckOptions   &&*/   // Redundant: it's checked or it isn't
                (option & displayOptions) != displayOptions &&       // Check Tick and Cross aren't both set
                (option & ~allOptions) == 0) {                   // Check no invalid bits set
                return true;
            }
        }
        return false;
    }
	
	#lineOption(option) {
		const lineStyles = WizCtl.PrimitiveOptions.LineSolid | WizCtl.PrimitiveOptions.LineDashed;
		if ((option & lineStyles) != lineStyles &&
            (option & ~lineStyles) == 0) {
            return true;
		}
		
		return false;
    }
	
	#shapeOption(option) {
		const lineStyles = WizCtl.PrimitiveOptions.LineSolid | WizCtl.PrimitiveOptions.LineDashed;
        const fillStyles = WizCtl.PrimitiveOptions.Fill | WizCtl.PrimitiveOptions.FillXOR;
        const outlineOrFill = WizCtl.PrimitiveOptions.Outline | fillStyles;
        const allOptions = lineStyles | fillStyles | WizCtl.PrimitiveOptions.Outline;

        if ((option & lineStyles) != lineStyles &&
            (option & fillStyles) != fillStyles &&
            (option & ~allOptions) == 0) {
            if ((option & outlineOrFill) == 0) {  // neither outline nor fill specified
                option |= WizCtl.PrimitiveOptions.Outline;           // default to outline
            }
            return true;
        }
		
		return false;
	}
	
	#handleInput(object) {		
	    let handle = false;
		const textSize = this.mInput.input.length;
		for (var i=0; i<this.objects.length; i++) {
			if (this.objects[i].type == WizCtl.ObjectType.ObjectInputEcho) {
				if (this.objects[i].index == textSize) {
					this.#updateInputEcho(this.objects[i], this.objects[i].data?this.objects[i].data:object.id);
					this.mInput.input += object.id;
					handle = true;
				} else if (this.objects[i].index == (textSize +1)) {
					this.#updateInputEcho(this.objects[i], "_");
				}
			}
		}
		return handle;
	}
	
	async #updateInputEcho(object, value) {
		const canvas = document.createElement("canvas");
		canvas.width = (object.rect.lowerRightXpixel - object.rect.upperLeftXpixel) + 1;
		canvas.height = (object.rect.lowerRightYpixel - object.rect.upperLeftYpixel) + 1;
		
		const ctx = canvas.getContext("2d");
		ctx.font = object.font;	
		const metrics = ctx.measureText(value);		

        ctx.fillStyle = object.backColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);				
		ctx.fillStyle = object.foreColor;
		ctx.fillText(value, 0, metrics.fontBoundingBoxAscent);
		
		if (object.putUnderline) {
			ctx.fillText("_", 0, metrics.fontBoundingBoxAscent);
		}
		
        object.image = canvas;
        object.painted = false;
        //await this.draw();		
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
	
	async #generateSignature() {
	    //Create Stroke Data
        let strokeVector = new this.sigSDK.StrokeVector();
        let currentStroke = new this.sigSDK.PointVector();

        let currentStrokeID = 0;
        let isDown = true;
	    let hasDown = false;

        for (let index = 0; index < this.mPenData.length; index++) {
		    if (this.mPenData[index].sw == 0 && !hasDown) {
				// the signature starts with the first pen down, so the hover
				// points before first down are ignored.
			    continue;
		    }
		
		    hasDown = true;
		
            if ((isDown && this.mPenData[index].sw == 0) || (!isDown && this.mPenData[index].sw == 1)) {			
                isDown = (this.mPenData[index].sw == 1);
				
		        //Move the current stroke data into the strokes array
                strokeVector.push_back({'points': currentStroke});
                currentStroke.delete();
                currentStroke = new this.sigSDK.PointVector();
                currentStrokeID++;		
            }		
        
            var point = {
                'x': this.mPenData[index].x,
                'y': this.mPenData[index].y,
                'p': this.mPenData[index].pressure,
                't': this.mPenData[index].timeCount,
				'azimuth': 0, // STU has not azimuth
			    'altitude': 0, // STU has not altitude
			    'twist': 0,	// STU has no twist		
                'is_down': this.mPenData[index].sw,
                'stroke_id': currentStrokeID				
            };
		
            currentStroke.push_back(point);			
        }	

	    //Create capture area character
        var device = {
            'device_max_X': this.mCapability.tabletMaxX,
            'device_max_Y': this.mCapability.tabletMaxY,
            'device_max_P': this.mCapability.tabletMaxPressure,
            'device_pixels_per_m_x': 100000, 
		    'device_pixels_per_m_y': 100000,
            'device_origin_X': 0,
            'device_origin_Y': 1,
			'device_unit_pixels': false
        }	
	
	    var uid2;
	    try {
            // getUid2 will throw if the pad doesn't support Uid2
            uid2 = await stuDevice.getUid2();
        }
        catch (e) {
        }
	
	    if (!uid2) {
		    uid2 = 0;
	    }

        const [browserInfo, osInfo] = await this.getSystemInfo();
        const nicInfo = "";
        const digitizerInfo = "STU;'"+this.mInformation.modelName+"';"+this.mInformation.firmwareMajorVersion+"."+((parseInt(this.mInformation.firmwareMinorVersion) >> 4) & 0x0f)+"."+(parseInt(this.mInformation.firmwareMinorVersion) & 0x0f)+";"+uid2;
        const timeResolution = 1000;
        const who = this.who;
        const why = this.why;
	    const where = "";
		
		let integrityKey = this.sigSDK.KeyType.SHA512;
		let documentHash;
		if (this.mSigOptions) {
			if (this.mSigOptions.integrityKey) {
				integrityKey = this.mSigOptions.integrityKey;
			}
			if (this.mSigOptions.documentHash) {
				documentHash = this.mSigOptions.documentHash;
			}
		}
		
		let deleteHash = false;
		if (!documentHash) {
			documentHash = new this.sigSDK.Hash(this.sigSDK.HashType.None);
			deleteHash = true;
		}
	
        const myPromise = new Promise((resolve, reject) => {
			try {
				const promise = this.mSigObj.generateSignature(this.who?this.who:"", this.why?this.why:"", where, integrityKey, documentHash, strokeVector, device, osInfo, digitizerInfo, nicInfo, timeResolution);
				promise.then(value => {
					if (deleteHash) {
                        documentHash.delete();
		            }
                    strokeVector.delete();
                    currentStroke.delete();						
					resolve(value);
				});
				promise.catch(error => {
					if (deleteHash) {
                        documentHash.delete();
		            }
                    strokeVector.delete();
                    currentStroke.delete();						
				    reject(error);
				});
				
			} catch (exception) {
	            if (deleteHash) {
                    documentHash.delete();
		        }
                strokeVector.delete();
                currentStroke.delete();						
				reject(exception);
			}
		});	

        return myPromise;		
	}
	
	#getFirstLineWidth(text, width) {
		let metrics = this.ctx.measureText(text);
		let pos = text.length-1;
        		
        while (metrics.width > width) {
			for (;pos>0;pos--) {
				if (text[pos] == " ") {
					break;
				}				
			}
			metrics = this.ctx.measureText(text.substring(0, pos--));
		}
		
		return pos+1;
	}
		
}

WizCtl.Point = class {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export default WizCtl;