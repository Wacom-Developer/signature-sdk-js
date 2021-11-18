class DataModel {
	constructor() {
		this.inkModel = new InkModel();		
		//this.repository = new DataRepository();
		this.manipulationsContext = new SpatialContext();
	}

	add(stroke) {
		this.manipulationsContext.add(stroke);
		return this.inkModel.addPath(stroke);
	}

	update(intersected, selected = []) {
		let split = this.manipulationsContext.update(intersected);

		split.intersected.forEach(intersection => {
			if (intersection.strokes.length == 0)
				this.remove(intersection.stroke);
			else
				this.inkModel.replacePath(intersection.stroke, intersection.strokes);
		});

		let strokes = this.getStrokes(selected);
		strokes.forEach(stroke => (split.dirtyArea = stroke.bounds.union(split.dirtyArea)));

		this.remove(...strokes);

		return split;
	}

	replace(stroke, strokes, intervals, holes) {
		this.inkModel.replacePath(stroke, strokes);
		this.manipulationsContext.replace(stroke, strokes, intervals, holes);
	}

	transform(stroke, mat) {
		stroke.transform(mat);

		this.manipulationsContext.reload(stroke);
	}

	remove(...strokes) {
		strokes.forEach(stroke => {
			this.manipulationsContext.remove(stroke);
			this.inkModel.removePath(stroke);
		});
	}

	getStrokes(strokeIDs) {
		return strokeIDs.map(strokeID => this.inkModel.getItem(strokeID));
	}

	importModel(inkModel) {
		inkModel.brushes.forEach(brush => {
			this.repository.register(brush.name, brush);
		});

		inkModel.strokes.forEach(stroke => {
			this.manipulationsContext.add(stroke);
		});
	}

	importBrush(brush) {
		this.repository.register(brush.name, brush);
	}

	getBrush(name) {
		return this.repository.getItem(name);
	}

	reset(inkModel) {
		this.inkModel = inkModel || new InkModel();
		this.manipulationsContext.reset();

		if (inkModel)
			this.importModel(inkModel);
	}
}
