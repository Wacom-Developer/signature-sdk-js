# Wacom Signature SDK for JavaScript

- [Wacom Signature SDK for JavaScript](#wacom-signature-sdk-for-javascript)
  - [Introduction](#introduction)
    - [Supported web browsers](#supported-web-browsers)
    - [Creating the Signature Object](#creating-the-signature-object)
  - [Ways of capturing a signature](#ways-of-capturing-a-signature)
    - [Using Wacom STU tablet](#using-wacom-stu-tablet)
    - [Using HTML5 canvas](#using-html5-canvas)
    - [Problems](#problems)
  - [About the content of this folder](#about-the-content-of-this-folder)
    - [Documentation](#documentation)
    - [Sample](#sample)

## Introduction

Wacom’s Signature SDK library for JavaScript provides software components to capture handwritten signatures from a Web Browser. 
The library simplifies the interaction with Wacom pen tablets and provides an API to manage and display signatures. 

The signature can be captured using the standard JavaScript canvas API, or using a Wacom STU tablet. In order to use a Wacom STU tablet the Web Browser needs to support WebHID feature.
Additional information about WebHID can be viewed [here.](https://caniuse.com/webhid)

### Supported web browsers

The **Signature SDK for JavaScript** is based on WebAssembly, a binary instruction format that is supported for most major modern web browsers.

Additional information about WebAssembly compatibility can be viewed [here.](https://caniuse.com/wasm)

For using Wacom STU tablets all the browsers that implement WebHID should be supported. Thus, at the moment it is supported as a feature on:

- Chromium
- Google Chrome
- Microsoft Edge
- Opera

Firefox and Safari have refused to implement this feature on the basis of security reasons, so it won't be supported.


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

## Ways of capturing a signature

            Using the signature object’s function generateSignature, it is possible to generate new signatures. This function needs to be provided by the capture points, which can come from a Wacom STU device, HTML canvas, etc. However, only signatures with pressure values will be valid for signature validation. This means that capturing the signature with a mouse or touch screen would not be a valid signature for validation purposes.

In the examples below, two different ways of capturing a signature are described:

### Using Wacom STU tablet

            Using Wacom STU SDK for JavaScript, we can capture a valid signature from a Wacom STU tablet. For more information, please see the examples or the Wacom STU SDK information.

### Using HTML5 canvas

            Most modern browsers are able to capture pen data. Here, two examples of how to capture a valid signature through the use of an HTML5 canvas and pen device have been provided. While you can use this method to capture a signature using a mouse or a touch screen, this signature won’t have pressure information and therefore an invalid signature for validation purposes. 

### Problems

When collecting pen data from a device other than an STU, HTML5 pointer events for these devices are captured using JavaScript point events. Due to limitations of certain browsers, the sample rates may be limited when running these point events. 

Firefox supports pen pressure since Firefox 59. This however needs to be activated. On Windows, you may need to toggle a browser setting to get pen pressure to function.

For Firefox:

1. Enter "about:config" into your address bar and press enter.
2. Type "w3c" in the search box, then double click on "dom.w3c_pointer_events_dispatch_by_pointer_messages". Change its value column to "true".
3. Make sure "dom.w3c_pointer_events.enabled" is also set to "true". This is the default for this version of Firefox.

NB: In the Windows version, capturing a signature would lead to the PC's Network Card ID being saved as signature property. In the JavaScript version, this field is not mandatory anymore. 

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