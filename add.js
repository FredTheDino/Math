(function() {
	
	let add = function(a) {
		return function(b) {
			return a + b;
		}
	}

	console.log(add(2)(4));

	let log = function(message) {
		console.log(message);
		return message;
	}

	let setupCanvas = function(id, width, height) {
		let canvas = document.getElementById(id);
		canvas.width = width;
		canvas.height = height;
		let context = canvas.getContext("2d");
		return context;
	}

	let line = function(context, x, y, dx, dy) {

	}

	let ctx = setupCanvas("canvas", 300, 300);	

	log(add(1)(8)(5)(-6)(-7)(-5)(7)(4)(9)());
	log(fib(5));
}());

