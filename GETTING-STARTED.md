# Wacom Signature SDK for JavaScript

- [Wacom Signature SDK for JavaScript](#wacom-signature-sdk-for-javascript)
  - [Setting up the Demo application](#setting-up-the-demo-application)
    - [How to use](#how-to-use)
  - [Installation](#installation)
  - [Licensing](#licensing)
    - [Setting up the license](#setting-up-the-license)
      - [Simple demo - in demos/simple/simple.js](#simple-demo---in-demossimplesimplejs)
      - [Complete demo - in demos/complete_demo/index.html](#complete-demo---in-demoscomplete_demoindexhtml)
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
    - [Windows 10](#windows-10)


The **Wacom Signature SDK for JavaScript** is intended to generate signature objects for the user. It provides the documentation and tools to create signature enabled applications.
The JavaScript SDK implements the functionality in browser ready script. No component installations are required and the SDK is platform independent.
It does, however, require a browser that supports **WebAssembly** primarily, and **WebHID** when using an STU tablet for pen input.

Please view the README for additional information on WebHID and WebAssembly. 

## Setting up the Demo application

### How to use

Currently, WebHID works if executed locally or on a secure connection.

The Signature SDK for JavaScript is distributed as two files:

1. wasm – This is the SDK itself.
2. js – This is the JavaScript wrapper.

Using the SDK via the website must be done on a web server due to security restrictions. It cannot be used directly from the local file system. Additionally, the connection must be secure (https) when using another URL other than localhost.

Only the JavaScript file needs to be included & imported on the HTML page:

```
      <script src="signature_sdk.js"></script> <!-- signature SDK -->
```

Due to WebAssembly security restrictions, the demo page must be opened on a web server and not directly from a local file system.
For initial development it is convenient to use localhost for this purpose.

For example, use Node.js with http-server, then launch the demo code from the local server as:
```
  http://localhost:8080/demos/complete_demo/index.html
```
## Installation

No SDK installation is required. Unzip the downloaded SDK files and copy them into the sample's "common/libs" folder. 

The demonstration must be run from an http server. localhost servers are acceptable. Examples of a suitable local server include IIS, Python or Node.js. This guide will briefly go over setting up a local server in Node.js. 

To summarize the Node.js server setup:


- install Node.js from https://nodejs.org/en/download/
- create a folder e.g. ```c:\myserver```
- start a command prompt, ```cd \myserver```
- install the server components: ```npm install http-server -g```
- start the local server: ```http-server```
- copy the SDK simple and common folders to ```\myserver```
- browse to the start page: ```http://localhost:8080/demos/complete_demo/index.html```
- click a button for the required operation e.g. ```Capture signature from STU tablet```

For more information regarding using Node.js, see: https://www.npmjs.com/package/http-server

## Licensing


### Setting up the license

 
The Signature SDK for JavaScript requires a valid license. You may obtain either an evaluation license or commercial license at: https://developer.wacom.com/en-us/developer-dashboard/license-keys.



An evaluation license is also available here:

```eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiMzNhYWUyODA0NmM0MmE5OTgyY2E1NTdkZjhmY2YxOCIsImV4cCI6MTY1MzEyNDE4OSwiaWF0IjoxNjQ1NDM4MjA3LCJzZWF0cyI6MCwicmlnaHRzIjpbIkpTX0NPUkUiLCJTSUdfU0RLX0NPUkUiXSwiZGV2aWNlcyI6W10sInR5cGUiOiJldmFsIiwibGljX25hbWUiOm51bGwsIndhY29tX2lkIjoiYjMzYWFlMjgwNDZjNDJhOTk4MmNhNTU3ZGY4ZmNmMTgiLCJsaWNfdWlkIjoiZDJlYTAyNGQtMjg2NC00MGZiLWE1ODUtNzhmNDcyZDMyNzI5IiwiYXBwc193aW5kb3dzIjpbXSwiYXBwc19pb3MiOltdLCJhcHBzX2FuZHJvaWQiOltdLCJtYWNoaW5lX2lkcyI6W119.GJD8SASgJAbVqRKgeKgdbmZNUrCa1cf8F-CSxEtaouHKYuSNe0WBvLLUBMqU9m3LN5iBRdIqo3mhU_LJCAJ00i3hZN4OPT-LZPthwl10or-X4WzJQJrzJo642NMRGYeIGOtVpcAewL6Du2d7D0O4VG8dbcdAFf0P2EGpb_J-rHbq4-J59L7VSqi2s0Ta8kQ3jcfxu6DDmno1PWBZJAP_1bdeu4VpE9aGFbNGwv0FeJwyQftWDtNCkE2OKlLc92CnEqTNVacEUWk3MEQ-gqS8WS355iSOXcSpif0VeuIlFu3ZQeLd_q349uF9jK7cu0kT7iFhOw_aDVrYXen9Z0vJag```  

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

In the case of the latter two options, the user will have the option to save the signature as a .png, .txt on in Wacom's .fss (Forensic Signature Stream) format. 

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

The FSS displayed on screen will yield the same signature in the previous image. 

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

### Windows 10

In previous versions, there was a bug on Chrome and Edge that made the SDK fail. On Windows, it could be tested using Chrome Canary, which fixed the problem. This is an issue fixed in current versions.