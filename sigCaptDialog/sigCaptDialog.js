function Button() {
  this.Bounds; // in Screen coordinates
  this.Text;
  this.Click;
}
  
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.Contains = function (pt) {
    if (((pt.x >= this.x) && (pt.x <= (this.x + this.width))) &&
      ((pt.y >= this.y) && (pt.y <= (this.y + this.height)))) {
        return true;
    } else {
      return false;
    }
  }
}

function getLocateString(string) {
	var deStrings = {"evaluation":"Evaluierung",
	                 "ok":"OK",
					 "cancel":"Abbrechen",
					 "clear":"Löschen",
					 "defaultName":"Kunde",
					 "defaultReason":"Bestätigt"
					};
					 
	var elStrings = {"evaluation":"Αξιολόγηση",
	                 "ok":"Εντάξει",
					 "cancel":"Ακύρωση",
					 "clear":"Διαγραφή",
					 "defaultName":"Πελάτης",
					 "defaultReason":"Επιβεβαιωμένος"
	                };
					
	var enStrings = {"evaluation":"Evaluation",
	                 "ok":"OK",
					 "cancel":"Cancel",
					 "clear":"Clear",
					 "defaultName":"Customer",
					 "defaultReason":"Confirmed"
	                };
					
	var esStrings = {"evaluation":"Evaluación",
	                 "ok":"Aceptar",
					 "cancel":"Cancelar",
					 "clear":"Borrar",
					 "defaultName":"Cliente",
					 "defaultReason":"Confirmado"
	                };	
					
	var frStrings = {"evaluation":"Évaluation",
	                 "ok":"OK",
					 "cancel":"Annuler",
					 "clear":"Effacer",
					 "defaultName":"Client",
					 "defaultReason":"Confirmé"
	                };	
					
	var itStrings = {"evaluation":"Valutazione",
	                 "ok":"OK",
					 "cancel":"Annulla",
					 "clear":"Cancella",
					 "defaultName":"Utente",
					 "defaultReason":"Confermato"
	                };	
					
	var jaStrings = {"evaluation":"評価",
	                 "ok":"OK",
					 "cancel":"キャンセル",
					 "clear":"クリア",
					 "defaultName":"署名者",
					 "defaultReason":"確認済"
					};
					
	var koStrings = {"evaluation":"평가",
	                 "ok":"확인",
					 "cancel":"취소",
					 "clear":"지우기",
					 "defaultName":"고객",
					 "defaultReason":"확인됨"
	                };	
					
	var nlStrings = {"evaluation":"Evaluatie",
	                 "ok":"OK",
					 "cancel":"Annuleren",
					 "clear":"Verwijderen",
					 "defaultName":"Klant",
					 "defaultReason":"Bevestigd"
	                };	
					
	var plStrings = {"evaluation":"Ocena",
	                 "ok":"OK",
					 "cancel":"Anuluj",
					 "clear":"Wyczyść",
					 "defaultName":"Klient",
					 "defaultReason":"Potwierdzono"
	                };	
					
	var ptStrings = {"evaluation":"Avaliação",
	                 "ok":"OK",
					 "cancel":"Cancelar",
					 "clear":"Apagar",
					 "defaultName":"Cliente",
					 "defaultReason":"Confirmado"
	                };	
					
	var ruStrings = {"evaluation":"Оценка",
	                 "ok":"OK",
					 "cancel":"Отмена",
					 "clear":"Удалить",
					 "defaultName":"Клиент",
					 "defaultReason":"Подтверждено"
	                };	
					
	var zhStrings = {"evaluation":"评估",
	                 "ok":"确定",
					 "cancel":"取消",
					 "clear":"清除",
					 "defaultName":"顾客",
					 "defaultReason":"确认"
					};	
					
	var strings = {"de":deStrings,
	               "el":elStrings,
		           "en":enStrings, 
	               "es":esStrings,
				   "fr":frStrings,
				   "it":itStrings,
				   "ja":jaStrings,
				   "ko":koStrings,
				   "nl":nlStrings,
				   "pl":plStrings,
				   "pt":ptStrings,
				   "ru":ruStrings,
				   "zh":zhStrings};
				   
	var userLang = (navigator.language || navigator.userLanguage).split("-")[0]; 
	if (strings[userLang][string]) {
	    return strings[userLang][string];
	} else {
		return strings["en"][string];
	}
	
}

class SigCaptDialog {	 

