# SigCaptDialog for Wacom Signature SDK 

The Signature SDK library does not provide a way to capture the signature points. It generates the Signature with a previously captured points. It is the responsibility of the integrator determine how the points are captured. 
SigCaptDialog it is a library that provides a canvas for capturing data either using a Wacom STU signature tablet or a generic device using standard javascript canvas component.

## How to use SigCaptDialog library
The main library file is **sigCaptDialog.js** that consist on class that it is used to open a canvas for signature capturing.
The simplest ways of using it would be:

```js
// create a sigObj object from Signature SDK and set its licence.
var sigObj = new Module.SigObj();	
sigObj.setLicence(licence);		

// create a hash object. In this case an empty one.
var documentHash = new Module.Hash(Module.HashType.None);

// config it is a JSON object with some configuration data, when it is not present 
// default values are taken.
var sigCaptDialog = new SigCaptDialog(config);

// adding listener for ok button
sigCaptDialog.addEventListener("ok", function() {
    // here we has captured a signature
});		
              
// open a new dialog for capturing the signature. Once the signature is captured it will be
// in sigObj object.			  
sigCaptDialog.open(sigObj, "Signatory", "Reason for signing", null, Module.KeyType.SHA512, documentHash);

// start listening for point data.
sigCaptDialog.startCapture();

```

With the default library we are able to capture Pointer events from Javascript such as mouse, touch or pen data.
In Web Browsers that supports WebHID it is also possible to connect to Wacom STU devices using **stuCaptDialog.js** that it is based on Wacom STU SDK for JavaScript.

The usage is similar to SigCaptDialog:
 
```js
// create a sigObj object from Signature SDK and set its licence.
var sigObj = new Module.SigObj();	
sigObj.setLicence(licence);		

// create a hash object. In this case an empty one.
var documentHash = new Module.Hash(Module.HashType.None);

// config it is a JSON object with some configuration data, when it is not present 
// default values are taken.
var stuCaptDialog = new StuCaptDialog(config);

// adding listener for ok button
stuCaptDialog.addEventListener("ok", function() {
    // here we has captured a signature
});		
              
// open a new dialog for capturing the signature. Once the signature is captured it will be
// in sigObj object.			  
stuCaptDialog.open(sigObj, "Signatory", "Reason for signing", null, Module.KeyType.SHA512, documentHash);

// Note: in this case it is not necessary starting the capture as it will start
// automatically when the STU device is ready.

``` 

Apart from **signCaptDialog.js** and **stuCaptDialog.js** some third-party licences needs to be added to the project:

####  Generic functionality libraries
- **jquery.min.js** and **jquery-ui.min.js** are used implementing draggin into the canvas dialog.
- **jquery.ui.touch-punch.min.js** is used for implementing draggin with touch into the canvas dialog.

#### Libraries necessaries when using STU Devices
- **BigInt.js**, **md5.min.js** and **sjcl.js**. This libraries are necessary when implementing encryption
on STU devices connection.

#### Libraries used for WILL Ink SDK
Altough it is possible to use Signature SDK JS without WILL Ink SDK it is used by default, and in order to use it
we need to include this third party libraries:
- **clipper.js**
- **long.js**
- **md5.min.js** 
- **poly2tri.min.js**
- **protobuf.min.js**

## Configure the libary 

### Signature Capture Dialog
Using a JSON config string that it is passed on the constructor it can be configure the dialog appearance.

The default values for SigCapDialog looks like:

```js
const config = {
	  width: 400,
	  height: 300,
	  left: 0,
	  top:0,
	  centered:false,
	  title: "My Tittle",
	  borderColor: "#0097d4",
	  borderWidth: "1",
	  hasTitle: true,
	  buttons: [{
	             text: "*clear", 
	             textColor: "black", 
				 backgroundColor: "lightgrey", 
				 borderWidth: 0, 
				 borderColor: "black", 
				 onClick: this.btnClearClick.bind(this)
				},
				{
				 text: "*cancel", 
				 textColor: "black", 
				 backgroundColor: "lightgrey", 
				 borderWidth: 0, 
				 borderColor: "black", 
				 onClick: this.btnCancelClick.bind(this)
				}, 
				{
				 text: "*ok", 
				 textColor: "black", 
				 backgroundColor: "lightgrey", 
				 borderWidth: 0, 
				 borderColor: "black", 
				 onClick: this.btnOkClick.bind(this)
				}
			   ],
	  buttonsFont: "Arial",
	  background: {alpha: 1.0, color: "white"},
	  reason: {visible:true, fontFace:"Arial", fontSize:16, color:"black", offsetY:10, offsetX:5},
	  signatory: {visible:true, fontFace:"Arial", fontSize:16, color:"black", offsetY:5, offsetX:30},
	  date: {visible:true, fontFace:"Arial", fontSize:16, color:"black", offsetY:20, offsetX:30},
	  signingLine: {visible:true, left:30, right:30, width:2, color:"grey", offsetY:5},
	  source: {mouse:true, touch:true, pen:true, stu:true},
	  will: {tool:"pen", color:"#000F55"},
	  modal: true,
	  draggable: true
    };  
	
``` 

