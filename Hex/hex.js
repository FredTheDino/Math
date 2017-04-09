window.onload = function() {
	canvas = new ed.Canvas(w, h);
	loop();
}

let canvas;

let w = 1600;
let h = 900;

let colors = ["red", "purple", "blue", "green", "yellow", "orange"];

let old;
let next;
let direction;
let angle;
let min = 0;
let max = Math.PI;
let maxItterations = 500;
let t = 0;
let deltaAngle = 0; 
let error = 0;

function loop() {
	deltaAngle = ((Math.cos(t) * 0.5) + 0.5) * (max - min) + min;
	t = t + Math.PI / 20000;

	draw();

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
		angle += deltaAngle - error;
	}
}
