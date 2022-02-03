let URIBuilder = {
	// host: location.host.split(":").first.split(".").first,
	host: "will3-sdk-for-ink-web-demo",

	// type - raster | vector
	getBrushURI(type, name) {
		return `will://${this.host}/${type}-brush/${name}`;
	},

	// type - shape | fill
	getBrushImageURI(type, name) {
		return `will://${this.host}/raster-brush-${type}/${name}`;
	},

	getBrushPrototypeURI(name, query = "") {
		return `will://${this.host}/vector-brush-shape/${name}${query ? "?" : ""}${query}`;
	},

	// type - remap | resolve
	getActionURI(type, name, query = "") {
		return `will://${this.host}/action-${type}/${name}${query ? "?" : ""}${query}`;
	}
};
