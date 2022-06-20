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

The Wizard library provides interactives controls for STU tablets devices.


## Methods summary

| Methods                    |
| ---------------------------|
| addObject                  |
| addObjectButton            |
| addObjectCheckBox          |
| addObjectDisplayAtShutdown |
| addObjectImage             |
| addObjectInking            |
| addObjectInput             |
| addObjectInputEcho         |
| addObjectRadioButton       |
| addObjectSignature         |
| addObjectText              |
| addPrimitive               |
| display                    |
| fireClick                  |
| padConnect                 |
| padDisconnect              |
| padModelName               |
| padHeight                  |
| padWidth                   |
| reset                      |
| startEncryption            |
| stopEncryption             |




## Methods


### addObject

Adds an item to the pad control list.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| type | ObjectType enum value, and it could be one of the following values:                                                |
| |WizCtl.ObjectButton                                                                                                      |
| |WizCtl.ObjectText                                                                                                        |
| |WizCtl.ObjectCheckbox                                                                                                    |
| |WizCtl.ObjectDisplayAtShutdown                                                                                           |
| |WizCtl.ObjectImage                                                                                                       |
| |WizCtl.ObjectInking                                                                                                      |
| |WizCtl.ObjectInput                                                                                                       |
| |WizCtl.ObjectInputEcho                                                                                                   |
| |WizCtl.ObjectRadioButton                                                                                                 |
| |WizCtl.ObjectSignature                                                                                                   |
| |WizCtl.ObjectText                                                                                                        |
| id | String, Specifies an identifier for the object.                                                                      |
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
| |Value can either be absolute position in pixels, or one of the strings:                                                  |
| | * x: "left", "right", "centre"                                                                                          |
| | * y: "top", "middle", "bottom"                                                                                          |
| data | Value dependent on object type                                                                                     |
| options | Value dependent on object type                                                                                  |

         

| Return values                                                 |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |
 

### addObjectButton

Creates a button – text surrounded by a rectangle which generates a click event when tapped with the pen. Text is displayed in the
current font

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | The following values have special meanings when used with a signature or input object:                               |  
|| * **ok** - Accepts current input. With a signature, stores the captured signature in the                                 |
||signature object and terminates input. Until a signature has been captured, the button is disabled by the Wizard Control. |
||With an Input object, the button is disabled until the required minimum number of characters has been entered.            |
|| * **clear** - Clears current input allowing user to start again. With a signature, clears any captured 'ink' from        |
|| the display With an Input object, clears all entered input.                                                              |    
|| * **cancel** - With a signature, clears any captured 'ink' and terminates input.                                         |
|| * **delete** - With an input object, deletes the last character.                                                         |
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
||Value can either be absolute position in pixels, or one of the strings:                                                   |
|| * x: "left", "right", "centre"                                                                                           |
|| * y: "top", "middle", "bottom"                                                                                           |
| data | Text to display.                                                                                                   |
| options | Either, an integer specifying button width in pixels or an ObjectOptions object.                                |
|| It the given width is less than the width of the text (in the current font), it is ignored.                              | 
|| (Optional)                                                                                                               |           



| Return values                                                                                                               |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectCheckBox

Creates a checkbox – a small rectangle followed by text which toggles its state and generates an event when tapped with the pen. Text is
displayed in the current font.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | The following values have special meanings when used with a signature object.                                        |
|| Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                            | 
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
||Value can either be absolute position in pixels, or one of the strings:                                                   |
|| * x: "left", "right", "centre"                                                                                           |
|| * y: "top", "middle", "bottom"                                                                                           |
| data | Text to display.                                                                                                   |
| options | A combination of values from the CheckboxOptions enum (Optional)                                                |           


| Return values                                                                                                               |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectDisplayAtShutdown

Causes the current control set to remain displayed on the pad following disconnection.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                        | 


| Return values                                                                                                               |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |



### addObjectImage

