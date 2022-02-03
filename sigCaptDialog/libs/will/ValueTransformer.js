class ValueTransformer {
	static power(v, p, reverse) {
		if (reverse) v = this.reverse(v);
		return v ** p
	}

	static periodic(v, p, reverse) {
		if (reverse) v = this.reverse(v);
		return 0.5 - 0.5 * Math.cos(p * Math.PI * v);
	}

	static sigmoid(v, p, reverse, minValue = 0, maxValue = 1) {
		if (reverse) v = this.reverse(v);

		let sigmoid = (t, k) => (1 + k) * t / (Math.abs(t) + k);

		let middle = (maxValue + minValue) * 0.5;
		let halfInterval = (maxValue - minValue) * 0.5;
		let t = (v - middle) / halfInterval;
		let s = sigmoid(t, p);

		return middle + s * halfInterval;
	}

	static reverse(v) {
		return 1 - v;
	}
}
