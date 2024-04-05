# Wacom Signature SDK for JavaScript

- [Wacom Signature SDK for JavaScript](#wacom-signature-sdk-for-javascript)
	- [Introduction](#introduction)
		- [Supported web browsers](#supported-web-browsers)
		- [Creating the Signature Object](#creating-the-signature-object)
	- [SigCaptDialog for Wacom Signature SDK](#sigcaptdialog-for-wacom-signature-sdk)
		- [How to use SigCaptDialog library](#how-to-use-sigcaptdialog-library)
		- [Configure the library](#configure-the-library)
			- [Signature Capture Dialog](#signature-capture-dialog)
			- [STU Capture Dialog](#stu-capture-dialog)
	- [Ways of capturing a signature](#ways-of-capturing-a-signature)
		- [Using Wacom STU tablet](#using-wacom-stu-tablet)
		- [Using HTML5 canvas](#using-html5-canvas)
		- [Problems](#problems)
	- [About the content of this folder](#about-the-content-of-this-folder)
		- [Documentation](#documentation)
		- [Demos](#demos)
	- [Additional resources](#additional-resources)
		- [Sample Code](#sample-code)
		- [Documentation](#documentation-1)
		- [Support](#support)
		- [Developer Community](#developer-community)
		- [License](#license)

> **Version 2 of the signature SDK for JavaScript has now been released!** 
> 
> **Please note that version 1 is now discontinued.** 
> 
> **Version 1 users wishing to use the signature SDK for JavaScript should upgrade to version 2. A guide on how to upgrade can be viewed by [following this link here](https://developer-docs.wacom.com/docs/sdk-for-signature/guides/javascript/v2/v2-upgrade/)**

## Introduction

Wacom’s Signature SDK library for JavaScript provides software components to capture handwritten signatures from a Web Browser. 
The library simplifies the interaction with Wacom pen tablets and provides an API to manage and display signatures. 

The signature can be captured using the standard JavaScript canvas API, or using a Wacom STU tablet. In order to use a Wacom STU tablet the Web Browser needs to support WebHID feature.
Additional information about WebHID can be viewed [here.](https://caniuse.com/webhid)

### Supported web browsers

The **Signature SDK for JavaScript** is based on WebAssembly, a binary instruction format that is supported for most major modern web browsers.

Additional information about WebAssembly compatibility can be viewed [here.](https://caniuse.com/wasm)

For using Wacom STU tablets*, all the browsers that implement WebHID should be supported. Thus, at the moment it is supported as a feature on:

- Chromium
- Google Chrome
- Microsoft Edge
- Opera

Firefox and Safari have refused to implement this feature on the basis of security reasons, so it won't be supported.

***NB: The STU-541 features TLS encryption, which is not compatible with the JS SDK at this time.**


| Browser        | Canvas support | WebHID support |
| -------------- | -------------- | -------------- |
| Chrome         | Yes            | Yes            |
| Chromium       | Yes            | Yes            |
| Microsoft Edge | Yes            | Yes            |
| Opera          | Yes            | Yes            |
| Firefox        | Yes            | No             |
| Safari         | Yes            | No             |


When using the SDK on iOS and MacOS devices, Safari 15 or later is required as a minimum. 

### Creating the Signature Object

 

Before the Signature Object can be created, the WebAssembly module must be loaded.

```
     Module.onRuntimeInitialized = _ => {           

            let mSigObj = new Module.SigObj();

      }
```

## SigCaptDialog for Wacom Signature SDK 

The Signature SDK library does not provide a way to capture the signature points; rather, it generates the signature with points once they've been captured. It is the responsibility of the integrator to determine how the points are captured. 
SigCaptDialog is a library that provides a canvas for capturing data, either using a Wacom STU signature tablet or a generic device using standard JavaScript canvas components.

### How to use SigCaptDialog library
The main library file is **sigCaptDialog.js**. This file consists of a class that is used to open a canvas for signature capturing.
The simplest ways of using it would be:

```js
// create a sigObj object from Signature SDK and set its licence.
var sigObj = new Module.SigObj();	
sigObj.setLicence(key, secret);		

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

With the default library, we are able to capture pointer events from JavaScript such as mouse, touch or pen data.
In Web Browsers that support WebHID, it is also possible to connect to Wacom STU devices using **stuCaptDialog.js**. This is based on Wacom STU SDK for JavaScript.

The usage is similar to SigCaptDialog:
 
```js
// create a sigObj object from Signature SDK and set its licence.
var sigObj = new Module.SigObj();	
sigObj.setLicence(key, secret);		

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

Apart from **signCaptDialog.js** and **stuCaptDialog.js**, some third-party licenses need to be added to the project:

### Configure the library 

#### Signature Capture Dialog
A JSON config string that is passed by the constructor can be used to configure the dialog appearance.

The default values for SigCapDialog look like:

```js
	this.config = {
	  width: 400,
	  height: 300,
	  left: 0,
	  top:0,
	  centered:true,
	  title: "My Tittle",
	  borderColor: "#0097d4",
	  borderWidth: "1p",
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
	  background: {alpha: 1.0, color: "white", mode:"fit"},
	  reason: {visible:true, fontFace:"Arial", fontSize:16, color:"black", offsetY:10, offsetX:5},
	  signatory: {visible:true, fontFace:"Arial", fontSize:16, color:"black", offsetY:5, offsetX:30},
	  date: {visible:true, fontFace:"Arial", fontSize:16, color:"black", offsetY:20, offsetX:30},
	  signingLine: {visible:true, left:30, right:30, width:2, color:"grey", offsetY:5},
	  source: {mouse:true, touch:true, pen:true, stu:true},	 
	  strokeColor:"#0202FE",
	  strokeSize:6,	  
	  modal: true,
	  draggable: true,
	  timeOut: {enabled:false, time:10000, onTimeOut:null},
	  allowZeroPressure: true
    }; 
	
``` 

Where the meaning of each field is:

* **width**: Integer value indicating the width of the canvas.
* **weight**: Integer value indicating the height of the canvas.
* **left**: Integer value with the left of the canvas when it is opened as float dialog.
* **top**: Integer value with the top of the canvas when it is opened as float dialog.
* **centered**: Boolean value that indicates if the dialog should be centered on the screen when it is opened as a float dialog. If this value is true, the left and top values are ignored.
* **title**: String with the title to show in the title bar when it is opened as float dialog.
* **borderColor**: String indicating the color of the border when the dialog is opened as float dialog.
* **borderWidth**: Integer indicating the width of the dialogs’ border when opening as float dialog.
* **hasTitle**: Boolean value indicating if there is a title bar when opening as float dialog.
* **attachTo**: String that indicates the id of a div, in which the capture dialog will be attached as children. When it is not defined, the dialog will be opened as a float. 
* **modal**: Boolean indicating that the dialog will be opened as modal or not. A modal dialog is one that blocks the rest of the screen's content, disabling other form controls.
* **draggable**: When the dialog is shown as a float dialog and has a title bar. This Boolean value indicates if the dialog can be moved when dragging the title bar.
* **source**: Indicates what kind of event if accepted. The possible values are: mouse, touch, pen and stu in the format of source:{mouse:true, touch:true, pen:true, stu:true}; if one value is missing or false, this source won’t be captured. For example, if we defined mouse as false, the mouse won’t be valid for signature capturing. NB: When capturing signatures with mouse or touch for forensic validation, not all the necessary data (such as pen pressure) can be provided.
* **strokeColor**: Color of the ink strokes. 
* **strokeSize**: Size of the ink strokes. 
* **timeOut**: A timeout can be set if users wish to apply a limited period to the signing.
    * **enabled**: Boolean value that indicates if timeout is enabled or not. 
    * **time**: Time in milliseconds before timeout.
    * **onTimeOut**: Effect to be had upon timeout. 
* **allowZeroPressure**: Boolean value that indicates if zero pressure is valid. 
* **buttons**: By default, the dialog will show three buttons at the bottom for aceptance, cancel or clear. With this configuration we can adjust the buttons to display, their appearance and the action to be executed when selected.
The order indicates the order in which it will be displayed from left to right.
    * **text**: Button text. If the text of the button starts with *, this indicates that it will use translation strings, given that they exist.
	* **textColor**: Button text color.
	* **backgroundColor**: String indicating the background color of the button.
	* **borderWidth**: Number indicating the width of the button border.
	* **borderColor**: String that indicates the button color border.
	* **onClick**: Function that will be executed when the button is clicked.
* **buttonsFont**: A String indicating the name of the font to use on the buttons.
* **background**: The captured dialog can have a color or image as background. Transparency can also be applied.
    * **color**: String with the background color to be applied.
	* **alpha**: Float number between 0 (transparent) to 1 (opaque).
    * **image**: Image object with the image to be set as the background.
    * **mode**: Value setting the way the background is applied. Values are `center`, `fit`, `none` and `pattern`.
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
* **date**:  Object with the metrics to show the date at the time of signing.
    * **visible**: Boolean indicating if the date should be shown.
    * **fontFace**: String with the font name.
    * **fontSize**: Number indicating the font size.
    * **color**: String indicating the font color.
    * **offsetX**: Number indicating the offset from the right.
    * **offsetY**: Number indicating the offset from the bottom.
* **signingLine**: Object with the metrics to show the signing line. It consists of:
    * **visible**: Boolean indicating if the signing line should be shown.
    * **left**: Number indicating the padding from the left.
    * **right**: Number indicating the padding from the right.
    * **width**: Number indicating the width of the line.
    * **color**: String with the line color.
    * **offsetY**: Number with the offset from the signatory text.


#### STU Capture Dialog

When capturing data from an STU device, apart from the above options, there are some device specific ones.

* **encrypt**: Boolean indicating if the communication with the STU Tablet should be encrypted. By default this is true.
* **sizeMode**: Indicates what the size of the dialog should be. The possible values are:
    * **fixed**: It takes the passed width and height.
	* **fit**: It takes the size of the parent when attached to a div.
	* **stretch**: It adjusts to one passed dimension, width or height and adjusts the other in proportion.
	* **stu**: It takes the device dimensions.

## Ways of capturing a signature

            Using the signature object’s function generateSignature, it is possible to generate new signatures. This function needs to be provided by the capture points, which can come from a Wacom STU device, HTML canvas, etc. However, only signatures with pressure values will be valid for signature validation. This means that capturing the signature with a mouse or touch screen would not be a valid signature for validation purposes.

In the examples below, two different ways of capturing a signature are described:

### Using Wacom STU tablet

            Using Wacom STU SDK for JavaScript, we can capture a valid signature from a Wacom STU tablet. For more information, please see the examples or the Wacom STU SDK information.

### Using HTML5 canvas

            Most modern browsers are able to capture pen data. Here, two examples of how to capture a valid signature through the use of an HTML5 canvas and pen device have been provided. While you can use this method to capture a signature using a mouse or a touch screen, this signature won’t have pressure information and therefore an invalid signature for validation purposes. 

### Problems

When collecting pen data from a device other than an STU, HTML5 pointer events for these devices are captured using JavaScript point events. Due to limitations on certain browsers, the sample rates may be limited when running these point events. 

Firefox supports pen pressure since Firefox 59. This however needs to be activated. On Windows, you may need to toggle a browser setting to get pen pressure to function.

For Firefox:

1. Enter "about:config" into your address bar and press enter.
2. Type "w3c" in the search box, then double-click on "dom.w3c_pointer_events_dispatch_by_pointer_messages". Change its value column to "true".
3. Make sure "dom.w3c_pointer_events.enabled" is also set to "true". This is the default for this version of Firefox.

**NB: In the Windows version, capturing a signature would lead to the PC's Network Card ID being saved as signature property. In the JavaScript version, this field is not mandatory anymore.**

On the latest version of Firefox, running an incognito window will disable the use of internal storage, preventing users from capturing a signature from a generic device. It is important that if capturing with Firefox, users run their application in a normal window. 

## About the content of this folder

- README.md – This file, containing general background and platform information.
- GETTING-STARTED.md – The description of how to use the Signature SDK. 
- THIRDPARTY.md - List of third-party licenses.

### Documentation

- Signature_SDK_JS_API.md – The description of the Signature SDK API.

### Demos

This folder contains the SDK's demonstration code. Please note that due to different screen sizes on devices, the demo may need to be modified to meet customer needs. 

- common – This folder holds code common across all the examples.
- complete_demo – This folder contains a demo that shows all the features of Signature SDK JS using SigCaptDialog library.
- simple – This folder contains a simple example that shows how to load and capture signatures, using either an STU Device or Pen in an HTML5 canvas.

## Additional resources

### Sample Code
For further samples check Wacom's Developer additional samples, see
https://github.com/Wacom-Developer

### Documentation

For further details on using the SDK see [Wacom Ink SDK for signature documentation](https://developer-docs.wacom.com/docs/overview/sdks/sdk-for-signature/)

### Support
If you experience issues with the technology components, please see related [FAQs](https://developer-support.wacom.com/hc/en-us)

For further support file a ticket in our **Developer Support Portal** described here: [Request Support](https://developer-support.wacom.com/hc/en-us/requests/new)

### Developer Community 
Join our developer community:

- [LinkedIn - Wacom for Developers](https://www.linkedin.com/company/wacom-for-developers/)
- [Twitter - Wacom for Developers](https://twitter.com/Wacomdevelopers)

### License 
This sample code is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