  mapConfig(config) {	    
	  if (config.width) {
		  this.config.width = config.width;
	  }
	  if (config.height) {
		  this.config.height = config.height;
	  }
	  if (config.left != undefined) {
		  this.config.left = config.left;
	  }
	  if (config.top != undefined) {
		  this.config.top = config.top;
	  }
	  if (config.centered != undefined) {
		  this.config.centered = config.centered;
	  }
	  if (config.title) {
		  this.config.title = config.title;
	  }
	  if (config.hasTitle != undefined) {
		  this.config.hasTitle = config.hasTitle;
	  }
	  if (config.borderWidth != undefined) {
		  this.config.borderWidth = config.borderWidth;
	  }
	  if (config.borderColor) {
		  this.config.borderColor = config.borderColor;
	  }
	  if (config.buttonsFont) {
		  this.config.buttonsFont = config.buttonsFont;
	  }
	  if (config.background) {
		  if (config.background.alpha) {
			  this.config.background.alpha = config.background.alpha;
		  }
		  if (config.background.color) {
			  this.config.background.color = config.background.color;
		  }
		  if (config.background.image) {
			  this.config.background.image = config.background.image;
		  }
	  }
	  if (config.reason) {
		  if (config.reason.visible != undefined) {
			  this.config.reason.visible = config.reason.visible;
		  }
		  if (config.reason.fontFace) {
			  this.config.reason.fontFace = config.reason.fontFace;
		  }
		  if (config.reason.fontSize) {
			  this.config.reason.fontSize = config.reason.fontSize;
		  }
		  if (config.reason.color) {
			  this.config.reason.color = config.reason.color;
		  }
		  if (config.reason.offsetY) {
			  this.config.reason.offsetY = config.reason.offsetY;
		  }
		  if (config.reason.offsetX) {
			  this.config.reason.offsetX = config.reason.offsetX;
		  }
	  }
	  if (config.signatory) {
		  if (config.signatory.visible != undefined) {
			  this.config.signatory.visible = config.signatory.visible;
		  }
		  if (config.signatory.fontFace) {
			  this.config.signatory.fontFace = config.signatory.fontFace;
		  }
		  if (config.signatory.fontSize) {
			  this.config.signatory.fontSize = config.signatory.fontSize;
		  }
		  if (config.signatory.color) {
			  this.config.signatory.color = config.signatory.color;
		  }
		  if (config.signatory.offsetY) {
			  this.config.signatory.offsetY = config.signatory.offsetY;
		  }
		  if (config.signatory.offsetX) {
			  this.config.signatory.offsetX = config.signatory.offsetX;
		  }
	  }
	  if (config.signingLine) {
		  if (config.signingLine.visible != undefined) {
			  this.config.signingLine.visible = config.signingLine.visible;
		  }
		  if (config.signingLine.left) {
			  this.config.signingLine.left = config.signingLine.left;
		  }
		  if (config.signingLine.right) {
			  this.config.signingLine.right = config.signingLine.right;
		  }
		  if (config.signingLine.width) {
			  this.config.signingLine.width = config.signingLine.width;
		  }
		  if (config.signingLine.color) {
			  this.config.signingLine.color = config.signingLine.color;
		  }
		  if (config.signingLine.offsetY) {
			  this.config.signingLine.offsetY = config.signingLine.offsetY;
		  }		  		  
	  }
	  if (config.date) {
		  if (config.date.visible != undefined) {
			  this.config.date.visible = config.date.visible;
		  }
		  if (config.date.fontFace) {
			  this.config.date.fontFace = config.date.fontFace;
		  }
		  if (config.date.fontSize) {
			  this.config.date.fontSize = config.date.fontSize;
		  }
		  if (config.date.left) {
			  this.config.date.left = config.date.left;
		  }
		  if (config.date.right) {
			  this.config.date.right = config.date.right;
		  }
		  if (config.date.width) {
			  this.config.date.width = config.date.width;
		  }
		  if (config.date.color) {
			  this.config.date.color = config.date.color;
		  }
		  if (config.date.offsetY) {
			  this.config.date.offsetY = config.date.offsetY;
		  }		  		  
	  }
	  if (config.attachTo) {
	      this.config.attachTo = config.attachTo;
	  }
	  if (config.modal != undefined) {
		  this.config.modal = config.modal;
	  }
	  if (config.draggable != undefined) {
		  this.config.draggable = config.draggable;
	  }
	  if (config.source) {
		  if (config.source.mouse != undefined) {
			  this.config.source.mouse = config.source.mouse;
		  }
		  if (config.source.touch != undefined) {
			  this.config.source.touch = config.source.touch;
		  }
		  if (config.source.pen != undefined) {
			  this.config.source.pen = config.source.pen;
		  }
		  if (config.source.stu != undefined) {
			  this.config.source.stu = config.source.stu;
		  }
	  }
	  if (config.will) {
		  if (config.will.tool) {
			  this.config.will.tool = config.will.tool;
		  }
		  if (config.will.color) {
			  this.config.will.color = config.will.color;
		  }
	  }
	  
	  if (config.buttons) {
		  this.config.buttons = config.buttons;
	  }
  }
	
