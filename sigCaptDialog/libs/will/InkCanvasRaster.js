class InkCanvasRaster extends InkCanvas {
	constructor(canvas, width, height) {
		super();
		
		this.canvas = InkCanvasGL.createInstance(canvas, width, height);
		this.strokesLayer = this.canvas.createLayer();
		
		this.strokeRenderer = new StrokeRendererGL(this.canvas);	
		
		this.bounds = Rect.create(0, 0, width, height);
	}
	
	delete() {
		this.strokeRenderer.delete();
		this.canvas.delete();		
	}
	
	toImage(rect, mimeType) {
		let canvas = document.createElement("canvas");
		let context = canvas.getContext("2d");

		canvas.width = rect.width;
		canvas.height = rect.height;

		let pixels = this.strokesLayer.readPixels(rect);

		// Copy the pixels to a 2D canvas
		let imageData = context.createImageData(rect.width, rect.height);
		imageData.data.set(pixels);
		context.putImageData(imageData, 0, 0);
		
		return canvas.toDataURL(mimeType);
	}
		
}
