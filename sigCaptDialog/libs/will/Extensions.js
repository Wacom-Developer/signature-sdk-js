// to maintain the compatibility with old versions of WILL Ink SDK
InkBuilder.createPoint = function(e, props = {}) {
    let point = {
	    x: props.x || e.offsetX || e.clientX,
		y: props.y || e.offsetY || e.clientY,
		z: undefined,
		timestamp: Math.floor(e.timeStamp),
		pressure: undefined,
		radiusX: undefined,
		radiusY: undefined,
		tiltX: undefined,
		tiltY: undefined,
		rotation: undefined
	};

	let pointer = {
		id: undefined,
		type: undefined,
		button: undefined,
		buttons: undefined
	};

	Object.defineProperty(point, "phase", {value: PathProducer.Phase[e.type.replace(/pointer|mouse|touch/g, "").replace(/down|start/, "BEGIN").replace(/move/, "UPDATE").replace(/up|end/, "END")], enumerable: true});

	// TODO: discard property
	Object.defineProperty(point, "force", {get: function() {return this.pressure;}, enumerable: true});

	Object.defineProperty(point, "pointer", {value: pointer, enumerable: true});
	Object.defineProperty(point.pointer, "provider", {get: function() {return InkInputProvider.Type[this.type.toUpperCase()]}, enumerable: true});

	if (e instanceof PointerEvent) {
		pointer.id = e.pointerId;
		pointer.type = e.pointerType;

		if (e.pointerType == "pen" || e.pointerType == "mouse") {
			pointer.button = e.button;
			pointer.buttons = e.buttons;
		}

		if (e.pointerType == "pen" || e.pointerType == "touch") {
			// if ((eventType == "pointerdown" && e.twist > 0) || eventType != "pointerdown")
			if (e.twist > 0)
				point.rotation = Math.toRadians(e.twist);
		}

		if (e.pointerType == "pen") {
			point.pressure = e.pressure;
			point.tiltX = e.tiltX;
			point.tiltY = e.tiltY;
		}
		else if (e.pointerType == "touch") {
			if (e.pressure > 0)
				point.pressure = e.pressure;
		}
	}
	else if (e instanceof MouseEvent) {
		pointer.type = "mouse";
		pointer.button = e.button;
		pointer.buttons = e.buttons;
	}
	else if (e instanceof TouchEvent) {
		if (!("touchID" in props)) throw new Error("props.touchID is required for touch event");

		e = Array.from(e.changedTouches).filter(touch => touch.identifier == props.touchID).first;
		if (!e) return null;

		if (!point.x) point.x = e.offsetX || e.clientX;
		if (!point.y) point.y = e.offsetY || e.clientY;

		pointer.id = e.identifier;
		pointer.type = "touch";

		if (e.force > 0) {
			// if ((eventType == "touchstart" && e.force !== 0.5) || eventType != "touchstart")
			// sensors which are not able to provide force provides default value 0.5
			if (e.force !== 0.5)
				point.pressure = e.force;
		}

		// sensors which are not able to provide radius provides default values,
		// Windows - 25, Android - 1, for radiusX and radiusY
		if (e.radiusX > 0 && e.radiusY > 0 && e.radiusX != e.radiusY) {
			point.radiusX = e.radiusX;
			point.radiusY = e.radiusY;
		}

		// if ((eventType == "touchstart" && e.rotationAngle > 0) || eventType != "touchstart")
		// sensors which are not able to provide rotationAngle provides default value 0
		if (e.rotationAngle > 0)
			point.rotation = Math.toRadians(e.rotationAngle);
	}
	else
		throw new Error(`Unexpected event detected: ${e.constructor.name}. Expected event should be instance of PointerEvent, MouseEvent or TouchEvent.`);

	return point;
}

Color.fromHex = function(hex) {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return Color.fromColor([(c>>16)&255, (c>>8)&255, c&255]);
    }
    throw new Error('Bad Hex');
}