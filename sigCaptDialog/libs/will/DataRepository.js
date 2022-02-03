class DataRepository extends URIResolver {
	constructor() {
		super();
	}

	init() {
		Object.values(BrushPalette).filter(v => (typeof v != "function")).forEach(brush => {
			this.register(brush.name, brush);
		});

		this.register("will://generic/action-resolve/RandomInt", DataRepository.randomInt);

		Object.getOwnPropertyNames(ValueTransformer).filter(name => typeof ValueTransformer[name] == "function").forEach(name => {
			this.register(`will://generic/action-remap/${DataRepository.upperFirstLetter(name)}`, ValueTransformer[name].bind(ValueTransformer));
		});
	}

	static upperFirstLetter(s) {
		return s.substring(0, 1).toUpperCase() + s.substring(1);
	}

	static randomInt(current, previous, next, min = 0, max = 255) {
		return Math.randomInt(min, max);
	}
}
