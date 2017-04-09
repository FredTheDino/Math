let init = function() {
	let Canvas = function(width, height) {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");

		this.width = width || 300;
		this.height = height || 400;

		this.defaultColor = "#000";

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.setWidth = function(width) {
			this.width = width;
			this.canvas.width = width;
		}

		this.setHeight = function(height) {
			this.height = height;
			this.canvas.height = height;
		}

		this.line = function(p1, p2, color) {
			this.context.strokestyle = color || this.defaultColor;
			this.context.beginPath();
			this.context.moveTo(p1.x, p1.y);
			this.context.lineTo(p2.x, p2.y);
			this.context.stroke();
		}

		this.clear = function() {
			this.context.clearRect(0, 0, this.width, this.height);
		}
		document.getElementsByTagName("body")[0].appendChild(this.canvas);
	}

	let Point = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;

		this.add = function(p) {
			return new Point(this.x + p.x, this.y + p.y);
		}

		this.sub = function(p) {
			return new Point(this.x - p.x, this.y - p.y);
		}

		// Radians
		this.rotate = function(angle) {
			angle += Math.PI * 0.5;
			let x = this.x * Math.sin(angle) + this.y * Math.cos(angle);
			let y = this.x * Math.cos(angle) - this.y * Math.sin(angle);

			return new Point(x, y);
		}

		this.scale = function(scaler) {
			let x = this.x * scaler;
			let y = this.y * scaler;
			
			return new Point(x, y);
		}

		this.randomize = function(alpha, beta, min, max) {
			let rotation = Math.random() * (beta - alpha) + alpha;
			let length = Math.random() * (max - min) + min;

			return new Point(0, length).rotate(rotation);
		}
	}

	let Timer = function() {
		this.delta = 0;
		this.lastTime = (new Date()).valueOf();

		this.updateDelta = function() {
			var newTime = (new Date()).valueOf();
			this.delta = newTime - this.lastTime;
			this.lastTime = newTime;

			return delta;
		}
	}

	let Slider = function(min, max, step, val, onchange) {
		this.slider = document.createElement("input");
		this.slider.type = "range";
		this.slider.min = min || 0;
		this.slider.max = max || 1;
		this.slider.step = step || 0.1;
		this.slider.value = val || 0.5;
	
		this.slider.onchange = function(e) {
			onchange(this.value);	
		};
		
		document.getElementsByTagName("body")[0].appendChild(this.slider);
	}	


	let c = new Canvas(0, 0);

	let done = false;
	let numChildren = 4;
	let maxRecursion = 7;

	let childSlider = new Slider(2, 9, 1, numChildren, function(v) {
		numChildren = v;
		draw();
	});

	let draw = function() {
		let w = 2000;
		let h = 1000;
		c.setWidth(w);
		c.setHeight(h);
		c.clear();
		drawBranch(new Point(w / 2, h), h * lengthScale, 0, numChildren, 0);
	}

	let lengthScale = 0.5;
	let angleSpread = 1.5 * Math.PI;


	let angleSpreadSlider = new Slider(0, 2 * Math.PI + 0.1, Math.PI * 0.05, angleSpread, function(v) {
		angleSpread = v;
		draw();
	});

	let drawBranch = function(start, length, angle, children, depth) {
		if (maxRecursion == depth) {
			return;
		}
		
		let direction = new Point(0, length);
		direction = direction.rotate(angle);
		let end = start.add(direction);
		c.line(start, end);

		let childDeltaAngle = angleSpread / (children - 1);
		let startAngle = angle - angleSpread * 0.5;
		let childAngle = startAngle;

		for (let i = 0; i < children; i++) {
			drawBranch(end, length * lengthScale, childAngle, children, depth + 1);
			childAngle += childDeltaAngle;
		}
	}

	let loop = function() {
		console.log("loop!");
	
		if (running)
			window.requestAnimationFrame(loop);
	}

	draw();
	//loop();
}

let running = true;
