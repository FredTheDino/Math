/*
 * This script renders the mandlebroth set in
 * all it's glory
 */

let componentToHex = function(c) {
	let hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

let toHexColor = function(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

window.onload = function() {
	// Generates the heat map pallet
	palletLength = 500;
	pallet = new Array();
	let minHue = 0;
	let maxHue = 300;
	let hueStep = (maxHue - minHue) / (palletLength - 1);
	let h = minHue;
	let s = 0.5;
	let v = 0.75;
	for (let i = 0; i < palletLength; i++) {
		let c = s * v;
		let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		let m = v - c;

		h %= 360;

		let r = 0;
		let g = 0;
		let b = 0;
		if (h < 60) {
			r = c;
			g = x;
		} else if (h < 120) {
			r = x;
			g = c;
		} else if (h < 180) {
			g = c;
			b = x;
		} else if (h < 240) {
			g = x;
			b = c;
		} else if (h < 300) {
			r = x;
			b = c;
		} else {
			r = c;
			b = x;
		}
		r = Math.floor((r + m) * 255);
		g = Math.floor((g + m) * 255);
		b = Math.floor((b + m) * 255);

		pallet[i] = toHexColor(r, g, b);

		h += hueStep;
	}

	// Setupt the canvas

	scale = 1 / 250;
	maxDepth = palletLength;
	canvas = new ed.Canvas(500, 500);

	pallet[palletLength - 1] = "#000000";

	canvas.rect(new ed.Point(0, 0), new ed.Point(canvas.width, canvas.height));

	loop();
}

let pallet;
let palletLength;

let offsetX = -1.5;
let offsetY = -1;

let p = 0;
let step = 1000;
let scale;
let maxDepth;
let canvas;

let loop = function() {
	let nextP = p + step;
	for (; p < nextP && p < canvas.width * canvas.height; p++) {
		let x = p % canvas.width;
		let y = (p - x) / canvas.width;
		let point = new ed.Point(x * scale + offsetX, y * scale + offsetY);
		let i = 0;
		let zr = 0;
		let zi = 0;
		for (; i < maxDepth; i++) {
			let temp_zr = zr * zr - zi * zi + point.x;
			let temp_zi = 2.0 * zr * zi + point.y;
			zr = temp_zr;
			zi = temp_zi;
			if (zr * zr + zi * zi > 4) {
				break;
			}
		}
		canvas.pixel(new ed.Point(x, y), pallet[i]);
	}

	if (p < canvas.width * canvas.height) {
		window.requestAnimationFrame(loop);
	} else {
		console.log("Done!");
	}
}