  constructor(config) {
	this.config = {
	  width: 400,
	  height: 300,
	  left: 0,
	  top:0,
	  centered:false,
	  title: "My Tittle",
	  borderColor: "#0097d4",
	  borderWidth: "1p",
	  hasTitle: true,
	  buttons: [{text: "*clear", textColor: "black", backgroundColor: "lightgrey", borderWidth: 0, borderColor: "black", onClick: this.btnClearClick.bind(this)}, 
	            {text: "*cancel", textColor: "black", backgroundColor: "lightgrey", borderWidth: 0, borderColor: "black", onClick: this.btnCancelClick.bind(this)}, 
				{text: "*ok", textColor: "black", backgroundColor: "lightgrey", borderWidth: 0, borderColor: "black", onClick: this.btnOkClick.bind(this)}],
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
	  
	this.mapConfig(config);
	
	this.capturedPoints = new Array();
	this.onClearListeners = new Array();
	this.onCancelListeners = new Array();
	this.onOkListeners = new Array();
  }
  
  /**
   * Add an event listener
   * @param {string} eventType - The type of the listener, can be "clear", "cancel" or "ok".
   * @param {function} listener - The function that will handle the event
   **/
  addEventListener(eventType, listener) {
	  switch (eventType) {
		  case "clear"  : this.onClearListeners.push(listener);  break;
		  case "cancel" : this.onCancelListeners.push(listener); break;
		  case "ok"     : this.onOkListeners.push(listener);     break;
	  }
  }
  
  /**
   * Connect to the first STU device found, and open the capture dialog.
   * @param {string} - Name of the person who is going to sign.
   * @param {string} - Reason for signing.
   * @param {IntegrityType} - Hash method to maintain the signature integrity. None by default.
   * @param {Hash} - Hash of an attached document. None by default.
  **/	 
  async open(sigObj, who, why, extraData, integrityType, documentHash) {	  
      this.sigObj = sigObj;
	  this.extraData = extraData;
	  
      if (who) {
	      this.signatory = who;
	  } else {
	      this.signatory = getLocateString('defaultName');
	  }
		
	  if (why) {
	      this.reason = why;
	  } else {
	      this.reason = getLocateString('defaultReason');
	  }
		
	  if (integrityType) {
	      this.integrityType = integrityType;
	  } else {
		  this.integrityType = Module.KeyType.None;
	  }
		
	  if (documentHash) {
		  this.documentHash = documentHash;
	  } else {
		  this.documentHash = new Module.Hash(Module.HashType.None);	
	  }
    
	  this.createWindow(parseInt(this.config.width), parseInt(this.config.height));
	  await this.initInkController();	  	  
	  
	  this.mBtns = new Array(this.config.buttons.length);
	  if (this.config.buttons.length > 0) {
		  const y = this.canvas.height * 6 / 7;
	      const h = this.canvas.height - y;
		  const w = this.canvas.width / this.config.buttons.length;
	  	      
	      for (var i=0; i<this.config.buttons.length; i++) {
	          this.mBtns[i] = new Button();  
		  
		      // Place the buttons across the bottom of the screen.  
		      this.mBtns[i].Bounds = new Rectangle((i*w), y, w, h);
			  
			  let buttonText;
			  if (this.config.buttons[i].text.startsWith("*")) {
				  buttonText = getLocateString(this.config.buttons[i].text.substr(1));
			  } else {
				  buttonText = this.config.buttons[i].text;
			  }
			  
			  this.mBtns[i].Text = buttonText;
			  this.mBtns[i].Click = this.config.buttons[i].onClick;
		  }
	  }
	  			      
	  // This application uses the same bitmap for both the screen and client (window).
	  this.ctx.lineWidth = 1;
	  this.ctx.strokeStyle = 'black';
      this.ctx.font = "30px Arial";	  
			
	  this.ctx.fillStyle = "white";
	  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);	  	  
	  
	  this.canvasBackgroundImage = this.createScreenImage(true);	  	  
	  const outer = this;
      const image = new Image();
      image.onload = function () {
	      outer.ctx.drawImage(image, 0, 0);	  
      }
      image.src = this.canvasBackgroundImage;		  	  
  
      //this.startCapture();  // by default starts capturing data	  	  
	  //$("#signatureWindow").show();	
  }    
  
  /**
   * Start capturing data
   **/
  startCapture() {
	  if (!this.isCapturing) {
	      this.willCanvas.addEventListener("pointerdown", this.onDown.bind(this), false);
	      this.willCanvas.addEventListener("pointermove", this.onMove.bind(this), false);
	      this.willCanvas.addEventListener("pointerup", this.onUp.bind(this), false);
		  this.willCanvas.addEventListener("pointerenter", this.onDown.bind(this), false);
		  this.willCanvas.addEventListener("pointerleave", this.onUp.bind(this), false);
		  this.isCapturing = true;
		  this.showLoadingScreen(false);
	  }
  }
  
  /**
   * Stop capturing data
   **/   
  stopCapture() {
	  this.willCanvas.removeEventListener("pointerdown", this.onDown.bind(this), false);
	  this.willCanvas.removeEventListener("pointermove", this.onMove.bind(this), false);
	  this.willCanvas.removeEventListener("pointerup", this.onUp.bind(this), false);
	  this.willCanvas.removeEventListener("pointerenter", this.onDown.bind(this), false);
	  this.willCanvas.removeEventListener("pointerleave", this.onUp.bind(this), false);
	  this.isCapturing = false;
	  this.showLoadingScreen(true);
  }
  
  /**
   * Close the Capture Window
   **/
  async close() {
	  await this.closeWindow();
  }
  
  /**
   * Return the background Image.
   **/
  getBackgroundScreen() {
	  return this.canvasBackgroundImage;
  }
  
  /**
   * Return the button that is on the passed point.
   * @param {Point} - Coordinates of the point that are in the button
   **/
  getButton(point) {
	  for (var i = 0; i < this.mBtns.length; ++i) {
          if (this.mBtns[i].Bounds.Contains(point)) {
            return i;
          }
      }
	  return -1;
  }
  
  /**
   * Executes the button defines by its index.
   * @param {number} - Index of  the button.
   **/
  clickButton(btnIndex) {
	  if (this.mBtns.length > btnIndex) {
		  this.mBtns[btnIndex].Click();
	  }
  }
  
  showLoadingScreen(value) {
	  if (value) {
		  //this.canvas.style.display = "none";
		  this.mLoadingImageDiv.style.display = "table";
	  } else {
		  //this.canvas.style.display = "block";
		  this.mLoadingImageDiv.style.display = "none";
	  }
  }
  
