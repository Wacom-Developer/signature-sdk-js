# Getting Started with the Demos

## Web Development Environment

To run the sample code first ensure you have installed the following:

* node.js e.g. download from [node.js](https://nodejs.org/en/download/)
* python e.g. [python 3.8.3](https://www.python.org/downloads/release/python-383/)
  (check that Python has been added to the Windows path variable)

## Download Signature SDK for JavaScript.

Download the SDK from https://developer.wacom.com/developer-dashboard

* Login using your Wacom ID
* Select **Downloads for signature**
* Download **Wacom Ink SDK for signatures for JavaScript**
* Accept the End User License Agreement to use the SDK

The downloaded Zip file contains the Signature SDK for JavaScript.

    
## WILL Ink SDK  for Web

**Wacom Ink Layer Language (WILL™)** is a cross-platform digital ink technology.
It is based on the needs of the end-user and Wacom's experience with different domains.
WILL allows you to include premium digital inking features in your applications.
It uses a modularized pipeline allowing each module to be configured, replaced, or omitted as required by the specific application, providing you with superior flexibility.

Using Will Ink SDK library it is optional for Signature SDK for JavaScript, 
however it is highlight recommended as improved the quality of the captured signature inking.

### Download WILL Ink SDK

Download the SDK from https://developer.wacom.com/developer-dashboard

* Login using your Wacom ID
* Select **Downloads for ink**
* Download **WILL SDK for ink for Web (version 3)**
* Accept the End User License Agreement to use the SDK

The downloaded Zip file contains the SDK ink engine accessed by the sample code.


## SDK License

A valid licence it is needed for using Signature SDK for JavaScript, the demo code
include an evaluation licence.

---

## Using the Signature SDK Sample Code

* copy the files *signature_sdk.js* and *signature_sdk.wasm* from the Signature SDK for JavaScript zip file into the folder */demos/common/libs/*
* create a folder called *digital-ink* within */sigCaptDialog/libs/will/*. 
* copy the folder from the downloaded WILL Ink SDK to the created above folder
    * */sigCaptDialog/libs/will/digital-ink*
* start a command prompt in the demos folder */demos/*
* use the command ```npm install``` to create the node_modules folder with all the dependencies

The web based app needs a web server.
Python's `SimpleHTTPServer` provides an easy way to get started.
To start the web server, start a command prompt in the project root folder and run:

```
# Python 2:
python -m SimpleHTTPServer 8080

# Python 3:
python -m http.server 8080
```

Now you can access the web-demos via:

```http://localhost:8080/index.html```


---

