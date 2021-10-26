# Wacom Signature SDK for JavaScript

- [Wacom Signature SDK for JavaScript](#wacom-signature-sdk-for-javascript)
  - [Test Environment](#test-environment)
    - [Android](#android)
    - [Chrome OS](#chrome-os)
    - [Chromium OS CloudReady](#chromium-os-cloudready)
    - [Linux](#linux)
    - [Mac](#mac)
    - [Windows 10](#windows-10)
  - [Installation](#installation)
  - [Licensing](#licensing)
  - [Operate the Demo application](#operate-the-demo-application)
    - [Choose File](#choose-file)
    - [Capture with STU device](#capture-with-stu-device)
    - [Capture with generic Pen](#capture-with-generic-pen)
  - [Known issues](#known-issues)
    - [Android](#android-1)
    - [Chrome OS](#chrome-os-1)
    - [Chromium OS CloudReady](#chromium-os-cloudready-1)
    - [Linux](#linux-1)
    - [Mac](#mac-1)
    - [Windows 10](#windows-10-1)


The **Wacom Signature SDK for JavaScript** is intended to generate signature objects for the user. It provides the documentation and tools to create signature enabled applications.
The Javascript SDK implements the functionality in browser ready script. No component installations are required and the SDK is platform independent.
It does, however, require a browser that supports **WebAssembly** primarily, and **WebHid** when using an STU tablet for pen input.

Please view the README for additional information on WebHid and WebAssembly. 

## Test Environment

### Android

Currently, WebHid is not implemented for Android. However, it is on the road map and it will be available some day.

### Chrome OS

WebHid works fine on Chrome OS.

### Chromium OS CloudReady

WebHid works fine on Chromium OS CloudReady. However, STU tablets are not detected. More information can be viewed in "Known issues".

### Linux

WebHid works fine on Linux. However, STU tablets are not detected. More information can be viewed in "Known issues".

### Mac

WebHid works fine on Mac.

### Windows 10

The SDK is dependent on WebAssembly technology and the browsers supported by it. A full list of supported browsers can be found here: https://caniuse.com/wasm

In addition, due to WebAssembly security restrictions, the demo page must be opened on a web server and not directly from a local file system.
For initial development it is convenient to use localhost for this purpose.

For example, use node.js with http-server, then launch the demo code from the local server as:
```
  http://localhost:8080/dist/demos/simple/index.html
```
## Installation

No SDK installation is required. Unzip the files and copy the distribution folders 'dist'. 

The demonstration must be run from an http server. localhost servers are acceptable. Examples of a suitable local server include IIS, Python or Node.js. This guide will briefly go over setting up a local server in node.js. 

To summarise the node.js server setup:


- install node.js from https://nodejs.org/en/download/
- create a folder e.g. ```c:\myserver```
- start a command prompt, ```cd \myserver```
- install the server components: ```npm install http-server -g```
- start the local server: ```http-server```
- copy the SDK distribution folder 'dist' to ```\myserver```
- browse to the start page: ```http://localhost:8080/dist/demos/simple/index.html```
- click a button for the required operation e.g. ```Capture with STU device```

For more information regarding using node.js, see: https://www.npmjs.com/package/http-server

## Licensing




Install the JWT license which is supplied separately.

Until a full production license has been obtained, use the LITE license from the standard Signature SDK, copied here:
```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA


``` 
Insert the license string in the demo code.

e.g: dist\demos\simple\simple.js. Within this file, locate 'PUT HERE YOUR LICENCE STRING' and insert the license string in its place. 

## Operate the Demo application

When opening the demo application, you will reach this page. Its main functions are shown in the buttons within the screenshot below.

![Demo Frontpage](media/demo-1.png)


Each section does the following:

- Choose file: Choose a file to load a previously captured signature.
- Capture with STU device: With an attached STU, capture a new signature. 
- Capture with generic Pen: With an attached integrated pen device, capture a new signature. 




After using all three sections, the signature image will appear at the bottom. 

### Choose File

To load a previously captured signature, select a file with the "Choose File" button. This file may have been saved either as a .txt file, as an encoded bitmap or as raw FSS data.

![Choose File button](media/choosefile-1.png)

This will then open up an instance of File Explorer and you may select a signature previously captured. This may be done through the use of a .png file.

![Example PNG file](media/choosefile-2.png)


From there, the SDK will render the signature selected by the user and display it in the "Signature image" section at the bottom of the page. 

![SDK render](media/choosefile-3.png)

Another acceptable format for input in the SDK is a .txt file, provided the .txt file contains data for the signature stored in FSS format. An example of this format is shown below. 

![Example FSS file](media/choosefile-4.png)

![Example FSS](media/choosefile-5.png)

The FSS displayed on screen will yield the signature displayed in the next screenshot in the "Signature image" section at the bottom of the page. 

![Example FSS result](media/choosefile-6.png)

### Capture with STU device

To capture a signature with an STU, plug in an STU and click the "Capture with STU device" button.

![Choose File button](media/stu-1.png)

This will then yield the prompt below. 

![STU connect](media/stu-2.png)

Select the STU in the list and choose "Connect".

![STU selected](media/stu-3.png)

On the screen and STU, this display will appear. 

![STU display](media/stu-4.png) 

You may now write your signature. 

![Signature written](media/stu-5.png)

If you make a mistake, you may use the "Clear" button to erase all.

![STU clear](media/stu-6.png)

This will remove all digital ink on the screen and revert it to how it was at the beginning. 

If the user changes their mind, the "Cancel" button may be pressed at any time to close the signing application. Once happy with the signature, press OK. 

The Signature will then be displayed in the Signature image box below. 

![STU render](media/stu-7.png)


### Capture with generic Pen




To capture a signature with an integrated pen device, plug in an integrated pen device and click the "Capture with generic Pen" button.

![Capture button](media/pen-1.png)

On the screen, this display will appear. 

![Capture display](media/pen-2.png)





You may now write your signature. 

![Signed display](media/pen-3.png)

If you make a mistake, you may use the "Clear" button to erase all.

![Display with mistake](media/pen-4.png)

This will remove all digital ink on the screen and revert it to how it was at the beginning. 

If the user changes their mind, the "Cancel" button may be pressed at any time to close the signing application. Once happy with the signature, press OK. 

The Signature will then be displayed in the Signature image box below. 

![Pen render](media/pen-5.png)


## Known issues

### Android

Currently, WebHid is not implemented for Android. However, it is on the road map and it will be available some day.

### Chrome OS

No issues have been reported for Chrome OS.

### Chromium OS CloudReady 

WebHid works fine, though issues with STU tablets not being detected are known. 

This distribution comes with Wacom drivers already installed, so to fix this issue, we need to blacklist it in order to let the STU devices be registered as HID devices.

Firstly, we need to disable rootfs verification to be able to write into the system files.

To disable rootfs verification, the following steps must be followed:

1. Log in
2. Press ctl+alt+t to open a terminal
3. Type in "shell" and hit enter
4. Confirm that the yellow "crosh" prompt is now a green "chronos@localhost" prompt

5. Disable rootfs verification: 

```
sudo disable_verity
```




6. Reboot your device

```
sudo reboot
```



7. You can now log in and proceed with rootfs edits as you normally would. You will still need to remount root as read/write:






```
sudo mount -o rw,remount /
```

Once you have permissions to write to the file system, you need to blacklist wacom driver. This can be done by putting in the file:

```
<b>/etc/modprobe.d/blacklist.conf</b>
```

on the line:
```
<b>blacklist wacom</b>
```
Then update-initramfs -u to have the system re-generate the initramfs.

### Linux 

Most Linux distributions come with default Wacom drivers installed. This driver does not have support for STU devices, and once it finds a STU tablet it raises an error refusing to register the HID device. In order to allow the STU tablet to be registered as an HID device, the Wacom driver must be disabled. 

This can be done by putting in the file:
```
<b>/etc/modprobe.d/blacklist.conf</b>
```
on the line:
```
<b>blacklist wacom</b>
```
Then update-initramfs -u to have the system re-generate the initramfs.

On most Linux systems, USB devices are mapped with read-only permissions by default. To allow Chrome to open a USB device, you will need to add a new udev rule. Create a file at ```/etc/udev/rules.d/99-stu.rules``` with the following content:

```KERNEL=="hidraw*", ATTRS{idVendor}=="056a", GROUP="plugdev", MODE="0660"``` where 056a is the code for the Wacom vendor and the current user needs to be in plugdev group.

A more generic rule could be ```KERNEL=="hidraw*", ATTRS{idVendor}=="056a", MODE:="0666"``` that grand permissions to all users (see udev rules manual for further details).

### Mac

No issues have been reported for Mac.

### Windows 10

In previous versions, there was a bug on Chrome and Edge that made the SDK fail. On Windows, it could be tested using Chrome Canary, which fixed the problem. This is an issue fixed in current versions.