Where the meaing of each field it is:

* **width**: Integer value indicating the width of the canvas.
* **weight**: Integer value indicating the height of the canvas.
* **left**: Integer value with the left of the canvas when it is opened as float dialog.
* **top**: Integer value with the top of the canvas when it is opened as float dialog.
* **centered**: Boolean value that indicates if the dialog should be centered on the screen when is opening as float dialog. If this value is true, the left and top values are ignored.
* **title**: String with the title to show in the title bar when it is opened as float dialog.
* **borderColor**: String with the color of the border when the dialog is opened as float dialog.
* **borderWidth**: Integer indicating the width of dialogs’s border when opening as float dialog.
* **hasTitle**: Boolean value indicating if there is title bar when opening as float dialog.
* **attachTo**: String that indicates the id of a div in which the capture dialog will be attached as children. When it is not defined the dialog will be opened as float. 
* **modal**: Boolean indicating that the dialog will be opened as modal or not. A modal dialog it is the one that blocks the rest of the screen content, disabling other form controls.
* **draggable**: When the dialog is shown as a float dialog and has title bar, this Boolean value indicates if the dialog can be moved draggin the title bar.
* **source**: Indicates what kind of event if accepted. The possible values are: mouse, touch, pen and stu  in the format of source:{mouse:true, touch:true, pen:true, stu:true}, if one value is missing or false this source won’t be captured, for ecample, if we defined mouse as false, the mouse won’t be valid for signature capturing. Plase be aware that in order to capture signatures for forensic validation not all the source provided necessary data such as pressure.
* **will**: This library uses Wacom WILL Ink SDK for inking. Here we can pass an object indicating the tool type to use for drawing and the color of the inking. For example will:{tool:”pen”, color:”#0000F55”} will draw simulating a blue pen.
* **buttons**: By default the dialog will show three buttons at the bottom for aceptance, cancel or clear. With this configuration we can indicating the buttons to show, its appearance and the action to be executed when clicked.
The order indicates the order in which it will be draw from left to right.
    * **text**: Button text. If the text of the button starts with * indicates that it will use translations strings if exists.
	* **texClor**: Button text color.
	* **backgroundColor**: String indicationg the background color of the button.
	* **borderWidth**: Number indicationg the width of the button border.
	* **borderColor**: String that indicates the button color border.
	* **onClick**: Function that will be executed when the butotn is clicked.
* **buttonsFont**: A String indicating the name of the font  to use on the buttons.
* **background**: The captured dialog can have a color or image as background. Also transparency can be apply.
    * **color**: String with the background color to be applied.
	* **alpha**: Float number between 0 (transparent) to 1 (opaque).
    * **image**: Image object with the image to put on background.
* **reason**: Object with the metrics to show the reason for signing.
    * **visible**: Boolean indicating if the reason for signing should be shown.
    * **fontFace**: String with the name of the font.
    * **fontSize**: Number with the size of the font.
    * **color**: String with the text color.
    * **offsetX**: Offset from the left where the text will be written.
    * **offsetY**: Offset from the top where the text will be written.
* **signatory**: Object with the metrics to show the name of the person who is signing.
    * **visible**: Boolean indicating if the signatory should be shown.
    * **fontFace**: String with the name of the font.
    * **fontSize**: Number with the size of the font.
    * **color**: String with the text color.
    * **offsetX**: Number indicating the offset from the right.
    * **offsetY**: Number indicating the offset from the date text.
* **date**:  Object with the metrics to show the date a time of signing.
    * **visible**: Boolean indicating if the date should be shown.
    * **fontFace**: String with the font name.
    * **fontSize**: Number indicationg the font size.
    * **color**: String indicationg the font color.
    * **offsetX**: Number indicating the offset from the right.
    * **offsetY**: Number indicating the offset from the bottom.
* **signingLine**: Object with the metrics to show the signing line. It consists on:
    * **visible**: Boolean indicating if the signing line should be shown.
    * **left**: Number indicating the padding from the left.
    * **right**: Number indicating the padding from the right.
    * **width**: Number indicating the width of the line.
    * **color**: String with the line color.
    * **offsetY**: Number with the offset from the signatory text.


### STU Capture Dialog

When capturing data from STU device, apart from the below options there are some device specific ones.

* **encrypt**: Boolean indicating if the comunication with the STU Tablet should be encrypted. By deafult is true.
* **sizeMode**: Indicates how the size of the dialog shoul be, the possible values are:
    * **fixed**: It takes the passed width and height.
	* **fit**: It takes the size of the parent with attached to a div.
	* **strech**: It ajust to one passed dimension, width or height and adjus the other in proportion.
	* **stu**: It takes the device dimensions.
	
	