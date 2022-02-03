- [Introduction](#introduction)
- [SigObj](#sigobj)
- [Methods summary](#methods-summary)
- [Methods](#methods)
  - [canDecrypt](#candecrypt)
  - [canEncrypt](#canencrypt)
  - [checkIntegrity](#checkintegrity)
  - [checkSignedData](#checksigneddata)
  - [exportIso](#exportiso)
  - [generateSignature](#generatesignature)
  - [getAdditionalData](#getadditionaldata)
  - [getExtraData](#getextradata)
  - [getHeight](#getheight)
  - [getLicence](#getLicence)
  - [getSigData](#getsigdata)
  - [getTextData](#gettextdata)
  - [getWhen](#getwhen)
  - [getWidth](#getwidth)
  - [getWho](#getwho)
  - [getWhy](#getwhy)
  - [importIso](#importiso)
  - [isCaptured](#iscaptured)
  - [isCrossedOut](#iscrossedout)
  - [isEncrypted](#isencrypted)
  - [isExternal](#isexternal)
  - [isEvaluation](#isevaluation)
  - [readEncodedBitmapBinary](#readencodedbitmapbinary)
  - [renderBitmap](#renderbitmap)
  - [setExtraData](#setextradata)
  - [setEncryptionPassword](#setencryptionpassword)
  - [setLicence](#setlicence)
  - [setSigData](#setsigdata)
  - [setTextData](#settextdata)
  - [setPrivateKey](#setprivatekey)
  - [setPublicKey](#setpublickey)
- [Hash](#hash)
- [AdditionalImportIsoData](#additionalimportisodata)
  - [setWho(who)](#setwhowho)
  - [setWhy(why)](#setwhywhy)
  - [setWhen(when)](#setwhenwhen)
  - [putExtraData(key, value)](#putextradatakey-value)


## Introduction




The Signature SDK for JavaScript is based on WebAssembly, a binary instruction format supported by most of the major modern web browsers (see https://caniuse.com/wasm for more information about compatibility) and is distributed as two files: 

1. signature_sdk.wasm – This is the SDK itself.
2. signature_sdk.js – This is the JavaScript wrapper.

Using the SDK via the website must be done on a web server due to security restrictions. It cannot be used directly from the local file system. Additionally, the connection must be secure (https) when using another URL other than localhost.

Firstly, the JavaScript needs to be imported from signature_sdk.wasm.

```<script src="{path to the sdk}/signature_sdk.js"></script> <!-- signature SDK -->```

Once the Signature SDK is imported, it is recommended to wait until the WebAssembly module is loaded:

```
Module.onRuntimeInitialized = function() {

    // put your code here

}
```

Once the module is loaded, you can create the signature object:

```const sigObj = new Module.SigObj();```      

The Signature SDK for JavaScript requires a valid license. You may obtain either an evaluation license or commercial license at: https://developer.wacom.com/en-us/developer-dashboard/license-keys

Once you have a valid license, you can initialize the Signature SDK for JavaScript with the following code:
```
try {  

    if (await sigObj.setLicence("licence string"))  {

          console.log("Licence setted fine");

    } else {

          console.log("Invalid licence");

    }

} catch (e) {

    console.log("Licence error "+e.name);

}      
```



With the signature object properly configured, you can use the following methods.




## SigObj




The SigObj encapsulates a captured handwritten signature. When populated, it contains a wealth of data that fully describes both the static and dynamic characteristic of a signature and the context in which the signature was captured. A Signature object can be bound (at the moment of capture) to the host document or another data set to provide a means of determining whether or not any changes have been made subsequently, either maliciously or unintentionally.

## Methods summary

| Methods                 |
| ----------------------- |
| canDecrypt              |
| canEncrypt              |
| checkIntegrity          |
| checkSignedData         |
| exportIso               |
| generateSignature       |
| getAdditionalData       |
| getExtraData            |
| getHeight               |
| getLicence              |
| getSigData              |
| getTextData             |
| getWhen                 |
| getWidth                |
| getWho                  |
| getWhy                  |
| importIso               |
| isCaptured              |
| isCrossedOut            |
| isEncrypted             |
| isExternal              |
| isEvaluation            |
| readEncodedBitmapBinary |
| renderBitmap            |
| setExtraData            |
| setEncryptionPassword   |
| setLicence              |
| setSigData              |
| setTextData             |
| setPrivateKey           |
| setPublicKey            |




## Methods


### canDecrypt

Checks if there has been a password or private key set for the signature object. Setting a password or private key for the signature object implies that when loading a signature, the Signature SDK will try to decrypt it with the provided password or private key.


| Return values                                    |
| ------------------------------------------------ |
| true – there is a password or private key set.   |
| false – there is no password or private key set. |

 

### canEncrypt

Checks if there has been a password or public key set for the signature object. Setting a password or public key for the signature object implies that when exporting a signature, the Signature SDK will try to decrypt it with the provided password or public key.




| Return values                                   |
| ----------------------------------------------- |
| true – there is a password or public key set.   |
| false – there is no password or public key set. |

 

### checkIntegrity

When a signature is captured it can be defined an integrity key. This function checks the integrity of the Signature object in order to detect whether it has been tampered with since signing.




| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| KeyType : This value has to be the same used when the signature was created, and it could be one of the following values: |
| Module.KeyType.None                                                                                                       |
| Module.KeyType.MD5                                                                                                        |
| Module.KeyType.SHA-1                                                                                                      |
| Module.KeyType.SHA-224                                                                                                    |
| Module.KeyType.SHA-256                                                                                                    |
| Module.KeyType.SHA-384                                                                                                    |
| Module.KeyType.SHA-512                                                                                                    |




| Return values                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- |
| The function returns a promise that resolves when it succeeds to the following possible values:                                 |
| Module.IntegrityStatus.OK – Integrity Ok. Data has not changed since signature capture.                                     |
| Module.IntegrityStatus.FAIL – Integrity Fail. Data has changed since signature capture.                                     |
| Module.IntegrityStatus.MISSING – Integrity Missing. Signature integrity value not found.                                    |
| Module.IntegrityStatus.WRONG_TYPE – Integrity wrong type. Signature was captured using a different integrity check version. |
| Module.IntegrityStatus.INSUFFICIENT_DATA – There is not enough signature data.                                              |
| Module.IntegrityStatus.UNCERTAIN – The integrity is uncertain.                                                              |
| Module.IntegrityStatus.NOT_SUPPORTED – The integrity type is not supported in this version of the Signature SDK.            |

### checkSignedData

Checks for a match between a given hash and the one provided when the signature was captured. If the signature is bound to a hash, then this function checks the signed data against that from which the supplied hash was derived.




| Parameters                                                            |
| --------------------------------------------------------------------- |
| Hash: A hash object with the type and value of the document to check. |


| Return values                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves when it succeeds to the following possible values:                                                                                                  |
| Module.DataStatus.GOOD – The supplied hash matches that provided when the signature was captured. Thus, both hash objects have been derived from the same data set.                              |
| Module.DataStatus.NO_HASH – No hash was specified when the signature was captured (or the object does not contain a signature).                                                                  |
| Module.DataStatus.BAD_TYPE – The supplied hash is of a different type to that provided when the signature was captured.                                                                          |
| Module.DataStatus.BAD_HASH – The supplied hash value does not match that provided when the signature was captured, meaning that the two hash objects have been derived from different data sets. |
| Module.DataStatus.ERROR – Unknown error.                                                                                                                                                         |
| Module.DataStatus.UNCERTAIN – The data is uncertain.                                                                                                                                             |
| Module.DataStatus.SIG_MOVED – The signature has been moved.                                                                                                                                      |




### exportIso

Exports the signature as an ISO format. The format depends on the passed parameter type.

| Parameters                                                                                            |
| ----------------------------------------------------------------------------------------------------- |
| IsoType -  The possible values are:                                                                   |
| Module.IsoType.ISO19794_7_BINARY – exports the signature as binary ISO19794_7                         |
| Module.IsoType.ISO19785_3_XML – exports the signature as xml ISO19785_3                               |
| Module.IsoType.ISO19794_7_ENCRYPTED_BINARY – exports the signature as ISO19794_7 encrypted as binary. |
| Module.IsoType.ISO19794_7_ENCRYPTED_TEXT – exports the signature as ISO19794_7 encrypted as text.     |




| Return values                         |
| ------------------------------------- |
| The signature as the defined type ISO |




### generateSignature

Generates a new signature with the data passed.

| Parameters                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Who: String indicating the person who signed.                                                                                                                                                                                                                                                                                                                  |
| Why: String indicating the reason for signing.                                                                                                                                                                                                                                                                                                                 |
| Where: String indicating where the signature was captured.                                                                                                                                                                                                                                                                                                     |
| IntegrityKey: A value that indicates the type of integrity that will be applied to the signature. It can be one of the following: <ul>  <li>Module.KeyType.None</li><li>Module.KeyType.MD5 </li><li>Module.KeyType.SHA-1</li><li>Module.KeyType SHA-224</li><li>Module.KeyType.SHA-256</li><li>Module.KeyType.SHA-384</li><li>Module.KeyType.SHA-512</li></ul> |
| DocumentHash: Hash object indicating the document that's to be bound with the signature. This value can be null if we don’t desire to bind any document to the signature.                                                                                                                                                                                             |
| Strokes: a vector with the captured strokes.                                                                                                                                                                                                                                                                                                                   |
| Digitizer_Characteristics: DigitizerCharacteristics object with the characteristics of the digitizer that capture the signature strokes.                                                                                                                                                                                                                       |
| DigitizerInfo: String indicating information about the digitizer.                                                                                                                                                                                                                                                                                              |
| NicInfo: String indicating a unique ID for the device that captures the signature.                                                                                                                                                                                                                                                                              |
| TimeRes: Integer indicating the resolution of the time.                                                                                                                                                                                                                                                                                                        |
| Date: Javascript date that indicates when the signature was captured.                                                                                                                                                                                                                                                                                          |




| Return values                                                                             |
| ----------------------------------------------------------------------------------------- |
| The function returns a promise that resolves upon success to true or raises an exception. |




### getAdditionalData

Returns a string with some additional data collected at capture time. The specific data is passed under a parameter.

| Parameters                                                                                 |
| ------------------------------------------------------------------------------------------ |
| DataType: Indicates the type of information that is going to be retrieved. It can be one of the following: |
 <ul>                                                                                       
      <li>Module.CaptureData.Digitizer: Identifying information for the digitizer that captured the signature.</li><li>Module.CaptureData.Digitizer_Driver: Identifying information for the digitizer driver software.</li><li>Module.CaptureData.Machine_OS: Identifying information for the computer operating system.</li><li>Module.CaptureData.Network_Card: Identifying information for the network card.</br>       <i>NB: the Network_Card parameter is not implemented in this edition.</i> 

</li>
</ul>






| Return values                            |
| ---------------------------------------- |
| A string with the information requested. |

### getExtraData

Extra data is a parametrized property that allows the client to store additional data within the signature object after capture.

For example, if a signature is being manually validated, the system may find it convenient to store the result in the signature itself, rather than as an independent data item.

Each extra data item must be given an identifying key name under a string value named key and an associate value string named value. There can be only one value for each key and once written the key cannot be modified or removed. All extra data key pairs are protected by the signature object integrity hash.

| Parameters                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------- |
| Key: String indicating the name of the extra data to be retrieved. If this string is empty it will retrieve a string with all the extra data. |

| Return values                     |
| --------------------------------- |
| String with the extra data value. |




### getHeight

Returns the height of the bounding rectangle of the signature in 0.01mm units. Returns 0 if the object does not contain signature data.

| Parameters |
| ---------- |
| None       |


| Return values                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- |
| The height of the bounding rectangle of the signature in 0.01mm units. Returns 0 if the object does not contain signature data. |

### getLicence

Returns the name of the licence used for capture the signature.

| Parameters |
| ---------- |
| None       |

| Return values                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- |
| A string whith the licence name. |


### getSigData

Binary signature data as an array of bytes. May be used to save the signature data to and restore it from a file or database.

| Parameters |
| ---------- |
| None       |

| Return values                              |
| ------------------------------------------ |
| Binary signature data as an array of bytes |

### getTextData

Binary signature data as a string, base-64 encoded or hexadecimal, depending on the value of its parameter.

| Parameters                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TextFormat: Indicates the text format to be retrieved. It can be: <ul> <li>Module.TextFormat.HEX:  it returns hexadecimal string. </li> <li>Module.TextFormat.BASE64: it returns base-64 string. </li></ul> |


| Return values                     |
| --------------------------------- |
| A string with the signature data. |

### getWhen

Returns the date when the signature was captured.

| Parameters |
| ---------- |
| None       |

| Return values                                                                    |
| -------------------------------------------------------------------------------- |
| A JavaScript Date object with the date and time when the signature was captured. |

### getWidth

Returns the width of the bounding rectangle of the signature in 0.01mm units. Returns 0 if the object does not contain signature data.




| Parameters |
| ---------- |
| None       |




| Return values                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| Returns the width of the bounding rectangle of the signature in 0.01mm units. Returns 0 if the object does not contain signature data. |

### getWho

Returns the name of the signatory, as specified at the time of signature capture.

| Parameters |
| ---------- |
| None       |

| Return values                                                         |
| --------------------------------------------------------------------- |
| The name of the signatory, as specified at the time of signature capture. |

### getWhy

Returns the reason for signing, as specified at the time of signature capture.

| Parameters |
| ---------- |
| None       |

| Return values                                                          |
| ---------------------------------------------------------------------- |
| The reason for signing, as specified at the time of signature capture. |

### importIso

| Import a previously captured ISO signature.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| IsoData: The iso signature.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| IsoType: The type of the signature. It can be one of the following: <ul><li>Module.IsoType.ISO19784_7_BINARY – exports the signature as binary ISO19784_7</li><li>Module.IsoType.ISO19785_3_XML – exports the signature as xml ISO19785_3</li><li>Module.IsoType.ISO19784_7_ENCRYPTED_BINARY – exports the signature as ISO19784_7 encrypted as binary.</li><li>Module.IsoType.ISO19784_7_ENCRYPTED_TEXT – exports the signature as ISO19784_7 encrypted as text.</li></ul> |
| AdditionalImportIsoData: The ISO format lacks some important properties of the Wacom signature. With this object we can assign the values for these properties. See the section AdditionalImportIsoData for more information about it.                                                                                                                                                                                                                        |




| Return values |
| ------------- |
| None          |




### isCaptured

Returns true if the object contains signature data. Note that IsCaptured = true does not necessarily imply that the When, Who and Why properties are valid. In some circumstances, they may be invalid even though the Signature object contains valid signature data.

| Parameters |
| ---------- |
| None       |




| Return values                                                |
| ------------------------------------------------------------ |
| True if the object contains signature data. False otherwise. |




### isCrossedOut

Returns true if the signature has been invalidated by changes to the document and appears crossed out.

| Parameters |
| ---------- |
| None       |

| Return values                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- |
| True if the signature has been invalidated by changes to the document and appears crossed out. False otherwise. |




### isEncrypted

Returns true if the signature is encrypted.

| Parameters |
| ---------- |
| None       |

| Return values                                        |
| ---------------------------------------------------- |
| True if the signature is encrypted, false otherwise. |




### isExternal

Returns true if the signature is not generated by the method generateSignature.

| Parameters |
| ---------- |
| None       |




| Return values                                                                            |
| ---------------------------------------------------------------------------------------- |
| True if the signature is not generated by the method generateSignature, false otherwise. |


### isEvaluation

Returns true if the licence is an evaluation licence.

| Parameters |
| ---------- |
| None       |

| Return values                                        |
| ---------------------------------------------------- |
| True if the licence is an evaluation licence. |



### ReadEncodedBitmapBinary

Reads the encoded SigObj data from binary data which was created using RenderBitmap function.

| Parameters                                 |
| ------------------------------------------ |
| ImageData: Uint8Array with the image data. |
| Width: width of the image.                 |
| Height: height of the image.               |




| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |




### RenderBitmap

Renders an image of the signature. Optionally encodes the SigObj in the generated image using steganographic techniques.

| Parameters                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Will InkCanvas: Inking canvas for rendering the image using Wacom WILL Ink SDK. If this value is null, the image is rendered using a common JavaScript canvas.                                                                                                                                |
| width: int value indicating the width specified as DPI (dots per inch) or Pixels. Negative value = DPI (the signature is not scaled). Positive value = Pixels (the signature is scaled to fit the area).                                                                                      |
| height: int value indicating the height specified as DPI (dots per inch) or Pixels. Negative value = DPI (the signature is not scaled). Positive value = Pixels (the signature is scaled to fit the area).                                                                                    |
| mimeType: String specifying the image format as one of:<ul><li>image/png</li> <li>image/jpeg</li></ul>                                                                                                                                                                                        |
| inkWidth: float value with the signature ink width in pixels. This is only valid when using a standard JavaScript canvas. When using WILL Ink canvas, this value is ignored.                                                                                                                  |
| inkColor: String with the signature ink colour.                                                                                                                                                                                                                                               |
| inkBackground: String with the image background colour.                                                                                                                                                                                                                                       |
| paddingX, paddingY: float values with the padding around the signature image, added to both the left and the right for paddingX, and both the top and bottom for paddingY. Dimensions are specified as mm or pixels. <ul><li>Negative value = mm.</li> <li>Positive value = pixels.</li></ul> |
| Flags: int value with a combination of the following values (a single value from each mandatory group must be included):                                                                                                                                                                      |

 

  Image extension (optional):

    0x400000 (RenderEncodeData) – Encode signature data within image (only valid for png type)

  Other (optional):

    0x1000000 (RenderClipped) – Crop signature image, omitting any parts which were outside of the original capture window.

    0x2000000 (RenderRelative) – Renders the signature image relative to the origin of the original capture window. (Dimensions must be equal DPI (negative) values; padding values must be 0)

 




| Return values                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- |
| The function returns a promise that resolves to an image URL (String) when it succeeds or raises an exception if false. |




### setExtraData

ExtraData is a parametrized property that allows the client to store additional data within the signature object after capture.

For example, if a signature is being manually validated, the system may find it convenient to store the result in the signature itself, rather than as an independent data item.

Each ExtraData item must be given an identifying key name under a string value named **key** and an associate value string named **value**. There can be only one value for each key and once written the key cannot be modified or removed. All ExtraData key pairs are protected by the signature object integrity hash.




| Parameters                                                                |
| ------------------------------------------------------------------------- |
| **Key:** name of the extra data, if it already exists it will be overridden. |
| **Value:** value of the extra data.                                       |




| Return values |
| ------------- |
| None          |




### setEncryptionPassword

Set a password for symmetric encryption. The same password will be used for encrypting and decrypting the signature.




| Parameters                                  |
| ------------------------------------------- |
| Password: String with the desired password. |

| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |

### setLicence

Set a license for the Signature SDK.

| Parameters                        |
| --------------------------------- |
| Licence: String with the license. |


| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |



### setSigData

Set binary signature data as an array of bytes.

| Parameters                                    |
| --------------------------------------------- |
| SigData: signature data as an array of bytes. |



| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |


### setTextData

Set text signature data.

| Parameters                                                                        |
| --------------------------------------------------------------------------------- |
| SigText: String with the signature data. The format can be Base64 or Hexadecimal. |


| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |



### setPrivateKey

Set a private key for asymmetric encryption. The private key is used for decryption.

| Parameters                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PrivKey: String with the private key in PEM format. If the private key is encrypted, the password can be included concatenate to the private key after “;”. For example: Key;Password |

| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |


### setPublicKey

Set a public key for asymmetric encryption. The public key is used for encryption.

| Parameters                                        |
| ------------------------------------------------- |
| PubKey: String with the public key in PEM format. |

| Return values                                                                                          |
| ------------------------------------------------------------------------------------------------------ |
| The function returns a promise that resolves to true when it succeeds or raises an exception if false. |


## Hash

The hash object is used to bind a signature to a document. For example: it is necessary to sign a PDF. To do this, we create a hash document using:

```const hash = new Module.Hash(hashType);```

where the hashType can be any of the following:

* Module.HashType.None
* Module.HashType.MD5
* Module.HashType.SHA1
* Module.HashType.SHA224
* Module.HashType.SHA256
* Module.HashType.SHA384
* Module.HashType.SHA512

Then using the function add(byteArray) we add the content of the PDF.

```hash.add(pdfContent);```







## AdditionalImportIsoData

 

This object is used to apport extra properties to the ISO format. These options are:

### setWho(who)

Set the name of the person who signed, where the who parameter is a string.

### setWhy(why)

Set the reason to sign, where the why parameter is a string.

### setWhen(when)

Set the date when the signature was captured, where the when parameter is a JavaScript Date object.

### putExtraData(key, value)

Put in additional data, where key is a string with the name of the extra data, and value is another string with its value.