  createWindow(width, height) {
	  if (this.config.modal) {  
          this.mModalBackground = document.createElement('div');
          this.mModalBackground.id = "modal-background";
          this.mModalBackground.className = "active";
          this.mModalBackground.style.width = "100%";
          this.mModalBackground.style.height = "100%";
		  this.mModalBackground.style.position = "fixed";
          document.getElementsByTagName('body')[0].appendChild(this.mModalBackground);
	  }
	  
      if (this.config.attachTo) {
		  const parent = document.getElementById(this.config.attachTo);
		  const offsets = parent.getBoundingClientRect();
		  
		  this.mSignatureWindow = document.createElement('div');
	      this.mSignatureWindow.setAttribute("style", "touch-action: none;z-index: 1001;");		  
	      this.mSignatureWindow.id = "signatureWindow";
	      //this.mSignatureWindow.style.position = "absolute";		  
	      this.mSignatureWindow.style.top = 0;//offsets.top;
          this.mSignatureWindow.style.left = 0;//offsets.left;
          this.mSignatureWindow.style.width = "100%";//width + "px";
          this.mSignatureWindow.style.height = "100%";//height + "px";
	      //this.mSignatureWindow.style.opacity = this.config.background.alpha;		
		  //this.mSignatureWindow.style.backgroundColor = "#ff0000";
          parent.appendChild(this.mSignatureWindow);
	
          this.mFormDiv = document.createElement('div');
		  this.mFormDiv.setAttribute("style", "touch-action: none;z-index: 1001;");		  
	      this.mFormDiv.style.position = "absolute";
          //this.mFormDiv.style.top = titleBarHeight;//(window.innerHeight / 2) - (height / 2) + "px";
          this.mFormDiv.style.width = width + "px";
          this.mFormDiv.style.height = height + "px";
          //this.mFormDiv.style.opacity = this.config.background.alpha;				  
          this.mSignatureWindow.appendChild(this.mFormDiv);

          this.canvas = document.createElement("canvas");	
          this.canvas.id = "myCanvas";
	      this.canvas.style.position = "absolute";
          this.canvas.height = this.mFormDiv.offsetHeight;
          this.canvas.width = this.mFormDiv.offsetWidth;		
		  this.canvas.style.opacity = this.config.background.alpha;				  
	      this.ctx = this.canvas.getContext("2d");
          this.mFormDiv.appendChild(this.canvas);
	
	      this.willCanvas = document.createElement("canvas");
	      this.willCanvas.id = "willCanvas";
	      this.willCanvas.style.position = "absolute";
	      this.willCanvas.style.top = this.canvas.style.top;
	      this.willCanvas.style.left = this.canvas.style.left;
          this.willCanvas.height = this.canvas.height;
          this.willCanvas.width = this.canvas.width;
          this.mFormDiv.appendChild(this.willCanvas);      
	  } else {		  	  
	      let titleBarHeight = this.config.hasTitle ? 25 : 0;
	      let margin = 0;
	      this.mSignatureWindow = document.createElement('div');
	      this.mSignatureWindow.setAttribute("style", "touch-action: none;z-index: 1001;");
	      this.mSignatureWindow.id = "signatureWindow";
	      this.mSignatureWindow.style.position = "absolute";
		  this.mSignatureWindow.style.borderWidth = this.config.borderWidth + "px";
		  this.mSignatureWindow.style.borderStyle = "solid";
		  this.mSignatureWindow.style.borderColor = this.config.borderColor;
	      //this.mSignatureWindow.style.backgroundColor = this.config.borderColor;	
		  if (this.config.centered) {
	          this.mSignatureWindow.style.top = (window.innerHeight / 2) - (height / 2) + "px";
              this.mSignatureWindow.style.left = (window.innerWidth / 2) - (width / 2) + "px";
		  } else {
			  this.mSignatureWindow.style.top = this.config.top;
              this.mSignatureWindow.style.left = this.config.left;
		  }
          this.mSignatureWindow.style.width = (width + margin + margin) + "px";
          this.mSignatureWindow.style.height = (height+titleBarHeight + margin + margin) + "px";
	      //this.mSignatureWindow.style.opacity = this.config.background.alpha;		
          document.getElementsByTagName('body')[0].appendChild(this.mSignatureWindow);
	
	      if (this.config.hasTitle) {
	          this.mTitleBar = document.createElement("div");
	          this.mTitleBar.id = "titleBar";
		      this.mTitleBar.setAttribute("style", "display:table;padding:0;margin:0");
	          this.mTitleBar.style.width = "100%";
              this.mTitleBar.style.height = titleBarHeight+"px";
		      this.mTitleBar.style.backgroundColor = this.config.borderColor;
	          this.mTitleBar.innerHTML = '<div style="padding-left:5px;display: table-cell; vertical-align: middle;height:'+titleBarHeight+'px;">'+this.config.title+'</div>';
	          this.mSignatureWindow.appendChild(this.mTitleBar);
		  }

          this.mFormDiv = document.createElement('div');		  
	      this.mFormDiv.style.position = "absolute";
	      this.mFormDiv.style.margin = "0";
          this.mFormDiv.style.top = titleBarHeight;//(window.innerHeight / 2) - (height / 2) + "px";
          this.mFormDiv.style.width = width + "px";
          this.mFormDiv.style.height = height + "px";	
          this.mSignatureWindow.appendChild(this.mFormDiv);

          this.canvas = document.createElement("canvas");	
          this.canvas.id = "myCanvas";
	      this.canvas.style.position = "absolute";
          this.canvas.height = this.mFormDiv.offsetHeight;
          this.canvas.width = this.mFormDiv.offsetWidth;		
		  this.canvas.style.opacity = this.config.background.alpha;				  
	      this.ctx = this.canvas.getContext("2d");
          this.mFormDiv.appendChild(this.canvas);
		  
	      this.willCanvas = document.createElement("canvas");
	      this.willCanvas.id = "willCanvas";
	      this.willCanvas.style.position = "absolute";
	      this.willCanvas.style.top = this.canvas.style.top;
	      this.willCanvas.style.left = this.canvas.style.left;
          this.willCanvas.height = this.canvas.height;
          this.willCanvas.width = this.canvas.width;
          this.mFormDiv.appendChild(this.willCanvas);  

	      if (this.config.draggable) {
	          $("#signatureWindow").draggable({handle:"#titleBar"});
		  }
   	      //("#signatureWindow").hide();
	  }
	  
	  this.mLoadingImageDiv = document.createElement('div');
	  this.mLoadingImageDiv.style.display="table"
	  this.mLoadingImageDiv.style.position = "absolute";
	  this.mLoadingImageDiv.style.backgroundColor="white";
	  this.mLoadingImageDiv.style.width = "100%";
	  this.mLoadingImageDiv.style.height = "100%";
	  this.mLoadingImageDiv.innerHTML = '<div id="loadingDiv" style="padding-left:10px;display:table-cell;vertical-align:middle;"><table><tr><td><img src="../../sigCaptDialog/images/loading.gif"></td><td>Loading the image, this could take a few seconds...</td></tr></div>';
	  this.mFormDiv.appendChild(this.mLoadingImageDiv);
  }
	
