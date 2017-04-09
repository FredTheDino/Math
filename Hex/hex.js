window.onload = function() {
	canvas = new ed.Canvas(w, h);

	document.addEventListener("keyup", (event) => {
		const key = event.key;

		updateInput(key, false);

	}, false);

	document.addEventListener("keydown", (event) => {
		const key = event.key;

		updateInput(key, true);
		
	}, true);

	loop();
}

function updateInput(key, pressed) {
	switch (key) {
		case "ArrowLeft":
			input.left = pressed;
			break;
		case "ArrowRight":
			input.right = pressed;
			break;
		case "c":
			input.reset = pressed;
			break;
		case "r":
			input.random = pressed;
			break;
		case "a":
			input.animate = pressed;
			break;
		case "s":
			input.stop = pressed;
			break;
		case "Shift":
			input.slow = pressed;
			break;
		default:
			break;
	}
}

let input = {left: false, right: false, reset: false, random: false, animate: false, stop: false, slow: false};

let canvas;

let w = window.innerWidth;
let h = window.innerHeight;

let colors = ["red", "purple", "blue", "green", "yellow", "orange"];
//let colors = ["red", "black", "blue", "black", "greeb", "black"];

let old;
let next;
let direction;
let angle;

let max = Math.PI;
let maxItterations = 500;
let t = 0;
let deltaAngle = 0; 
let lastDeltaAngle = 1;

let animating = false;

function calculate() {
	t %= 2;
	deltaAngle = ((Math.cos(t*2*Math.PI) * 0.5) + 0.5) * max;
}

function loop() {
	if (input.animate) {
		animating = true;
	} else if (input.stop) {
		animating = false;
	}

	if (animating) {
		t += Math.PI / 10000;
	}
	if (input.left) {
		t -= (Math.PI / 1000) * (input.slow ? 0.01 : 1);
	}
	if (input.right) {
		t += (Math.PI / 1000) * (input.slow ? 0.01 : 1);
	}
	if (input.reset) {
		t = 0;
	}
	if (input.random) {
		t = Math.random() * max;
		input.random = false;
	}

	calculate();
	if (lastDeltaAngle != deltaAngle) {
		draw();
		lastDeltaAngle = deltaAngle;
	}

	window.requestAnimationFrame(loop);
}

function draw() {
	canvas.rect(new ed.Point(0, 0), canvas.max, "#000");
	angle = 0;
	
	old = new ed.Point(canvas.width / 2, canvas.height / 2);
	next = new ed.Point(canvas.width / 2, canvas.height / 2);
	direction = new ed.Point(1, 0);

	for (let i = 1; i < maxItterations; i++) {
		old = next.clone();
		next = old.add(direction.rotate(angle).scale(i));
		thickness = i / 100 + 1;
		canvas.line(old, next, colors[i % colors.length], thickness);
		angle += deltaAngle;
	}
}
