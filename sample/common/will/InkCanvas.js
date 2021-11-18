class InkCanvas extends InkController {
	constructor() {
		super();

		this.builder = new InkBuilder();

		this.builder.configure({onBuildComplete: (pathPart) => {
			if (this.intersector)
				this.erase(pathPart);
			else if (this.selector)
				this.select(pathPart);
			else
				this.draw(pathPart);
		}});

		this.dataModel = new DataModel();
		Object.defineProperty(this, "strokes", {get: () => this.dataModel.inkModel.content, enumerable: true});

		this.codec = new InkCodec();
	}

	init(device, toolID, color) {
		this.device = device;
		this.builder.device = device;

		this.setTool(toolID);
		this.setColor(color);
	}

	setTool(toolID) {
		this.toolID = toolID;

		if (this.toolID == "basic") {
			this.device = this.builder.device;
			this.builder.device = null;
		}
		else
			this.builder.device = this.device;

		this.intersector = config.tools[toolID].intersector;
		this.selector = config.tools[toolID].selector;
	}

	setColor(color) {
		this.color = color;
	}

	registerTouches(changedTouches) {
		//if (this.forward) return this.inkCanvasRaster.registerTouches(changedTouches);

		// multi-touch should handle all changedTouches and to assign builders for each other
		if (isNaN(this.builder.touchID))
			this.builder.touchID = changedTouches.item(0).identifier;
	}

	getInkBuilder(changedTouches = []) {
		//if (this.forward) return this.inkCanvasRaster.getInkBuilder(changedTouches);

		if (changedTouches.length > 0 && !Array.from(changedTouches).map(touch => touch.identifier).includes(this.builder.touchID)) return undefined;
		return this.builder;
	}

	reset(sensorPoint) {
		//if (this.forward) return this.inkCanvasRaster.reset(sensorPoint);

		let options = config.getOptions(sensorPoint, this.toolID, this.color);

		this.builder.configure(options.inkBulder);
		this.strokeRenderer.configure(options.strokeRenderer);

		if (this.intersector) {
			this.intersector.reset(this.dataModel.manipulationsContext);

			this.builder.pathProducer.togglePrediction(false);
		}
		else
			this.builder.pathProducer.togglePrediction(true);

		if (this.selector)
			this.selector.reset(this.dataModel.manipulationsContext);
	}
	
	begin(sensorPoint) {
		if (this.forward) console.log("commooorrrr");
		//if (this.forward) return this.inkCanvasRaster.begin(sensorPoint);

		this.reset(sensorPoint);

		this.builder.add(sensorPoint);
		this.builder.build();
	}

	move(sensorPoint) {
		//if (this.forward) return this.inkCanvasRaster.move(sensorPoint);

		/*if (this.requested) {
			this.builder.ignore(sensorPoint);
			return;
		}*/

		this.builder.add(sensorPoint);

		//if (!this.requested) {
			//this.requested = true;

			this.builder.build();

			//requestAnimationFrame(() => (this.requested = false));
		//}
	}

	end(sensorPoint) {
		//if (this.forward) return this.inkCanvasRaster.end(sensorPoint);

		this.builder.add(sensorPoint);
		this.builder.build();
	}

	draw(pathPart) {
		this.drawPath(pathPart);

		if (pathPart.phase == InkBuilder.Phase.END) {
			if (this.strokeRenderer) {
				let stroke = this.strokeRenderer.toStroke(this.builder);
				this.dataModel.add(stroke)
			}
		}
	}

	drawPath(pathPart) {
		this.strokeRenderer.draw(pathPart.added, pathPart.phase == InkBuilder.Phase.END);

		if (pathPart.phase == InkBuilder.Phase.UPDATE) {
			this.strokeRenderer.drawPreliminary(pathPart.predicted);

			let dirtyArea = this.canvas.bounds.intersect(this.strokeRenderer.updatedArea);

			if (dirtyArea) {
				this.canvas.clear(dirtyArea);
				this.canvas.blend(this.strokesLayer, {rect: dirtyArea});

				this.strokeRenderer.blendUpdatedArea();
			}
		}
		else if (pathPart.phase == InkBuilder.Phase.END) {
			let dirtyArea = this.canvas.bounds.intersect(this.strokeRenderer.strokeBounds.union(this.strokeRenderer.updatedArea));

			if (dirtyArea) {
				dirtyArea = dirtyArea.ceil();

				this.strokeRenderer.blendStroke(this.strokesLayer);

				this.canvas.clear(dirtyArea);
				this.canvas.blend(this.strokesLayer, {rect: dirtyArea});
			}
		}
	}

	erase(pathPart) {
		if (this.toolID == "eraserStroke") {
			this.drawPath(pathPart);

			this.intersector.updateSegmentation(pathPart.added);

			if (pathPart.phase == InkBuilder.Phase.END) {
				let intersection = this.intersector.intersect2(this.builder.getInkPath());
				this.split(intersection);

				this.abort();
			}
		}
		else {
			let intersection = this.intersector.intersect(pathPart.added);
// this.drawPath(pathPart);
			this.split(intersection);
		}
	}

	split(intersection) {
		let split = this.dataModel.update(intersection.intersected, intersection.selected);
		let dirtyArea = split.dirtyArea;

		if (dirtyArea)
			this.redraw(dirtyArea);
	}

	select(pathPart) {
		this.drawPath(pathPart);

		this.selector.updateSegmentation(pathPart.added);

		if (pathPart.phase == InkBuilder.Phase.END) {
			let stroke = this.strokeRenderer.toStroke(this.builder);

			this.completeSelect(stroke);
			this.abort();
		}
	}

	completeSelect(stroke) {
		let selection = this.selector.select(stroke);
		let selected = this.dataModel.getStrokes(selection.selected);

		let split = this.dataModel.update(selection.intersected);
		let dirtyArea = split.dirtyArea;

		for (let stroke of selected)
			dirtyArea = stroke.bounds.union(dirtyArea);

		selected.push(...split.selected);

		let color = Color.random();
		for (let stroke of selected) stroke.color = color;

		if (dirtyArea)
			this.redraw(dirtyArea);
	}

	abort() {
		if (!this.builder.phase) return;

		let dirtyArea;

		if (this.strokeRenderer.strokeBounds)
			dirtyArea = this.strokeRenderer.strokeBounds.union(this.strokeRenderer.preliminaryDirtyArea);

		this.strokeRenderer.abort();
		this.builder.abort();

		if (dirtyArea)
			this.refresh(dirtyArea);
	}

	resize() {
		let width = $(".Wrapper").width();
		let height = $(".Wrapper").height() - $("nav").height();

		this.canvas.resize(width, height);

		this.refresh();
	}

	redraw(dirtyArea = this.canvas.bounds) {
		this.strokesLayer.clear(dirtyArea);

		this.strokes.forEach(stroke => {
			if (stroke.bounds.intersect(dirtyArea)) {
				this.strokeRenderer.draw(stroke);
				this.strokeRenderer.blendStroke(this.strokesLayer);
			}
		});

		this.canvas.clear(dirtyArea);
		this.canvas.blend(this.strokesLayer, {rect: dirtyArea});
	}

	refresh(dirtyArea = this.canvas.bounds) {
		this.canvas.clear(dirtyArea);
		this.canvas.blend(this.strokesLayer, {rect: dirtyArea});
	}

	clear() {
		this.strokesLayer.clear();
		this.canvas.clear();

		this.dataModel.reset();
	}

	import(input, type) {
		let reader = new FileReader();

		if (type == "uim")
			reader.onload = (e) => this.openFile(e.target.result);
		else if (type == "tool")
			reader.onload = (e) => this.importTool(e.target.result);
		else
			throw new Error(`Unknown or missing import type - ${type}`);

		reader.readAsArrayBuffer(input.files[0]);

		input.value = "";
	}

	async importTool(buffer) {
    // Decode serialised brush configuration
		let data = this.codec.decodeTool(buffer);
		let error;
		// Check if the brush is either a vector or particle brush
		if (localStorage.getItem("sample") == 1 && data.brush instanceof ParticleBrush)
			error = "Tool data provides raster configuration. Select sample different from this one to use it.";
		if (localStorage.getItem("sample") == 2 && data.brush instanceof PolygonBrush)
			error = "Tool data provides vector configuration. Select sample different from this one to use it.";

		if (error)
			alert(error);
		else {
			let brush = data.brush;

			if (brush instanceof ParticleBrush) {
				let canvas = this.inkCanvasRaster ? this.inkCanvasRaster.canvas : this.canvas;
				await brush.configure(canvas.ctx);
			}

			config.tools.customTool = {
				brush: brush,
				blendMode: data.blendMode,
				dynamics: data.dynamics,
				statics: data.statics
			};

			this.dataModel.importBrush(brush);

			$("#customTool").removeClass("Disabled");
			layout.selectTool("customTool");
		}
	}

	async encode() {
		return await this.codec.encodeInkModel(this.dataModel.inkModel);
	}

	decode(buffer) {
		return this.codec.decodeInkModel(buffer);
	}

	async save() {
		let buffer = await this.encode();
		fsx.saveAs(buffer, "ink.uim", "application/vnd.wacom-ink.model");
	}

	async openFile(buffer) {
		let inkModel = this.codec.decodeInkModel(buffer);

		let error;

		if (localStorage.getItem("sample") == 1 && inkModel.brushes.filter(brush => brush instanceof ParticleBrush).length > 0)
			error = "Ink object provides raster configuration. Select sample different from this one to use it.";

		if (localStorage.getItem("sample") == 2 && inkModel.brushes.filter(brush => brush instanceof PolygonBrush).length > 0)
			error = "Ink object provides vector configuration. Select sample different from this one to use it.";

		if (error) {
			alert(error)
			return;
		}

		this.clear();
		this.dataModel.reset(inkModel);

		let fileStrokeRenderer = new this.strokeRenderer.constructor(this.canvas);
		let brushes = {};

		for (let brush of inkModel.brushes) {
			brushes[brush.name] = brush;

			if (brush instanceof ParticleBrush) {
				let canvas = this.inkCanvasRaster ? this.inkCanvasRaster.canvas : this.canvas;
				await brush.configure(canvas.ctx);
			}
		}

		let brush;
		let dirtyArea;
		let strokeRenderer;

		for (let stroke of inkModel.strokes) {
			brush = brushes[stroke.brush.name];

			if (brush instanceof ParticleBrush && this.inkCanvasRaster)
				strokeRenderer = this.inkCanvasRaster.strokeRenderer;
			else
				strokeRenderer = fileStrokeRenderer;

			strokeRenderer.configure({brush: brush, color: stroke.color});

			strokeRenderer.draw(stroke);
			strokeRenderer.blendStroke(this.strokesLayer);

			dirtyArea = strokeRenderer.strokeBounds.union(dirtyArea);
		}

		this.canvas.clear(dirtyArea);
		this.canvas.blend(this.strokesLayer, {rect: dirtyArea});
	}
}