  createScreenImage(useColor) {	  
    let canvas = document.createElement("canvas");
	canvas.width = this.canvas.width;
	canvas.height = this.canvas.height;
	
	let ctx = canvas.getContext("2d");
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	
    // draw background
	//ctx.globalAlpha = this.config.background.alpha;
	
	if (this.config.background.image) {
        ctx.drawImage(this.config.background.image, 0, 0, canvas.width, canvas.height);
	} else {
	    ctx.fillStyle = useColor ? this.config.background.color : "#ffffff";
	    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);	
	}		
	  
	let minFontSize = Number.MAX_SAFE_INTEGER;  
	// get the text size for the buttons
    for (let i = 0; i < this.mBtns.length; i++) {		  
	    let btn = this.mBtns[i];
	    let bounds = this.mBtns[i].Bounds;
		let textSize = this.fitTextOnCanvas(ctx, btn.Text, bounds, this.config.buttonsFont);
		if (textSize < minFontSize) {
			minFontSize = textSize;
		}
	}
	
	ctx.font = minFontSize+"px "+this.config.buttonsFont;	      
	
    let buttonsTop = 0;	
	  
	// Draw the buttons
	for (let i = 0; i < this.mBtns.length; ++i) {		  
	    let btn = this.mBtns[i];
		let bounds = this.mBtns[i].Bounds;

        ctx.fillStyle = useColor ? this.config.buttons[i].borderColor : "#000000";
	    ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);	  	  	 		
		
		ctx.fillStyle = useColor ? this.config.buttons[i].backgroundColor : "#ffffff";
	    ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
		  	    
	    let metrics = ctx.measureText(btn.Text);
	    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
				
		let xPos = bounds.x + ((bounds.width / 2) - (ctx.measureText(btn.Text).width / 2));		
	    let yOffset = bounds.height - ((bounds.height / 2) - (actualHeight / 2));
		ctx.fillStyle = useColor ? this.config.buttons[i].textColor : "#000000";		
	    ctx.fillText(btn.Text, xPos, bounds.y + yOffset);
	    buttonsTop = bounds.height;		
		
