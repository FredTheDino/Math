/*
 * This is a simple little script file which contains
 * some usefull constructs that make it easier to develop
 * inetractive webapps, atleast in my oppintion
 */

let ed = {
	Canvas : function(width, height) {
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
			this.context.strokeStyle = color || this.defaultColor;
			this.context.beginPath();
			this.context.moveTo(p1.x, p1.y);
			this.context.lineTo(p2.x, p2.y);
			this.context.stroke();
		}

		this.pixel = function(p, color) {
			this.context.fillStyle = color || this.defaultColor;
			this.context.strokeStyle = this.context.fillstyle;
			this.context.fillRect(p.x, p.y, 1, 1);
		}

		this.rect = function(start, wh, color) {
			this.context.fillStyle = color || this.defaultColor;
			this.context.fillRect(start.x, start.y, wh.x, wh.y);
		}

		this.clear = function() {
			this.context.clearRect(0, 0, this.width, this.height);
		}
		document.getElementsByTagName("body")[0].appendChild(this.canvas);
	},

	Point : function(x, y) {
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
	},

	Timer : function() {
		this.delta = 0;
		this.lastTime = (new Date()).valueOf();

		this.updateDelta = function() {
			var newTime = (new Date()).valueOf();
			this.delta = newTime - this.lastTime;
			this.lastTime = newTime;

			return delta;
		}
	},

	Slider : function(min, max, step, val, onchange) {
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
}
