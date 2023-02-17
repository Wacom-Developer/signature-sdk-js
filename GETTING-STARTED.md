# Wacom Signature SDK for JavaScript

- [Wacom Signature SDK for JavaScript](#wacom-signature-sdk-for-javascript)
  - [Setting up the Demo application](#setting-up-the-demo-application)
    - [How to use](#how-to-use)
  - [Installation](#installation)
    - [Web Development Environment](#web-development-environment)
    - [Download Signature SDK for JavaScript.](#download-signature-sdk-for-javascript)
    - [WILL Ink SDK  for Web](#will-ink-sdk--for-web)
      - [Download WILL Ink SDK](#download-will-ink-sdk)
    - [SDK License](#sdk-license)
    - [Using the Signature SDK Sample Code](#using-the-signature-sdk-sample-code)
  - [Licensing](#licensing)
    - [Setting up the license](#setting-up-the-license)
      - [Simple demo - in demos/simple/simple.js](#simple-demo---in-demossimplesimplejs)
      - [Complete demo - in demos/complete\_demo/index.html](#complete-demo---in-demoscomplete_demoindexhtml)
  - [Operate the Demo application](#operate-the-demo-application)
    - [Capture Signature](#capture-signature)
      - [Choose file](#choose-file)
      - [Capture signature from STU tablet](#capture-signature-from-stu-tablet)
      - [Capture signature from Generic device](#capture-signature-from-generic-device)
    - [Read Signature](#read-signature)
      - [Load captured signature](#load-captured-signature)
    - [Settings](#settings)
  - [Operate the Simple Demo application](#operate-the-simple-demo-application)
  - [Known issues](#known-issues)

The **Wacom Signature SDK for JavaScript** is intended to generate signature objects for the user. It provides the documentation and tools to create signature-enabled applications.
The JavaScript SDK implements the functionality in browser-ready script. No component installations are required and the SDK is platform-independent.
It does, however, require a browser that supports **WebAssembly** primarily, and **WebHID** when using an STU tablet for pen input.

Please view the README for additional information on WebHID and WebAssembly.

## Setting up the Demo application

### How to use

Currently, WebHID works if executed locally or on a secure connection.

Download the SDK from https://developer.wacom.com/developer-dashboard

- Login using your Wacom ID
- Select **Downloads for signature**
- Download **Wacom Ink SDK for signatures for JavaScript**
- Accept the End User License Agreement to use the SDK

The downloaded Zip file contains the Signature SDK for JavaScript.

The Signature SDK for JavaScript is distributed as two files:

1. wasm – This is the SDK itself.
2. js – This is the JavaScript wrapper.

Using the SDK via the website must be done on a web server due to security restrictions. It cannot be used directly from the local file system. Additionally, the connection must be secure (https) when using another URL other than localhost.

Only the JavaScript file needs to be included & imported on the HTML page:

```
      <script src="signature_sdk.js"></script> <!-- signature SDK -->
```

Due to WebAssembly security restrictions, the demo page must be opened on a web server and not directly from a local file system.
For initial development, it is convenient to use localhost for this purpose.

For example, use Node.js with `http-server`, then launch the demo code from the local server as:

```
  http://localhost:8080/demos/complete_demo/index.html
```

## Installation

### Web Development Environment

To run the sample code first ensure you have installed the following:

* node.js e.g. download from [node.js](https://nodejs.org/en/download/)
* python e.g. [python 3.8.3](https://www.python.org/downloads/release/python-383/)
  (check that Python has been added to the Windows path variable)

### Download Signature SDK for JavaScript.

Download the SDK from https://developer.wacom.com/developer-dashboard

* Login using your Wacom ID
* Select **Downloads for signature**
* Download **Wacom Ink SDK for signatures for JavaScript**
* Accept the End User License Agreement to use the SDK

The downloaded Zip file contains the Signature SDK for JavaScript.

    
### WILL Ink SDK  for Web

**Wacom Ink Layer Language (WILL™)** is a cross-platform digital ink technology.
It is based on the needs of the end-user and Wacom's experience with different domains.
WILL allows you to include premium digital inking features in your applications.
It uses a modularized pipeline allowing each module to be configured, replaced, or omitted as required by the specific application, providing you with superior flexibility.

Using the WILL Ink SDK library is optional for Signature SDK for JavaScript. However, it is highly recommended as it improves the quality of the captured signature inking.

#### Download WILL Ink SDK

Download the SDK from https://developer.wacom.com/developer-dashboard

* Login using your Wacom ID
* Select **Downloads for ink**
* Download **WILL SDK for ink for Web (version 3)**
* Accept the End User License Agreement to use the SDK

The downloaded Zip file contains the SDK ink engine accessed by the sample code.


### SDK License

A valid license is needed for using Signature SDK for JavaScript, the demo code
includes an evaluation license.

---

### Using the Signature SDK Sample Code

* copy the files *signature_sdk.js* and *signature_sdk.wasm* from the Signature SDK for JavaScript zip file into the folder: 
    * */demos/common/libs/*
    * NB: Be sure to copy and paste the contents of the folder, and not the folder itself, so the directory looks like this:

![JavaScript SDK sample placement](media/sdk-js-location.png)

* create a folder called *will* within */sigCaptDialog/libs/*. Within */will/*, create a new folder called *digital-ink*
* copy the contents of the folder from the downloaded WILL Ink SDK and put them into the created above folder:
    * */sigCaptDialog/libs/will/digital-ink*
    * NB: Be sure to copy and paste the contents of the folder, and not the folder itself, so the directory looks like this:

![WILL Web SDK sample placement](media/sdk-web-location.png)


* start a command prompt in the root folder
* use the command ```npm install``` to create the node_modules folder with all the dependencies
* after installation, the root should look like this: 

![Root](media/root.png)

The web-based app needs a web server.
Python's `SimpleHTTPServer` provides an easy way to get started.
To start the web server, start a command prompt in the project root folder and run:

```
# Python 2:
python -m SimpleHTTPServer 8080

# Python 3:
python -m http.server 8080
```

Now you can access the web demos via:

```http://localhost:8080/demos/index.html```



## Licensing

A valid license is needed for using Signature SDK for JavaScript. The demo code
includes an evaluation license.

### Setting up the license

You may obtain either an evaluation license or a commercial license at: https://developer.wacom.com/en-us/developer-dashboard/license-keys.

An evaluation license is also available here:

`eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiMzNhYWUyODA0NmM0MmE5OTgyY2E1NTdkZjhmY2YxOCIsImV4cCI6MTcwODE3ODg3NCwiaWF0IjoxNjc2NjQyODg2LCJzZWF0cyI6MCwicmlnaHRzIjpbIkpTX0NPUkUiLCJTSUdfU0RLX0NPUkUiLCJTSUdfU0RLX0lTTyIsIlNJR19TREtfRU5DUlBZVElPTiJdLCJkZXZpY2VzIjpbIldBQ09NX0FOWSJdLCJ0eXBlIjoiZXZhbCIsImxpY19uYW1lIjoiTGljZW5zZSBmb3IgSmF2YXNjcmlwdCBEZW1vIiwid2Fjb21faWQiOiJiMzNhYWUyODA0NmM0MmE5OTgyY2E1NTdkZjhmY2YxOCIsImxpY191aWQiOiIyMWU0NDkwYi1jYjc0LTQ3YzItODUyMy1jZTEzNjNkOTBhOWIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.s6oKOEfEY2EaI8S8SRANq2NF001UAdf9qahYLRgsb7wbtHoPN4lHZpbpy5yypvNTS-NqQDHuVBtOhfge7jM6k8C000fq4DjqenhIbxJZ4aBJ9NHYUAdZv2nN3rlmeS-6eNS3rb00WHLzWv3Pl9TO53d08Ymr1_mx8Aymr5zEeiMrafiGe4rbx4S02l3O7PvXKBgVqMNxDSrfYBJ7yBDAYJHDmpzwpake-MhWZLYYy8BEJ0P3I1o4UxToQIYBLMlaqLAxTLiJdutHkB4bx1xbOJh8nFaJaTyYnkfo7bkTn9kj_W2kw8h_HhZu4A4eROqUXmnKHvNryrt-wHk5b6Ly-g`

NB: this particular license is only valid for a limited time.

Once you have a valid license, you can initialize the Signature SDK for JavaScript with the following code:

#### Simple demo - in demos/simple/simple.js

```
      try {

        mSigObj.setLicence("PUT HERE YOUR LICENCE STRING");  

      } catch (e) {

        ...

      }
```

#### Complete demo - in demos/complete_demo/index.html

```
<script>
		    const licence = "PUT HERE YOUR LICENCE STRING";

        ...

</script>
```

Now you may use any of the API functions, calling them directly from the Signature Object. You can see these functions in more detail in: Signature_SDK_JS_API.md.

Install the JWT license which is supplied separately.

To obtain a license for the SDK, please contact your regional Wacom Sales representative. You can contact sales by going to https://developer.wacom.com/.

Insert the license string in the demo code.

Within index.html or simple.js for the complete and simple demos respectively, locate 'PUT HERE YOUR LICENCE STRING' and insert the license string in its place.

## Operate the Demo application

When opening the demo application, you will reach this page. Its main functions are shown in the buttons within the screenshot below.

![Demo Frontpage](media/demo-1.png)

Each section does the following:

- Capture Signature: Choose a file to load a previously captured signature.
- Read Signature: With an attached STU, capture a new signature.
- Settings: With an attached integrated pen device, capture a new signature.

### Capture Signature

The main functionalities of this page are:

- Choose file: Choose a file to bind to the signature. This can be later used to see if the document has been changed or not.
- Capture signature from STU tablet: With an attached STU, capture a new signature.
- Capture signature from Generic device: With an attached integrated pen device, capture a new signature.

In the case of the latter two options, the user will have the option to save the signature as a .png, .txt or in Wacom's .fss (Forensic Signature Stream) format.

After using all three sections, the signature image will appear at the bottom.

The user may also add the signatory and the reason for signing in the Signatory and Reason categories. This information will appear within the signature box.

Additional data may be included through the use of "Add extra data".

![Adding a signatory and reason for signing](media/signatory-reason.png)

#### Choose file

A file may be selected to be bound to a signature due to be captured.

![Example signature](media/choose-file-1.png)

Once the signature is generated, a document may be selected with "Choose file". From there, the user may select the "Read Signature" tab.

A list of details of the signature will be visible. Upon choosing the file previously bound to a signature, you'll get a prompt saying the signed data is correct.

![Example success](media/choose-file-2.png)

If the signed data does not match, the user will be informed of this error.

![Example failure](media/choose-file-3.png)

#### Capture signature from STU tablet

To capture a signature with an STU, plug in an STU and click the "Capture signature from STU tablet" button.

![Choose File button](media/stu-1.png)

This will then yield the prompt below.

![STU connect](media/stu-2.png)

Select the STU in the list and choose "Connect".

![STU selected](media/stu-3.png)

On the screen and STU, this display will appear.

![STU display](media/stu-4.png)

You may now write your signature.

![Signature written](media/stu-5.png)

If you make a mistake, you may use the "Clear" button to erase all. This will remove all digital ink on the screen and revert it to how it was at the beginning.

If the user changes their mind, the "Cancel" button may be pressed at any time to close the signing application. Once happy with the signature, press OK.

The Signature will then be displayed in the Signature image box below.

![STU render](media/stu-6.png)

#### Capture signature from Generic device

To capture a signature with an integrated pen device, plug in an integrated pen device and click the "Capture signature from Generic device" button.

![Capture button](media/pen-1.png)

On the screen, this display will appear.

![Capture display](media/pen-2.png)

You may now write your signature. This may be done by mouse, touch and pen, with a toggle list for enabling and disabling each.

![Signed display](media/pen-3.png)

If you make a mistake, you may use the "Clear" button to erase all. This will remove all digital ink on the screen and revert it to how it was at the beginning.

If the user changes their mind, the "Cancel" button may be pressed at any time to close the signing application. Once happy with the signature, press OK.

The Signature will then be displayed in the Signature image box below.

### Read Signature

#### Load captured signature

To load a previously captured signature, select a file with the "Choose File" button. This file may have been saved either as a .txt file, as an encoded bitmap or as raw FSS data.

![Choose File button](media/read-file-1.png)

This will then open up an instance of File Explorer and you may select a signature previously captured. This may be done through the use of a .png file.

From there, the SDK will render the signature selected by the user and display it in the "Signature image" section at the bottom of the page.

![SDK render](media/read-file-2.png)

Another acceptable format for input in the SDK is a .txt file, provided the .txt file contains data for the signature stored in FSS format. An example of this format is shown below.

![Example FSS](media/read-file-3.png)

The FSS displayed on-screen will yield the same signature in the previous image.

From the loaded signature, the following data can be extracted such as the signatory name, reason for signing, date/time signed and additional data the user may have previously added.


### Settings

The settings section contains configuration for the demos:

- Ink: This section allows for selection of the type of inking tool, its colour and the choice of whether or not to use a background image.

- Capture window: This section allows adjustment of the capture window's size, fonts, their size and x/y offsets that appear within it and the number of buttons that appear.

- Render: This section allows configuration of the signature render upon completion of a successful signature capture.

## Operate the Simple Demo application

A simplified version of the JS demo exists within demos/simple/index.html, with the only options existing being to read a signature and capture a signature with a generic device or signature device.

![Simple demo](media/simple-demo.png)

## Known issues

- On Android and iOS, performing two point touch over the signature capture area (e.g zooming in or out) will produce a defaced signature trace on the canvas.
- On a Motorola G30, the signature area is not loaded and trace is unable to be added. This is an issue with the installed web browser, rather than an issue with the Signature SDK.
- On Chrome 101 with older Windows 10 (or Windows 7) versions, it will not be possible to add STU or Generic signatures. This is a web browser issue that would, were a fix to be made, introduce further problems.
- On iOS 15, when adding strokes, occasionally a dot artifact is created at the end point of the stroke when signing. When pressing OK to complete the signature, the dot artifact is no longer visible and the signature renders correctly.