Displays an image on the pad. The image can optionally be made clickable in which case click events are generated when the image is
tapped with the pen.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | Supports the same reserved Ids as button objects. See AddObject(ObjectButton) above.                                 |
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
||Value can either be absolute position in pixels, or one of the strings:                                                   |
|| * x: "left", "right", "centre"                                                                                           |
|| * y: "top", "middle", "bottom"                                                                                           |
| image | Image to display.                                                                                                 |
| options | Optional object with the image dimensions.                                                                      |           


| Return values                                                                                                               |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |



### addObjectInking

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                        | 


| Return values                                                                                                               |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectInput

Provides an input mechanism for PIN code entry.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                        | 
|| Can be null or an empty string.                                                                                          | 
| data | Object with a field called **minLength** for the minimum accepted lenght and **maxLength** for the maximum.        |

| Return values                                                 |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectInputEcho

Specifies location of and character to use for ObjectInput 'echo'.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                        | 
|| Can be null or an empty string.                                                                                          | 
| data | Character to be used for each button press.                                                                        |            
| options |  Either, a combination of values from the InputEchoOptions enum or an ObjectOptions object. (Optional)          |

| Return values                                                 |                                                             
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectRadioButton

Creates a radio button – a small circle followed by text. Radio buttons are used in groups where tapping on one with the pen selects it
and deselects the currently selected button in the group. Tapping with the pen also generates an event. Text is displayed in the current
font.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | The following values have special meanings when used with a signature object.                                        |
|| Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                            | 
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
||Value can either be absolute position in pixels, or one of the strings:                                                   |
|| * x: "left", "right", "centre"                                                                                           |
|| * y: "top", "middle", "bottom"                                                                                           |
| data | Text to display.                                                                                                   |
| options | Specifying the name of the group to which this radio button belongs and, optionally,                            |       
|| whether this option is initially selected.                                                                               |


| Return values                                                 |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectSignature

Puts the pad into signature capture mode and specifies a signature object or control in which a captured signature is saved. It is an
error to add more than one ObjectSignature to the current control list.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | Cannot be any of the values reserved for text or button objects: who, why, Ok, Clear, Cancel.                        | 
| signature |  Signature SDK object with a valid licence.                                                                   |        
| options | Object with the integrity type or hash to attach to the signature. It is optional.                              |          


| Return values                                                 |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addObjectText

Displays a text string on the pad using the current properties.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| id | The following values have special meanings when used with a signature object:                                        |  
||       * **who** Text in Data will also be used as name of signatory.                                                     |
||       * **why** Text in Data will also be used as reason for signing.                                                    |
||       * **when** Reserved for future use                                                                                 |
||       * (Can be null or an empty string)                                                                                 |
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
| |Value can either be absolute position in pixels, or one of the strings:                                                  |
| | * x: "left", "right", "centre"                                                                                          |
| | * y: "top", "middle", "bottom"                                                                                          |
| data | Text to display.                                                                                                   |



| Return values                                                 |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


### addPrimitive

Adds a graphics primitive item to the internal list.

| Parameters                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- |
| type | The following values have special meanings when used with a signature object:                                        |  
||       * **who** Text in Data will also be used as name of signatory.                                                     |
||       * **why** Text in Data will also be used as reason for signing.                                                    |
||       * **when** Reserved for future use                                                                                 |
||       * (Can be null or an empty string)                                                                                 |
| x, y |  Position of the top left corner of the object on the pad display.                                                 |        
| |Value can either be absolute position in pixels, or one of the strings:                                                  |
| | * x: "left", "right", "centre"                                                                                          |
| | * y: "top", "middle", "bottom"                                                                                          |
| data | Text to display.                                                                                                   |



| Return values                                                 |
| ------------------------------------------------------------- |
| The added Object if success or null if there is some error.   |


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


| Parameters                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------- |
| relative : boolean indicating if the desire width it is only containing the strokes (false) or the whole screen used for capturing (true)   |




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