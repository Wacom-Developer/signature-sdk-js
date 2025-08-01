import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, viewChild } from '@angular/core';
import SigSDK, {
  SigCaptDialog, Config, SigObj, Hash, RenderFlags, STUDevice, PenDataType, PenDataTimeCountSequence,
  PenDataTimeCountSequenceEncrypted, InkingMode, Capability,
  ProtocolHelper,
  EncodingMode, ExtraData,
  Button,
  StuCaptDialog,
  FIT_MODE,
  IntegrityStatus,
  DataStatus
} from '@wacom/signature-sdk';

//Signature SDK consists on a webassembly (wasm) file and a js wrapper.
//The js wrapper it is properly loaded from node modules as shown above,
//however for loading the wasm file we are going to import it as binary array.
import wasmBinaryData from "../../node_modules/@wacom/signature-sdk/signature-sdk.wasm";

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Signature SDK Angular Demo';

  @Input() versionTxt: string = "";
  @Input() waitingBackgroundVisibility: string = "active";

  //Capture Tab
  @ViewChild('who') whoRef!: ElementRef;
  @ViewChild('why') whyRef!: ElementRef;
  @ViewChild('document') documentRef!: ElementRef;
  @ViewChild('extra_data_list_div') extraDataListDivRef!: ElementRef;
  @ViewChild('allow_mouse_check') allowMouseCheckRef!: ElementRef;
  @ViewChild('allow_touch_check') allowTochCheckRef!: ElementRef;
  @ViewChild('allow_pen_check') allowPenCheckRef!: ElementRef;
  @ViewChild('selectedStuDevice') selectedStuDeviceRef!: ElementRef;
  @ViewChild('capture_stu_btn') captureSTUBtnRef!: ElementRef;
  @ViewChild('capture_canvas_btn') captureCanvasBtnRef!: ElementRef;
  @ViewChild('captureDiv') captureDivRef!: ElementRef;
  @ViewChild('signatureImage') signatureImageRef!: ElementRef;
  @ViewChild('save_image_btn') saveImageBtnRef!: ElementRef;
  @ViewChild('save_text_btn') saveTextBtnRef!: ElementRef;
  @ViewChild('save_binary_btn') saveBinaryBtnRef!: ElementRef;
  @ViewChild('save_iso_btn') saveIsoBtnRef!: ElementRef;

  //Read Tab
  @ViewChild('load_signature') loadSignatureBtnRef!: ElementRef;
  @ViewChild('load_who') loadWhoRef!: ElementRef;
  @ViewChild('load_why') loadWhyRef!: ElementRef;
  @ViewChild('load_when') loadWhenRef!: ElementRef;
  @ViewChild('load_extra_data') loadExtraDataRef!: ElementRef;
  @ViewChild('load_digitizer_type') loadDigitizerTypeRef!: ElementRef;
  @ViewChild('load_digitizer_driver') loadDigitizerDriveRef!: ElementRef;
  @ViewChild('load_operating_system') loadOperatingSystemRef!: ElementRef;
  @ViewChild('load_network_interface_card') loadNetworkInterfaceCardRef!: ElementRef;
  @ViewChild('load_licence') loadLicenceRef!: ElementRef;
  @ViewChild('load_integrity') loadIntegrityRef!: ElementRef;
  @ViewChild('document_load') documentLoadBtnRef!: ElementRef;
  @ViewChild('signatureimage_loaded_background') signatureImageLoadeBackgroundRef!: ElementRef;
  @ViewChild('signatureimage_loaded') signatureImageLoadedRef!: ElementRef;


  //Settings Tab
  @ViewChild('encrypt_stu') encryptStuCheckedRef!: ElementRef;
  @ViewChild('ink_width') inkWidthRef!: ElementRef;
  @ViewChild('rendering_color_box') renderingColorBoxRef!: ElementRef;
  @ViewChild('background_color_box') backgroundColorBoxRef!: ElementRef;
  @ViewChild('put_background_image') putBackgroundImageRef!: ElementRef;
  @ViewChild('background_image') backgroundImageRef!: ElementRef;
  @ViewChild('background_image_mode') backgroundImageModeRef!: ElementRef;
  @ViewChild('background_opacity') backgroundOpacityRef!: ElementRef;
  @ViewChild('allowOutSide') allowOutSideRef!: ElementRef;
  @ViewChild('allowZeroPressure') allowZeroPressureRef!: ElementRef;
  @ViewChild('dialog_width') dialogWidthRef!: ElementRef;
  @ViewChild('dialog_height') dialogHeightRef!: ElementRef;
  @ViewChild('stu_fit_mode') fitModeRef!: ElementRef;
  @ViewChild('shows_modal') showsModalRef!: ElementRef;
  @ViewChild('shows_as_dialog') showsAsDialogRef!: ElementRef;
  @ViewChild('dialog_left') dialogLeftRef!: ElementRef;
  @ViewChild('dialog_top') dialogTopRef!: ElementRef;
  @ViewChild('is_centered') isCenteredRef!: ElementRef;
  @ViewChild('is_draggable') isDraggableRef!: ElementRef;
  @ViewChild('border_color_box') borderColorBoxRef!: ElementRef;
  @ViewChild('border_width_box') borderWidthBoxRef!: ElementRef;
  @ViewChild('has_title_check') hasTitleCheckRef!: ElementRef;
  @ViewChild('title_text') titleTextRef!: ElementRef;
  @ViewChild('show_signatory_check') showSignatoryCheckRef!: ElementRef;
  @ViewChild('signatory_font_type_text') signatoryFontTypeTextRef!: ElementRef;
  @ViewChild('signatory_font_size_text') signatoryFontSizeTextRef!: ElementRef;
  @ViewChild('signatory_offset_x_text') signatoryOffsetXTextRef!: ElementRef;
  @ViewChild('signatory_offset_y_text') signatoryOffsetYTextRef!: ElementRef;
  @ViewChild('signatory_color_box') signatoryColorBoxRef!: ElementRef;
  @ViewChild('show_reason_check') showReasonCheckRef!: ElementRef;
  @ViewChild('reason_font_type_text') reasonFontTypeTextRef!: ElementRef;
  @ViewChild('reason_font_size_text') reasonFontSizeTextRef!: ElementRef;
  @ViewChild('reason_offset_x_text') reasonOffsetXTextRef!: ElementRef;
  @ViewChild('reason_offset_y_text') reasonOffsetYTextRef!: ElementRef;
  @ViewChild('reason_color_box') reasonColorBoxRef!: ElementRef;
  @ViewChild('show_date_check') showDateCheckRef!: ElementRef;
  @ViewChild('date_font_type_text') dateFontTypeTextRef!: ElementRef;
  @ViewChild('date_font_size_text') dateFontSizeTextRef!: ElementRef;
  @ViewChild('date_offset_x_text') dateOffsetXTextRef!: ElementRef;
  @ViewChild('date_offset_y_text') dateOffsetYTextRef!: ElementRef;
  @ViewChild('date_color_box') dateColorBoxRef!: ElementRef;
  @ViewChild('show_signing_line_check') showSigningLineCheckRef!: ElementRef;
  @ViewChild('signing_line_left_text') signingLineLeftTextRef!: ElementRef;
  @ViewChild('signing_line_right_text') signingLineRightTextRef!: ElementRef;
  @ViewChild('signing_line_width_text') signingLineWidthTextRef!: ElementRef;
  @ViewChild('signing_line_offset_y_text') signingLineOffsetYTextRef!: ElementRef;
  @ViewChild('signing_line_color_box') signingLineColorBoxRef!: ElementRef;
  @ViewChild('button_font_type') buttonFontTypeRef!: ElementRef;
  @ViewChild('button_list_div') buttonListDivRef!: ElementRef;
  @ViewChild('render_width') renderWidthRef!: ElementRef;
  @ViewChild('render_height') renderHeightRef!: ElementRef;
  @ViewChild('is_relative') isRelativeRef!: ElementRef;
  @ViewChild('no_encryption') noEncryptionRef!: ElementRef;
  @ViewChild('symmetric_encryption') symmetricEncryptionRef!: ElementRef;
  @ViewChild('symmetric_password') symmetricPasswordRef!: ElementRef;
  @ViewChild('asymmetric_encryption') asymmetricEncryptionRef!: ElementRef;
  @ViewChild('public_key') publicKeyRef!: ElementRef;
  @ViewChild('private_key_password') privateKeyPasswordRef!: ElementRef;
  @ViewChild('private_key') privateKeyRef!: ElementRef;
  @ViewChild('iso_type') isoTypeRef!: ElementRef;  
  @ViewChild('enable_timeout') enableTimeoutRef!: ElementRef;
  @ViewChild('timeOutValue') timeOutValueRef!: ElementRef;
  @ViewChild('emptyTimeOut') emptyTimeOutRef!: ElementRef;
  @ViewChild('dataTimeOut') dateTimeOutRef!: ElementRef;
  @ViewChild('minTimeOnSurface') minTimeOnSurfaceRef!: ElementRef;

  @ViewChild('clear_btn_div_default') clearBtnDivDefaultRef!: ElementRef;
  @ViewChild('cancel_btn_div_default') cancelBtnDivDefaultRef!: ElementRef;
  @ViewChild('accept_btn_div_default') acceptBtnDivDefaultRef!: ElementRef;

  private sigSDK?: any;
  private sigObj?: SigObj;
  private sigCaptDialog?: SigCaptDialog;
  private stuCaptDialog?: StuCaptDialog;
  private documentHash: Hash | null = null;
  private stuDevice?: STUDevice;
  private backgroundImage?: HTMLImageElement;
  private stuReady: boolean = false;

  async ngOnInit() { 
    document.getElementById("capture_signature_tab")?.click();
    let module_overrides = {
      //locateFile: function(path: string) {
        //return window.location.origin + wasmFile.substring(0, wasmFile.lastIndexOf("/"));
      //}
      wasmBinary: wasmBinaryData
    }
    this.sigSDK = await SigSDK(module_overrides);
    this.versionTxt = this.sigSDK.VERSION;
    this.sigObj = new this.sigSDK.SigObj();
    
    // Here we need to set the licence. The easiest way is directly using
	// const promise = mSigObj.setLicence(key, secret);
	// however here the problem it is that we expose the key and secret publically.
	// if we want to hide the licence we can get the licence from an external server.				
	// there is a php demo file in /common/licence_proxy.php
    //const promise = mSigObj.setLicenceProxy("url from where to get the licence");
    try {
	  await this.sigObj?.setLicence("key", "secret");		  
		  
      if (this.sigSDK?.STUDevice.isHIDSupported()) {
        this.captureSTUBtnRef.nativeElement.disabled = false;
      }      
      this.captureCanvasBtnRef.nativeElement.disabled = false;
      this.documentRef.nativeElement.disabled = false;
      this.setDeviceName();
      this.loadSignatureBtnRef.nativeElement.disabled = false;						
      this.waitingBackgroundVisibility = "hidden";      
    } catch (error) {
      alert(error);
    }

  }

  openTab(evt: Event, tabName: string) {
    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        (tabcontent[i] as HTMLElement).style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    const element = document.getElementById(tabName) as HTMLElement;
    element.style.display = "block";
    (evt.currentTarget as HTMLElement).className += " active";
  }

  capture(source: string) {
    if (!(this.showsAsDialogRef.nativeElement as HTMLInputElement).checked) {
      const captureDiv: HTMLDivElement = this.captureDivRef.nativeElement;
      captureDiv.style.width = (this.dialogWidthRef.nativeElement as HTMLInputElement).value+"px";
      captureDiv.style.height = (this.dialogHeightRef.nativeElement as HTMLInputElement).value+"px";
    }

    this.signatureImageRef.nativeElement.style.display = "none";
    this.captureDivRef.nativeElement.style.display = "block";

    this.saveImageBtnRef.nativeElement.disabled = true;
    this.saveTextBtnRef.nativeElement.disabled = true;
    this.saveBinaryBtnRef.nativeElement.disabled = true;
    this.saveIsoBtnRef.nativeElement.disabled = true;

    if (source === "STU") {
      this.captureFromSTU();
    } else {
      this.captureFromCanvas();
    }
  }

  async captureFromCanvas() {
    this.stuCaptDialog = undefined;
    const outer = this;    
    const config = await this.generateConfig();
    config.source.mouse = this.allowMouseCheckRef.nativeElement.checked;
    config.source.touch = this.allowTochCheckRef.nativeElement.checked;
    config.source.pen = this.allowPenCheckRef.nativeElement.checked;
    this.sigCaptDialog = new this.sigSDK.SigCaptDialog(config);
    this.sigCaptDialog?.addEventListener(this.sigSDK.EventType.OK, async function() {
      outer.deleteConfig(config);
      outer.encryptSignature();
      outer.renderSignature();
    });

    this.sigCaptDialog?.addEventListener(this.sigSDK.EventType.CLEAR, async function() {
      console.log("canvas cleared");
    });

    const integrityType = this.sigSDK.KeyType.SHA512;
    this.sigCaptDialog?.open(this.sigObj!!, this.whoRef.nativeElement.value, this.whyRef.nativeElement.value, this.generateExtraData(), integrityType, this.documentHash);
    this.sigCaptDialog?.startCapture();
  }

  async captureFromSTU() {
    this.stuReady = false;
    this.sigCaptDialog = undefined;
    const config = await this.generateConfig();    
    config.showWait = true;
    config.encryptSTU = this.encryptStuCheckedRef.nativeElement.checked;    

    const stuDeviceStr = localStorage.getItem("stuDevice");
    let stuDevice : any;//HIDDevice;
    if (!stuDeviceStr) {
      const devices = await this.sigSDK?.STUDevice.requestDevices();
      if (devices.length > 0) {
        stuDevice = devices[0];                        					
        localStorage.setItem("stuDevice", 
          JSON.stringify({"vendorId":stuDevice.vendorId,
            "productName":stuDevice.productName,
            "productId":stuDevice.productId
          }));
        this.setDeviceName();
      } else {
        throw "No STU devices found";
      }	
    } else {
      const deviceSaved = JSON.parse(stuDeviceStr);
      // get all the devices that we have permissions to connect
      const allowedDevices = await this.sigSDK?.STUDevice.getDevices();
      allowedDevices.some((device: any /*HIDDevice*/) => {
        if (deviceSaved.vendorId === device.vendorId && deviceSaved.productId === device.productId && deviceSaved.productName === device.productName) {
          stuDevice = device;
          return true;
        }
        return false;
      })
    }

    const outer = this;
    this.stuDevice = new this.sigSDK.STUDevice(stuDevice);  
    this.stuCaptDialog = new this.sigSDK.StuCaptDialog(this.stuDevice, config);
    this.stuCaptDialog?.addEventListener(this.sigSDK.EventType.OK, async function() {
      console.log("on ok pressed");
      outer.deleteConfig(config);
      outer.encryptSignature();
      outer.renderSignature();
    });

    this.stuCaptDialog?.addEventListener(this.sigSDK.EventType.CLEAR, async function() {
      console.log("on clear pressed");
      outer.stuReady = true;
    });

    this.stuCaptDialog?.addEventListener(this.sigSDK.EventType.CANCEL, async function() {
      console.log("on cancel pressed");
    });
    

    const integrityType = this.sigSDK.KeyType.SHA512;
    await this.stuCaptDialog?.open(this.sigObj!!, 
      this.whoRef.nativeElement.value, this.whyRef.nativeElement.value, 
      this.generateExtraData(), integrityType, this.documentHash);
    this.stuReady = true;
  }

  setDeviceName() {
    const stuDeviceStr = localStorage.getItem("stuDevice");
    if (stuDeviceStr) {
      this.selectedStuDeviceRef.nativeElement.innerHTML = JSON.parse(stuDeviceStr).productName;
    } else {
      this.selectedStuDeviceRef.nativeElement.innerHTML = "None";
    }
  }

  removeDevice() {
    localStorage.removeItem("stuDevice");
    this.setDeviceName();
  }

  async generateConfig(): Promise<Config> {
    const config: Config = new this.sigSDK.Config();
    config.strokeSize = this.inkWidthRef.nativeElement.value;
    config.strokeColor = this.renderingColorBoxRef.nativeElement.value;
    config.width = this.dialogWidthRef.nativeElement.value;
    config.height = this.dialogHeightRef.nativeElement.value;
    config.left = this.dialogLeftRef.nativeElement.value;
    config.top = this.dialogTopRef.nativeElement.value;
    config.centered = this.isCenteredRef.nativeElement.checked;
    config.title = this.titleTextRef.nativeElement.value;
    config.borderColor = this.borderColorBoxRef.nativeElement.value;
    config.borderWidth = this.borderWidthBoxRef.nativeElement.value;
    config.hasTitle = this.hasTitleCheckRef.nativeElement.checked;

    switch (this.fitModeRef.nativeElement.selectedIndex) {
      case 0: config.fitMode = this.sigSDK?.FIT_MODE.FIXED; break;
      case 1: config.fitMode = this.sigSDK?.FIT_MODE.FIT; break;
      case 2: config.fitMode = this.sigSDK?.FIT_MODE.STRECH; break;
      case 3: config.fitMode = this.sigSDK?.FIT_MODE.STU;
    }

    config.signatory.visible = this.showSignatoryCheckRef.nativeElement.checked;
    config.signatory.fontFace = this.signatoryFontTypeTextRef.nativeElement.value;
    config.signatory.fontSize = this.signatoryFontSizeTextRef.nativeElement.value;
    config.signatory.offsetX = this.signatoryOffsetXTextRef.nativeElement.value;
    config.signatory.offsetY = this.signatoryOffsetYTextRef.nativeElement.value;
    config.signatory.color = this.signatoryColorBoxRef.nativeElement.value;
    
    config.reason.visible = this.showReasonCheckRef.nativeElement.checked;
    config.reason.fontFace = this.reasonFontTypeTextRef.nativeElement.value;
    config.reason.fontSize = this.reasonFontSizeTextRef.nativeElement.value;
    config.reason.offsetX = this.reasonOffsetXTextRef.nativeElement.value;
    config.reason.offsetY = this.reasonOffsetYTextRef.nativeElement.value;
    config.reason.color = this.reasonColorBoxRef.nativeElement.value;

    config.date.visible = this.showDateCheckRef.nativeElement.checked;
    config.date.fontFace = this.dateFontTypeTextRef.nativeElement.value;
    config.date.fontSize = this.dateFontSizeTextRef.nativeElement.value;
    config.date.offsetX = this.dateOffsetXTextRef.nativeElement.value;
    config.date.offsetY = this.dateOffsetYTextRef.nativeElement.value;
    config.date.color = this.dateColorBoxRef.nativeElement.value;

    config.signingLine.visible = this.showSigningLineCheckRef.nativeElement.checked;
    config.signingLine.left = this.signingLineLeftTextRef.nativeElement.value;
    config.signingLine.right = this.signingLineRightTextRef.nativeElement.value;
    config.signingLine.width = this.signingLineWidthTextRef.nativeElement.value;
    config.signingLine.offsetY = this.signingLineOffsetYTextRef.nativeElement.value;
    config.signingLine.color = this.signingLineColorBoxRef.nativeElement.value;

    config.buttonsFont = this.buttonFontTypeRef.nativeElement.value;
    const fields = this.buttonListDivRef.nativeElement.getElementsByTagName("fieldset");
    for (let i=0; i<fields.length; i++) {
      const button = new this.sigSDK.Button();     
      button.text = fields[i].elements.namedItem("button_text").value;
      button.textColor = fields[i].elements.namedItem("button_text_color").value;
      button.backgroundColor = fields[i].elements.namedItem("button_background_color").value;
      button.borderColor = fields[i].elements.namedItem("button_border_color").value;
      button.borderWidth = fields[i].elements.namedItem("button_border_width").value;

      //NOTE that for security reasons using eval it is not a good idea,
      //and this will thrown a warning. We used it here only for 
      //testing porpuses, allowing to set the action from a text field.
      //This way of setting actions should not be used on production environments.
      button.onClick = eval(fields[i].elements.namedItem("button_action").value);
      config.buttons?.push_back(button);
    }

    if (!this.showsAsDialogRef.nativeElement.checked) {
      config.attachTo = this.captureDivRef.nativeElement.id;
    }

    config.background.color = this.backgroundColorBoxRef.nativeElement.value;
    config.background.alpha = this.backgroundOpacityRef.nativeElement.value*0.01;
    if (this.putBackgroundImageRef.nativeElement.checked && this.backgroundImage) {
      config.background.image = this.backgroundImage;
    }
    
    switch (this.backgroundImageModeRef.nativeElement.selectedIndex) {
      case 0: config.background.mode = this.sigSDK.BackgroundImageMode.NONE; break;
      case 1: config.background.mode = this.sigSDK.BackgroundImageMode.FIT; break;
      case 2: config.background.mode = this.sigSDK.BackgroundImageMode.CENTER; break;
      case 3: config.background.mode = this.sigSDK.BackgroundImageMode.PATTERN; break;
    }

    if (this.enableTimeoutRef.nativeElement.checked) {
      config.timeOut!.enabled = true;      
      config.timeOut!.time = this.timeOutValueRef.nativeElement.value;
      config.timeOut!.onTimeOut = this.timeOutCallback.bind(this);
    }

    config.minTimeOnSurface = this.minTimeOnSurfaceRef.nativeElement.value;

    if (!this.allowOutSideRef.nativeElement.checked) {
      const self = this;
      config.onOutSide = function() {
        alert("Outside stroke is not allowed. Please sign again");
        self.clear();
        return true; //for stopping capture. 
      }
    }

    config.allowZeroPressure = this.allowZeroPressureRef.nativeElement.checked;    

    const [browserInfo, osInfo] = await this.getSystemInfo();
    config.digitizerInfo = browserInfo;
    config.osInfo = osInfo;

    return config;
  }

  deleteConfig(config: Config) {
    for (let i=0; i<config.buttons?.size()!!; i++) {
      config.buttons?.get(i)?.delete();
    }
    config.delete;
  }

  addExtraData() {
    const outer = this;
    const fieldSet = document.createElement("fieldset");
    const labelName = document.createElement("label");
    labelName.innerHTML = "Name:";
    fieldSet.appendChild(labelName);
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "extra_name";
    fieldSet.appendChild(inputName);
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));
    const labelValue = document.createElement("label");
    labelValue.innerHTML = "Value:";
    fieldSet.appendChild(labelValue);
    const inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.name = "extra_value";
    fieldSet.appendChild(inputValue); 
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));       
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.onclick = function() { outer.extraDataListDivRef.nativeElement.removeChild(fieldSet); };
    fieldSet.appendChild(deleteBtn);
    this.extraDataListDivRef.nativeElement.appendChild(fieldSet);
	}
			
  generateExtraData(): ExtraData {
    const extraData = new this.sigSDK.ExtraData();
    const list = this.extraDataListDivRef.nativeElement;
    const fields = list.getElementsByTagName("fieldset");
    for (let i=0; i<fields.length; i++) {
      extraData.set(fields[i].elements.namedItem("extra_name").value,
                    fields[i].elements.namedItem("extra_value").value);
    }

    return extraData;
  }

  async addDocumentHash() {    
    const outer = this;
    const reader = new FileReader();
    reader.onload = async function() {
      try {
        if (outer.documentHash) {
          outer.documentHash.delete();
        }
        outer.documentHash = new outer.sigSDK.Hash(outer.sigSDK.HashType.SHA512);	 
        const data : BufferSource = reader.result as BufferSource;
        const hashData = await crypto.subtle.digest("SHA-512", data);
        outer.documentHash?.setHash(hashData);
      } catch (e) {
        alert(e);
      }
    };
    reader.readAsArrayBuffer(this.documentRef.nativeElement.files[0]);
  }
  
  async clear() {
    if (this.sigCaptDialog) {
      await this.sigCaptDialog.clear();
    }

    if (this.stuCaptDialog) {
      if (this.stuReady) {
        this.stuReady = false;
        this.stuCaptDialog.clear();
      }
    }
  }

  async cancel() {
    if (this.sigCaptDialog) {
      this.sigCaptDialog?.cancel();
    }

    if (this.stuCaptDialog && this.stuReady) {
      await this.stuCaptDialog.cancel();
    }
  }

  async accept() {
    if (this.sigCaptDialog) {
      this.sigCaptDialog.accept();
    }

    if (this.stuCaptDialog) {
      await this.stuCaptDialog.accept();
    }
  }

  timeOutCallback(timeOnSurface: number) {
    const minTimeOnSurface = this.minTimeOnSurfaceRef.nativeElement.value;
    if (minTimeOnSurface < timeOnSurface) {
		  const actionCombo = this.dateTimeOutRef.nativeElement;
			if (actionCombo.options[actionCombo.selectedIndex].value == "accept") {
			  this.accept();
			} else {
			  this.cancel();
			}
		} else {
		  const actionCombo = this.emptyTimeOutRef.nativeElement;
			if (actionCombo.options[actionCombo.selectedIndex].value == "accept") {
			  this.accept();
			} else {
			  this.cancel();
			}				
		}
  }

  async renderSignature() {
    const image = await this.renderSignatureImage();

    this.captureDivRef.nativeElement.style.display = "none";
    this.signatureImageRef.nativeElement.src = image;
    this.signatureImageRef.nativeElement.style.display = "block";

    this.saveImageBtnRef.nativeElement.disabled = false;
    this.saveTextBtnRef.nativeElement.disabled = false;
    this.saveBinaryBtnRef.nativeElement.disabled = false;
    this.saveIsoBtnRef.nativeElement.disabled = false;
  }

  async renderSignatureImage() {
    // calculate the size
    let renderWidth = this.renderWidthRef.nativeElement.value;;
    let renderHeight = this.renderHeightRef.nativeElement.value;
    const isRelative = this.isRelativeRef.nativeElement.checked;
    
    let renderFlags = this.sigSDK.RenderFlags.RenderEncodeData.value;
    if (isRelative) {				
      renderFlags |= this.sigSDK.RenderFlags.RenderRelative.value;
      const sx = (96/25.4)*2;
      renderWidth = Math.floor(this.mmToPx(this.sigObj?.getWidth(true)!!/100) + sx);
      renderHeight = Math.floor(this.mmToPx(this.sigObj?.getHeight(true)!!/100) + sx);
    } else {
      if (isNaN(renderWidth) || renderWidth <= 0) {
        if (isNaN(renderHeight) || renderHeight <= 0) {
          // it takes the original size							
          renderWidth = this.mmToPx(this.sigObj?.getWidth(false)!!/100);
          renderHeight = this.mmToPx(this.sigObj?.getHeight(false)!!/100);
        } else {
          // it takes the size proportional to the height
          const originalRenderWidth = this.mmToPx(this.sigObj?.getWidth(true)!!/100);
          const originalRenderHeight = this.mmToPx(this.sigObj?.getHeight(true)!!/100);
          renderWidth = (originalRenderWidth/originalRenderHeight)*renderHeight;
        }
      } else if (isNaN(renderHeight) || renderHeight <= 0) {
        // it takes the size proportinal to the width
        const originalRenderWidth = this.mmToPx(this.sigObj?.getWidth(true)!!/100);
        const originalRenderHeight = this.mmToPx(this.sigObj?.getHeight(true)!!/100);
        renderHeight = (originalRenderHeight/originalRenderWidth)*renderWidth;
      }
    
      renderWidth = Math.floor(renderWidth);
      renderHeight = Math.floor(renderHeight);				
      renderWidth += renderWidth % 4;
    }															
    
    const backgroundColor = "white";//transparent";// document.getElementById("background_color_box").value;
    
    if (isRelative) {
        renderWidth = -96; //dpi
      renderHeight = -96;
    }
    
    const inkColor = this.renderingColorBoxRef.nativeElement.value;
    const inkWidth = this.inkWidthRef.nativeElement.value;
    const image = await this.sigObj?.renderBitmap(renderWidth, renderHeight, "image/png", inkWidth, inkColor, backgroundColor, 0, 0, renderFlags);	
    return image;	

    //pixels = dpi*mm/25.4mm
    /*let width = Math.trunc((96*this.sigObj?.getWidth(false)!!*0.01)/25.4);
    let height = Math.trunc((96*this.sigObj?.getHeight(false)!!*0.01)/25.4);
    
    let scaleWidth = 300/width;
    let scaleHeight = 200/height;
    let scale = Math.min(scaleWidth, scaleHeight);
          
    let renderWidth = Math.trunc(width * scale);
    const renderHeight = Math.trunc(height * scale);
    
    // render with must be multiple of 4
    if (renderWidth % 4 != 0) {
      renderWidth+= renderWidth % 4;
    }
    
    let canvas;
    const inkColor = "#000F55";
    try {		
      const image = await this.sigObj?.renderBitmap(renderWidth, renderHeight, "image/png", 4, inkColor, "white", 0, 0, 0x400000);					
      const imageElement = document.getElementById("sig_image") as HTMLImageElement;
      if (imageElement) {
        imageElement.src = image;
      }
      const textElement = document.getElementById("sig_text") as HTMLTextAreaElement;
      if (textElement) {
        textElement.value = await this.sigObj?.getTextData(this.sigSDK.TextFormat.BASE64);	
      }
    } catch (e) {
      alert(e);
    }		*/		
  }

  mmToPx(mm : number) : number {
    var dpr = window.devicePixelRatio;
    var inch = 25.4; //1inch = 25.4 mm
    var ppi = 96;	
    return ((mm/inch)*ppi)/dpr;
  }

  async saveSignature(format: string) {
	  const newLink = document.createElement("a");			    
				
		if (format == "image") {
		  newLink.download = "signature.png";
			newLink.href = this.signatureImageRef.nativeElement.src;
		} else {
		  let blob;
			if (format == "txt") {
			  newLink.download = "signature.txt";
				blob = new Blob([await this.sigObj?.getTextData(this.sigSDK.TextFormat.BASE64)], { type: "text/plain" });
			} else if (format == "binary") {
			  newLink.download = "signature.fss";
				blob = new Blob([await this.sigObj?.getSigData()], { type: "application/octet-stream" });
			} else if (format == "iso") {
        let name;
        let isoType;
        switch (this.isoTypeRef.nativeElement.selectedIndex) {
          case 0: 
            if (this.sigObj?.canEncrypt()) {
              alert("The selected type should be encrypted");
            } else {
              name = "signature_2007.iso";
              isoType = this.sigSDK.IsoType.ISO19794_7_2007_BINARY;
            }
            break;
          case 1:
            if (this.sigObj?.canEncrypt()) {
              alert("XML ISO does not support encryption");
              return;
            } else {
              name = "signature.xml";
              isoType = this.sigSDK.IsoType.ISO19785_3_2015_XML;
            }
            break;
          case 2:
            if (!this.sigObj?.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2007_encrypted_binary.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2007_ENCRYPTED_BINARY;
            }
            break;
          case 3:
            if (!this.sigObj?.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2007_encrypted_text.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2007_ENCRYPTED_TEXT;
            }
            break;
          case 4: 
            if (this.sigObj?.canEncrypt()) {
              alert("The selected type should be encrypted");
            } else {
              name = "signature_2014.iso";
              isoType = this.sigSDK.IsoType.ISO19794_7_2014_BINARY;
            }
            break;
          case 5:
            if (!this.sigObj?.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2014_encrypted_binary.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2014_ENCRYPTED_BINARY;
            }
            break;
          case 6:
            if (!this.sigObj?.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2014_encrypted_text.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2014_ENCRYPTED_TEXT;
            }
            break;
          case 7: 
            if (this.sigObj?.canEncrypt()) {
              alert("The selected type should be encrypted");
            } else {
              name = "signature_2021.iso";
              isoType = this.sigSDK.IsoType.ISO19794_7_2021_BINARY;
            }
            break;
          case 8:
            if (!this.sigObj?.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2021_encrypted_binary.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_BINARY;
            }
            break;
          case 9:
            if (!this.sigObj?.canEncrypt()) {
              alert("No encryption options setted");              
            } else {
              name = "signature_2021_encrypted_text.iso"
              isoType = this.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_TEXT;
            }
            break;
        }
        if (name) {
			    newLink.download = name;
          blob = new Blob([await this.sigObj?.exportIso(isoType)], { type: "application/octet-stream" });
        } else {
          return;
        }		
			}
					
			if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(blob!);
      } else {
        newLink.href = window.URL.createObjectURL(blob!);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
      }
	  }
				
    newLink.click(); 
		newLink.remove();
	}

  async loadSignature() {
    const outer = this;
	  try {
		//reset encryption data
		await this.sigObj?.setPublicKey("");
		await this.sigObj?.setPrivateKey("");
		await this.sigObj?.setEncryptionPassword("");
		await this.decryptSignature(this.sigObj!);
	  } catch (e) {
	    console.log(e);
	  }
	  const file = this.loadSignatureBtnRef.nativeElement.files[0];
	  if (file) {				
	    // check the type	  
	    if (("text/plain" == file.type) || ("text/xml" == file.type)) {
		    // read the file as string
		    const reader = new FileReader();        
            reader.onload = async function() {
            const data: string = reader.result as string;
			    //try {
				    if ("text/plain" == file.type) {
				      if ((!await outer.sigObj?.setTextData(data)) || (!await outer.readSignature(false))) {									    
				            // maybe ISO binary text encrypted
						    try {
					            const ad = new outer.sigSDK.AdditionalImportIsoData();
		                        ad.setWho("User imported from ISO");
		                        ad.setWhy("Signature imported from ISO");
					            //ad.setWhen(new Date());
					            await outer.sigObj?.importIso(data, outer.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_TEXT, ad);
								outer.readSignature(true);
						    } catch (e) {		
								outer.loadSignatureBtnRef.nativeElement.value = null;
					            alert(e);
						    }
				      }
				    } else {
						//text/xml
		                const ad = new outer.sigSDK.AdditionalImportIsoData();
		                ad.setWho("User imported from XML ISO");
		                ad.setWhy("Signature imported from XML ISO");
									
						const domParser = new DOMParser();
						const xmlDocument = domParser.parseFromString(data, "text/xml");
						const elements = xmlDocument.getElementsByTagName("CreationDate");
						if (elements.length > 0) {
						    ad.setWhen(new Date(elements[0].innerHTML));
						}
									
					    await outer.sigObj?.importIso(data, outer.sigSDK.IsoType.ISO19785_3_2015_XML, ad);
					    outer.readSignature(true);
				    }					
			    //} catch (e) {
				    //alert.log(e);
			    //}
		    }
            reader.readAsText(file);
	    } else if (file.type == "image/png") {			  
		    const reader = new FileReader();
            reader.onload = async function() {
                const data: string = reader.result as string;
		        var img: HTMLImageElement = new Image();	     
		        img.addEventListener('load', async function() {
                    //the image has been loaded
			        const canvas = document.createElement("canvas");
			        //canvas.width = img.width;
			        //canvas.height = img.height;
			        //const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
			        //ctx.drawImage(img, 0, 0, img.width, img.height);
			        //const imageData = ctx.getImageData(0, 0, img.width, img.height);
								
					//Note: using the 2D context, the alpha channel uses premultiplication, so in case we are loading a image
					//with alpha channel the biometric data embedded inside the image is destroyed, so we use
					//webgl2 context instead that maintaing the RGBA colors without modification.
					const gl = canvas.getContext("webgl2");
					gl?.activeTexture(gl.TEXTURE0);
                    const texture = gl?.createTexture();
                    gl?.bindTexture(gl.TEXTURE_2D, texture!);
                    const framebuffer = gl?.createFramebuffer();
                    gl?.bindFramebuffer(gl.FRAMEBUFFER, framebuffer!);
                    gl?.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture!, 0);
                    gl?.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
                    gl?.drawBuffers([gl.COLOR_ATTACHMENT0]);
                    const imageData = new Uint8Array(this.width * this.height * 4);
                    gl?.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
			        try {
				        //await outer.sigObj?.readEncodedBitmapBinary(imageData.data, imageData.width, imageData.height);
						await outer.sigObj?.readEncodedBitmapBinary(imageData, img.width, img.height);
				        outer.readSignature(true);
			        } catch (e) {
					    outer.loadSignatureBtnRef.nativeElement.value = null;
				        alert(e);
			        }			
                }, false);
		        img.src = data;  
            }
            reader.readAsDataURL(file);		
	    } else {
		    // we assume is binary data
		    const reader = new FileReader();
            reader.onload = async function() {
            const data: ArrayBuffer = reader.result as ArrayBuffer;            
			    try {
			        if ((!await outer.sigObj?.setSigData(new Uint8Array(data))) || (!await outer.readSignature(false))) {
				        // try with iso format
					    const ad = new outer.sigSDK.AdditionalImportIsoData();
		                ad.setWho("User imported from ISO");
		                ad.setWhy("Signature imported from ISO");
					    //ad.setWhen(new Date());
					    //ad.putExtraData("extra1", "test");
					    //ad.putExtraData("extra2", "test2");				
					    if (await outer.sigObj?.importIso(new Uint8Array(data), outer.isEncryptedBinary(data) ? outer.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_BINARY : outer.sigSDK.IsoType.ISO19794_7_2021_BINARY, ad)) {
					        outer.readSignature(true);
					    } else {
					        outer.loadSignatureBtnRef.nativeElement.value = null;
					        alert("Incorrect signature data found");
					        outer.emptyLoadData();
					    }
				    }
			    } catch (e) {
				    //maybe encrypted text
					try {
					    const ad = new outer.sigSDK.AdditionalImportIsoData();
		                ad.setWho("User imported from ISO");
		                ad.setWhy("Signature imported from ISO");
					    //ad.setWhen(new Date());
					    await outer.sigObj?.importIso(data, outer.sigSDK.IsoType.ISO19794_7_2021_ENCRYPTED_TEXT, ad);
						outer.readSignature(true);
					} catch (e1) {
			            outer.loadSignatureBtnRef.nativeElement.value = null;
				        alert(e1);
				        outer.emptyLoadData();
					}	
			    }
		    }
        reader.readAsArrayBuffer(file);		
	    }
	  }
	}

  async encryptSignature() {
		try {
			if (this.noEncryptionRef.nativeElement.checked) {
			  await this.sigObj?.setPublicKey("");
				await this.sigObj?.setPrivateKey("");
			} else {
 				if (this.symmetricEncryptionRef.nativeElement.checked) {
				  await this.sigObj?.setEncryptionPassword(this.symmetricPasswordRef.nativeElement.value);												
				} else if (this.asymmetricEncryptionRef.nativeElement.checked) {
					const pubKey = this.publicKeyRef.nativeElement.value;
          if (pubKey !== "") {								
					  await this.sigObj?.setPublicKey(pubKey);								
					}
				}
						
				if (!this.sigObj?.canEncrypt()) {
					alert("The signature cannot be encrypted");
				}
			}
		} catch (e) {
			alert(e);
		}
	}

  async decryptSignature(signature: SigObj) {
		try {
			if (this.symmetricEncryptionRef.nativeElement.checked) {
				await signature.setEncryptionPassword(this.symmetricPasswordRef.nativeElement.value);												
			} else if (this.asymmetricEncryptionRef.nativeElement.checked) {
				let privKey = this.privateKeyRef.nativeElement.value;
				if (privKey !== "") {		
                    const privKeyPassword = this.privateKeyPasswordRef.nativeElement.value;
					if (privKeyPassword !== "") {
						// add the password to the end of the key
		                privKey += ","+privKeyPassword;
					}
				    await signature.setPrivateKey(privKey);								
			    }
		    }
		} catch (e) {
		  alert(e);
		}
  }

  async readSignature(showError: boolean) {
		try {
			const image = await this.renderSignatureImage();
				
			this.loadWhoRef.nativeElement.innerHTML = this.sigObj?.getWho();
			this.loadWhyRef.nativeElement.innerHTML = this.sigObj?.getWhy();
			let when = this.sigObj?.getWhen();
 			this.loadWhenRef.nativeElement.innerHTML = "The signature was captured on "+when;
			this.loadExtraDataRef.nativeElement.innerHTML = this.sigObj?.getExtraData("");
				
			this.loadDigitizerTypeRef.nativeElement.innerHTML = this.sigObj?.getAdditionalData(this.sigSDK.CaptureData.Digitizer);
			this.loadDigitizerDriveRef.nativeElement.innerHTML = this.sigObj?.getAdditionalData(this.sigSDK.CaptureData.Digitizer_Driver);
			this.loadOperatingSystemRef.nativeElement.innerHTML = this.sigObj?.getAdditionalData(this.sigSDK.CaptureData.Machine_OS);
			this.loadNetworkInterfaceCardRef.nativeElement.innerHTML = this.sigObj?.getAdditionalData(this.sigSDK.CaptureData.Network_Card);
			this.loadLicenceRef.nativeElement.innerHTML = this.sigObj?.getLicence();				
								
			const types = [this.sigSDK.KeyType.MD5, 
				             this.sigSDK.KeyType.SHA1, 
						    	   this.sigSDK.KeyType.SHA224, 
							       this.sigSDK.KeyType.SHA256, 
							       this.sigSDK.KeyType.SHA384, 
							       this.sigSDK.KeyType.SHA512];
				
			for (let i=0; i<types.length; i++) {
				try {				
				  let status = await this.sigObj?.checkIntegrity(types[i]);
					if (status == this.sigSDK.IntegrityStatus.OK) {
						this.loadIntegrityRef.nativeElement.innerHTML = '<span style="color:green">The signature integrity is correct.</span>';
						break;
					} else if (status == this.sigSDK.IntegrityStatus.MISSING) {
						this.loadIntegrityRef.nativeElement.innerHTML = '<span style="color:black">No Integrity data found.</span>';
						break;
					} else if (status != this.sigSDK.IntegrityStatus.WRONG_TYPE) {
						this.loadIntegrityRef.nativeElement.innerHTML = '<span style="color:red">'+this.integrityStatusDesc(status)+'</span>';	
						break;
					}                        
				} catch (e) {				   
				}
      }		

      this.documentLoadBtnRef.nativeElement.disabled = false;		
			this.signatureImageLoadedRef.nativeElement.src = image;					
			this.signatureImageLoadedRef.nativeElement.style.display = "block";			
      this.signatureImageLoadeBackgroundRef.nativeElement.style.display = "none";				
		} catch (e) {
			this.loadSignatureBtnRef.nativeElement.value = null;
			if (showError) {
				alert(e);
			}
			return false;
		}
				
		return true;
	}

  integrityStatusDesc(status : IntegrityStatus) {
	  switch (status) {
		  case this.sigSDK.IntegrityStatus.OK: return "Integrity correct";
		  case this.sigSDK.IntegrityStatus.FAIL: return "Signature tampered";
		  case this.sigSDK.IntegrityStatus.MISSING: return "The signature has no integrity data";
		  case this.sigSDK.IntegrityStatus.WRONG_TYPE: return "The type of the key is incorrect, please try with another type";
		  case this.sigSDK.IntegrityStatus.INSUFFICIENT_DATA: return "Insufficient data";
		  case this.sigSDK.IntegrityStatus.UNCERTAIN: return "The integrity is uncertain";
		  default: return "The integrity type is not supported in this version of Signature SDK";
	  }
  }

  dataStatusDesc(status : DataStatus) {
	  switch (status) {
	    case this.sigSDK.DataStatus.GOOD: return "Signed data correct";
	    case this.sigSDK.DataStatus.NO_HASH: return "The signature has not attached any data";
	    case this.sigSDK.DataStatus.BAD_TYPE: return "The type of the hash is incorrect, please try with another type";
		  case this.sigSDK.DataStatus.BAD_HASH: return "The hash of the document is different from the provided";
		  case this.sigSDK.DataStatus.ERROR: return "Unknown error";
		  case this.sigSDK.DataStatus.UNCERTAIN: return "The data is uncertain";
		  default: return "The signature has been moved";
	  }
  }

  isEncryptedBinary(data: ArrayBuffer) {
    var string = new TextDecoder().decode(data);
	  return (string.startsWith("wgssAES_") || string.startsWith("wgssRSA_"));
  }  

  emptyLoadData() {
    this.loadWhoRef.nativeElement.innerHTML = "";
		this.loadWhyRef.nativeElement.innerHTML = "";		
 		this.loadWhenRef.nativeElement.innerHTML = "";
		this.loadExtraDataRef.nativeElement.innerHTML = "";
				
		this.loadDigitizerTypeRef.nativeElement.innerHTML = "";
		this.loadDigitizerDriveRef.nativeElement.innerHTML = "";
		this.loadOperatingSystemRef.nativeElement.innerHTML = "";
		this.loadNetworkInterfaceCardRef.nativeElement.innerHTML = "";
		this.loadLicenceRef.nativeElement.innerHTML = "";				
				
		this.loadIntegrityRef.nativeElement.innerHTML = "";
				
		this.documentLoadBtnRef.nativeElement.disabled = true;				
		this.signatureImageLoadedRef.nativeElement.style.display = "none";	
    this.signatureImageLoadeBackgroundRef.nativeElement.style.display = "block";				
	}

  async checkDocumentHash() {
    const outer = this;
    const reader = new FileReader();
    reader.onload = async function() {                    
			try {
				const data = reader.result;   						
				const types = [outer.sigSDK.KeyType.MD5, 
				               outer.sigSDK.KeyType.SHA1, 
							         outer.sigSDK.KeyType.SHA224, 
							         outer.sigSDK.KeyType.SHA256, 
							         outer.sigSDK.KeyType.SHA384, 
							         outer.sigSDK.KeyType.SHA512];
						
				for (let i=0; i<types.length; i++) {
					const hashType = types[i];
	        let documentHash = new outer.sigSDK.Hash(hashType);	  
	        if (await documentHash.add(data)) {
						const status = await outer.sigObj?.checkSignedData(documentHash);		  							
						if (status !=  outer.sigSDK.DataStatus.BAD_TYPE) {
							alert(outer.dataStatusDesc(status));
							break;
						}
	        } else {
		        alert("Failed to load file");
						break;
	        }   
          documentHash.delete();						
				}						                       
	    } catch (e) {
		    alert(e);
	    }
		}
    reader.readAsArrayBuffer(this.documentLoadBtnRef.nativeElement.files[0]);					    
	}

  loadBackgroundImage() {
    const outer = this;
		const file = this.backgroundImageRef.nativeElement.files[0];
	  if (file) {
			const reader = new FileReader();
      reader.onload = async function() {
        const data = reader.result as string;
		    outer.backgroundImage = new Image();	     
	      outer.backgroundImage.src = data;  
			}
      reader.readAsDataURL(file);										    
		}
	}

  addButton() {
    const outer = this;
    const fieldSet = document.createElement("fieldset");
    const labelButtonText = document.createElement("label");
    labelButtonText.innerHTML = "Button Text:";
    fieldSet.appendChild(labelButtonText);
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.name = "button_text";
    fieldSet.appendChild(inputText);
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));
    const labelAction = document.createElement("label");
    labelAction.innerHTML = "Action:";
    fieldSet.appendChild(labelAction);
    const inputAction = document.createElement("input");
    inputAction.type = "text";
    inputAction.name = "button_action";
    fieldSet.appendChild(inputAction); 
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));       
    const labelTextColor = document.createElement("label");
    labelTextColor.innerHTML = "Text color:";
    fieldSet.appendChild(labelTextColor);
    const inputTextColor = document.createElement("input");
    inputTextColor.type = "color";
    inputTextColor.name = "button_text_color";
    inputTextColor.value = "#000000";
    fieldSet.appendChild(inputTextColor);     
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));       
    const labelBackgroundColor = document.createElement("label");
    labelBackgroundColor.innerHTML = "Background color:";
    fieldSet.appendChild(labelBackgroundColor);
    const inputBackgroundColor = document.createElement("input");
    inputBackgroundColor.type = "color";
    inputBackgroundColor.name = "button_background_color";
    inputBackgroundColor.value = "#e7e7e7";
    fieldSet.appendChild(inputBackgroundColor);     
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));       
    const labelBorderWidth = document.createElement("label");
    labelBorderWidth.innerHTML = "Border width:";
    fieldSet.appendChild(labelBorderWidth);
    const inputBorderWidth = document.createElement("input");
    inputBorderWidth.type = "text";
    inputBorderWidth.name = "button_border_width";
    inputBorderWidth.value = "1";
    fieldSet.appendChild(inputBorderWidth);     
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));       
    const labelBorderColor = document.createElement("label");
    labelBorderColor.innerHTML = "Border color:";
    fieldSet.appendChild(labelBorderColor);
    const inputBorderColor = document.createElement("input");
    inputBorderColor.type = "color";
    inputBorderColor.name = "button_border_color";
    inputBorderColor.value = "#cccccc";
    fieldSet.appendChild(inputBorderColor);     
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(document.createElement("br"));       
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.onclick = function() { outer.buttonListDivRef.nativeElement.removeChild(fieldSet); };
    fieldSet.appendChild(deleteBtn);
    this.buttonListDivRef.nativeElement.appendChild(fieldSet);
	}

  removeButton(button : string) {
    switch (button) {
      case "clear_btn_div_default": 
        this.buttonListDivRef.nativeElement.removeChild(this.clearBtnDivDefaultRef.nativeElement);
        break;
      case "cancel_btn_div_default": 
        this.buttonListDivRef.nativeElement.removeChild(this.cancelBtnDivDefaultRef.nativeElement);
        break;
      case "accept_btn_div_default": 
        this.buttonListDivRef.nativeElement.removeChild(this.acceptBtnDivDefaultRef.nativeElement);
        break;
    }
    //this.buttonListDivRef.nativeElement.removeChild(button.parentElement);
	}

  async getSystemInfo(): Promise<[string, string]> {
    let browserInfo: string = "";
    let osInfo: string = "";
    //Along with the signature we are going to include the Operative System and Web Browser
    //in where the signature has been captured. However this is sensible information that 
    //most web browsers does not allow to obtain. First of all we are going to try to get the data
    //using the new experimental User-Agent Client Hints API, only available on certains web browsers.
	  const navigatorUAData = (window.navigator as any).userAgentData;
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
      //there are some libraries that we can use for trying to identify the OS and Browser version
      //using user agent, however not very accurate for all devices, so we let the integrator
      //deciding how to handle it.
      browserInfo = navigator.userAgent;
      osInfo = "Unkwon OS";	        
    }

    return [browserInfo, osInfo];
  }

}