		const button = document.createElement("button");  
		button.setAttribute("style", "position:absolute;z-index:1002;padding:0;margin:0;");
		button.innerHTML = '<div style="line-height:'+yOffset+'px">'+btn.Text+'</div>';
		button.style.left = bounds.x+"px";
		button.style.top = bounds.y+"px";		
		button.style.width = bounds.width+"px";
		button.style.height = bounds.height+"px";
		button.style.font = minFontSize+"px "+this.config.buttonsFont;	
		button.style.color = this.config.buttons[i].textColor;
		button.style.backgroundColor = this.config.buttons[i].backgroundColor;
		button.style.border = this.config.buttons[i].borderWidth + "px solid "+this.config.buttons[i].borderColor;
        button.onclick = btn.Click;		
		this.mFormDiv.appendChild(button);	  		       
	}	  
	
	if (this.sigObj.isEvaluation()) {
	    this.drawEvaluationString(getLocateString("evaluation"), ctx, this.canvas.width, this.canvas.height - buttonsTop, useColor);
	}
	
	// draw reason
	if ((this.reason) && (this.config.reason.visible)) {
		ctx.fillStyle = useColor ? this.config.reason.color : "#000000";
		ctx.font = this.config.reason.fontSize+"px "+this.config.reason.fontFace;	    
		let metrics = ctx.measureText(this.reason);
	    //let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
	    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;		
		ctx.fillText(this.reason, this.config.reason.offsetX, actualHeight+this.config.reason.offsetY);
	}
	
	let dateOffsetY = 0;
	// draw date
	const date = new Date();
	const dateString = ('0'  + date.getHours()).slice(-2)+':'+('0'  + date.getMinutes()).slice(-2)+':'+('0' + date.getSeconds()).slice(-2)+" "+
				                 date.toLocaleString('default', { day: "2-digit", month: 'long', year: "numeric" });				
	
	//if (this.date) {
		ctx.fillStyle = useColor ? this.config.date.color : "#000000";
		ctx.font = this.config.date.fontSize+"px "+this.config.date.fontFace;	    
		let metrics = ctx.measureText(dateString);
	    //let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
	    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
		dateOffsetY = this.canvas.height-buttonsTop-actualHeight-this.config.date.offsetY;
		if (this.config.date.visible) {
		    ctx.fillText(dateString, this.canvas.width-metrics.width-this.config.date.offsetX, dateOffsetY);		
		}
	//}
	
	// draw signatory
	let signatoryOffsetY = 0;
	if (this.signatory) {
		ctx.fillStyle = useColor ? this.config.signatory.color : "#000000";
		ctx.font = this.config.signatory.fontSize+"px "+this.config.signatory.fontFace;	    
		let metrics = ctx.measureText(this.signatory);
	    //let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
	    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;		
		signatoryOffsetY = dateOffsetY-(actualHeight*2)-this.config.signatory.offsetY;
		if (this.config.signatory.visible) {
		    ctx.fillText(this.signatory, this.canvas.width-metrics.width-this.config.signatory.offsetX, dateOffsetY-actualHeight-this.config.signatory.offsetY);
		}	
	}

    // draw line
	if ((this.config.signingLine.width > 0) && (this.config.signingLine.visible)) {
		ctx.strokeStyle = useColor ? this.config.signingLine.color : "#000000";
	    ctx.lineWidth = this.config.signingLine.width;	
		ctx.moveTo(this.config.signingLine.left, signatoryOffsetY-this.config.signingLine.width-this.config.signingLine.offsetY);
        ctx.lineTo(this.canvas.width-this.config.signingLine.right, signatoryOffsetY-this.config.signingLine.width-this.config.signingLine.offsetY);
	}
	
	
	ctx.stroke();
				
	  /*if ((this.mTablet.isSupported(com.WacomGSS.STU.Protocol.ReportId.EncryptionStatus)) ||
	    (await com.WacomGSS.STU.Protocol.ProtocolHelper.supportsEncryption(this.mTablet.getProtocol()))) {				
		  ctx.fillStyle = "black";
		  ctx.fillText("\uD83D\uDD12", 20, 50);	
	  }*/
	return canvas.toDataURL("image/jpeg"); 
  }
  
  async clearScreen() {	
    if (window.WILL) {
		window.WILL.clear();	
	}
	
    this.capturedPoints = new Array();
  }
  
  async closeWindow() {	
	await this.deleteInkCanvas();
	this.mSignatureWindow.remove();
	
	if (this.mModalBackground) {
		this.mModalBackground.remove();
	}
  }   
  
  async clear() {
	  this.btnClearClick();
  }
  
  async accept() {
	  this.btnOkClick();
  }
  
  async cancel() {
	  this.btnCancelClick();
  }
	
  async btnOkClick() {
      this.getCaptureData();
	  await this.close();
	  this.onOkListeners.forEach(listener => listener());
  }
  
  async btnClearClick() {
    if (this.capturedPoints.length > 0) {
	  await this.clearScreen();
	}
	
	this.onClearListeners.forEach(listener => listener());
  }
  
  async btnCancelClick() {	  
      await this.close();
      this.onCancelListeners.forEach(listener => listener());
  }
  
  async initInkController() {
	let inkCanvas = await new InkCanvasRaster(this.willCanvas, this.willCanvas.width, this.willCanvas.height);
	await BrushPalette.configure(inkCanvas.canvas.ctx);

	window.WILL = inkCanvas;
	WILL.setColor(Color.fromHex(this.config.will.color));
	WILL.type = "raster";
	await WILL.setTool(this.config.will.tool);
  }
  
  async deleteInkCanvas() {
	  await BrushPalette.delete();
	  await window.WILL.delete();
	  window.WILL = null;	
  }  

  fitTextOnCanvas(context, text, bounds, fontface){    

    // start with a large font size
    let fontsize=300;
	let metrics;
    
    // lower the font size until the text fits the canvas
    do{
        fontsize--;
        context.font=fontsize+"px "+fontface;		
		metrics = context.measureText(text);
    }while(metrics.width>bounds.width || (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent)>bounds.height)

	return fontsize;

  } 

  draw(phase, point) {
      switch (phase) {
		  case "begin" : window.WILL.begin(point); break;
		  case "move"  : window.WILL.move(point); break;
		  case "end"   : window.WILL.end(point); break;
	  }
  }	  
  
  onDown(event) {	  
      if (this.currentEventType) return; //to avoid multitouch
	  if (event.buttons != 1) return;
	  
	  switch (event.pointerType) {
	      case "mouse" : if (!this.config.source.mouse) return; break;
		  case "touch" : if (!this.config.source.touch) return; break;
		  case "pen"   : if (!this.config.source.pen) return; break;
		  case "stu"   : if (!this.config.source.stu) return; break;
	  }
	  
	  
	  this.currentEventType = event.pointerType;	
	  
	  let pointerType = event.pointerType;
	  let pressure = event.pressure;
	  if (event.pointerType == "touch") {
		  pointerType = "mouse";
		  pressure = 0;
	  }
	  
	  let time = Math.floor(event.timeStamp);	  
      const downEvent = new PointerEvent("pointerdown", {
			                   pointerId: 1,
                               pointerType: pointerType,							   
                               isPrimary: true,	
                               pressure: pressure							   
                             });  	  
		
      downEvent.timestamp = time;
	  window.WILL.begin(InkBuilder.createPoint(downEvent, {x:event.offsetX, y:event.offsetY}));
	  
	  var point = {
		    'type': 'down',
            'x': event.offsetX > 0 ? event.offsetX : 0,
            'y': event.offsetY > 0 ? event.offsetY : 0,
            'p': pressure,
            't': time,
			'tilt': event.tiltX,
			'twist': event.tiltY,
            'isDown': true,
            'stroke_id': this.currentStrokeID
      };
      this.capturedPoints.push(point);
  }
  
  onMove(event) {
	  //if ((event.buttons != 1) || (event.pointerType != this.currentEventType)) return;
	  if (event.pointerType != this.currentEventType) return;	 
	  
	  switch (event.pointerType) {
	      case "mouse" : if (!this.config.source.mouse) return; break;
		  case "touch" : if (!this.config.source.touch) return; break;
		  case "pen"   : if (!this.config.source.pen) return; break;
		  case "stu"   : if (!this.config.source.stu) return; break;
	  }
	  
	  let pointerType = "pointermove";
	  
	  let toolType = event.pointerType;
	  let pressure = event.pressure;
	  if (event.pointerType == "touch") {
		  toolType = "mouse";
		  pressure = 0;
	  }
	  
	  if (event.offsetX > this.willCanvas.width || 
	      event.offsetY > this.willCanvas.height ||
		  event.offsetX < 0 ||
		  event.offsetY < 0) {
			  
		  if (this.isOut) {
			  return;
		  }
		  this.isOut = true;
		  pointerType = "pointerup";
	  } else {
		  if (this.isOut) {
			  pointerType = "pointerdown";
		      this.isOut = false;
		  }
	  }
	  
	  let time = Math.floor(event.timeStamp);	  
	  const moveEvent = new PointerEvent(pointerType, {
			                   pointerId: 1,
                               pointerType: toolType,
                               isPrimary: true,
							   pressure: pressure
                             });							

	  moveEvent.timestamp = time;
	  let pointType = "move";
	  /*switch (pointerType) {
	      case "pointermove" : window.WILL.move(InkBuilder.createPoint(moveEvent, {x:event.offsetX, y:event.offsetY}));  pointType="move"; break;
		  case "pointerup" : window.WILL.end(InkBuilder.createPoint(moveEvent, {x:event.offsetX, y:event.offsetY}));  pointType="up"; break;
		  case "pointerdown" : window.WILL.begin(InkBuilder.createPoint(moveEvent, {x:event.offsetX, y:event.offsetY}));  pointType="down"; break;
	  }*/
	  
	  window.WILL.move(InkBuilder.createPoint(moveEvent, {x:event.offsetX, y:event.offsetY}));
	  
	  var point = {
		    'type': pointType,
            'x': event.offsetX > 0 ? event.offsetX : 0,
            'y': event.offsetY > 0 ? event.offsetY : 0,
            'p': pressure,
            't': time,
			'tilt': event.tiltX,
			'twist': event.tiltY,
            'isDown': event.buttons == 1 && !this.isOut,
            'stroke_id': this.currentStrokeID
      };
	  	  
	  if (this.capturedPoints.length == 0) {
		  this.capturedPoints.push(point);
	  } else if (this.capturedPoints[this.capturedPoints.length - 1].t < time) {
		  // on firefox sometimes there is old event.
          this.capturedPoints.push(point);
	  }		  	  
  }
  
  onUp(event) {
	  if (event.pointerType != this.currentEventType) return;
	  
	  switch (event.pointerType) {
	      case "mouse" : if (!this.config.source.mouse) return; break;
		  case "touch" : if (!this.config.source.touch) return; break;
		  case "pen"   : if (!this.config.source.pen) return; break;
		  case "stu"   : if (!this.config.source.stu) return; break;
	  }
	  
	  let pointerType = event.pointerType;
	  let pressure = event.pressure;
	  if (event.pointerType == "touch") {
		  pointerType = "mouse";
		  pressure = 0;
	  }
	  
	  let time = Math.floor(event.timeStamp);	  
	  const upEvent = new PointerEvent("pointerup", {
			                   pointerId: 1,
                               pointerType: pointerType,
							   pressure: pressure,
                               isPrimary: true
                             });
	  upEvent.timestamp = time;
	  window.WILL.end(InkBuilder.createPoint(upEvent, {x:event.offsetX, y:event.offsetY}));
	  this.currentEventType = null;
	  
	  var point = {
		    'type': 'up',
            'x': event.offsetX > 0 ? event.offsetX : 0,
            'y': event.offsetY > 0 ? event.offsetY : 0,
            'p': pressure, 
            't': time,
			'tilt': event.tiltX,
			'twist': event.tiltY,
            'isDown': false,
            'stroke_id': this.currentStrokeID
      };
      this.capturedPoints.push(point);	  
  }  
  
   /**
	 * Generate the signature from the raw data.
	 **/
    async getCaptureData() {
	    //Create Stroke Data
        let strokeVector = new Module.StrokeVector();
        let currentStroke = new Module.PointVector();

        let currentStrokeID = 0;
        let isDown = true;
	    let hasDown = false;
		let hasTilt = false;
		let hasTwist = false;
		let hasPressure = false;
		
		for (let index = 0; index < this.capturedPoints.length; index++) {
			if (this.capturedPoints[index].p > 0 && this.capturedPoints[index].p != 0.5) {
				hasPressure = true;
			}
		}

        for (let index = 0; index < this.capturedPoints.length; index++) {
		    if (!this.capturedPoints[index].isDown && !hasDown) {
				// the signature starts with the first pen down, so the hover
				// points before first down are ingnored.
			    continue;
		    }
		
		    hasDown = true;
		
            if ((isDown && !this.capturedPoints[index].isDown) || (!isDown && this.capturedPoints[index].isDown)) {			
                isDown = this.capturedPoints[index].isDown;
                //Move the current stroke data into the strokes array
                strokeVector.push_back({'points': currentStroke});
                currentStroke.delete();
                currentStroke = new Module.PointVector();
                currentStrokeID++;
            }	
			
			if (this.capturedPoints[index].tilt) {
				hasTilt = true;
				if (this.capturedPoints[index].tilt < 0) {
					this.capturedPoints[index].tilt += 360;
				}
				this.capturedPoints[index].tilt = Math.floor(this.capturedPoints[index].tilt*1000);				
			}
			
			if (this.capturedPoints[index].twist) {
				hasTwist = true;
				if (this.capturedPoints[index].twist < 0) {
					this.capturedPoints[index].twist += 360;
				}
				this.capturedPoints[index].twist = Math.floor(this.capturedPoints[index].twist*1000);
			}
			
            var point = {
                'x': Math.floor(this.capturedPoints[index].x),
                'y': Math.floor(this.capturedPoints[index].y),
                'p': hasPressure ? Math.floor(this.capturedPoints[index].p*1000) : 0,
                't': this.capturedPoints[index].t,
			    'tilt': this.capturedPoints[index].tilt,
			    'twist': this.capturedPoints[index].twist,			
                'is_down': (this.capturedPoints[index].type == "down" || this.capturedPoints[index].type == "move"),
                'stroke_id': currentStrokeID
            };
			
			//console.log(JSON.stringify(point));
		
            currentStroke.push_back(point);	
			
        }		
	
	    //Create capture area character
        var device = {
            'device_max_X': this.canvas.width,
            'device_max_Y': this.canvas.height,
            'device_max_P': 1000,
            'device_pixels_per_m_x': Math.trunc(this.mmToPx(1000)),
		    'device_pixels_per_m_y': Math.trunc(this.mmToPx(1000)),
            'device_origin_X': 0,
            'device_origin_Y': 1,
			'has_tilt': hasTilt,
			'has_twist': hasTwist
        }	

        var digitizerInfo = "Javascript-Demo";
        var nicInfo = "";
        var timeResolution = 1000;
		var where = "";
	
        await this.sigObj.generateSignature(this.signatory, this.reason, where, this.integrityType, this.documentHash, strokeVector, device, digitizerInfo, nicInfo, timeResolution);
		
		// put the extra data
		if (this.extraData) {
		    for (const data of this.extraData) {
		        this.sigObj.setExtraData(data.name, data.value);
		    }
		}			    
	
        strokeVector.delete();
        currentStroke.delete();
    }
	
	mmToPx(mm){
	    var dpr = window.devicePixelRatio;
        var inch = 25.4; //1inch = 25.4 mm
        var ppi = 96;	
        return ((mm/inch)*ppi)/dpr;
    }
	
	drawEvaluationString(evaluationString, context, width, height, useColor) {
		evaluationString = " "+evaluationString+" ";
        // get the hypotenuse, as we are going to write the text in diagonal
	    const hypotenuse = Math.sqrt(width*width + height*height);

        // then get the desire text size
        let testTextSize = 300.0;    
        context.font = "300px verdana";
		let textMetrics = context.measureText(evaluationString);
	    let desiredTextSize = (testTextSize * hypotenuse / textMetrics.width);

        // we need to reduce this text according to the height size
        context.font = desiredTextSize+"px verdana";
        textMetrics = context.measureText(evaluationString);   

        // find the rotation angle
        const angle = Math.atan(height/width);
    
        // get the new width taking on account the height
	    const newWidth = hypotenuse - ((textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent) * Math.cos(-angle));

        // Calculate the desired size as a proportion of our testTextSize.
        desiredTextSize = desiredTextSize * newWidth / textMetrics.width;
        context.font = desiredTextSize+"px verdana";
        textMetrics = context.measureText(evaluationString);   

        context.save();
        context.fillStyle = useColor ? "LightGray" : "#000000";		
        context.translate(width/2, height/2);		
        context.rotate(-angle);
        context.fillText(evaluationString, -textMetrics.width/2, (textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent)/2);
        context.restore();
    }
	
}
