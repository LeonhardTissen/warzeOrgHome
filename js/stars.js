const stars = [];

const cvs = document.getElementById('stars');
const ctx = cvs.getContext('2d');

class Star {
	constructor() {
		this.x = Math.random() * cvs.width;
		this.y = Math.random() * cvs.height;
		this.size = Math.random() * 1 + 1;
		this.xvel = (Math.random() - 0.5) * 0.2;
		this.yvel = (Math.random() - 0.5) * 0.2;
		const r = 225 + Math.random() * 30;
		const g = 225 + Math.random() * 30;
		const b = 225 + Math.random() * 30;
		const alpha = Math.random();
		this.alpha = alpha;
		this.color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		//ctx.fillStyle = this.color;
		ctx.globalAlpha = this.alpha;
		ctx.fill();
		ctx.globalAlpha = 1;

	}

	update() {
		this.x += this.xvel;
		this.y += this.yvel;

		// Wrap around edges
		if (this.x < 0) {
			this.x = cvs.width;
		}
		if (this.x > cvs.width) {
			this.x = 0;
		}
		if (this.y < 0) {
			this.y = cvs.height;
		}
		if (this.y > cvs.height) {
			this.y = 0;
		}
	}
}

function initializeStars() {
	stars.length = 0;

	const starCount = Math.floor((cvs.width * cvs.height) / 5000);

	for (let i = 0; i < starCount; i++) {
		stars.push(new Star());
	}
}

function draw() {
	ctx.clearRect(0, 0, cvs.width, cvs.height);

	ctx.fillStyle = 'white';
	stars.forEach((star) => {
		star.draw();
		star.update();
	});

	requestAnimationFrame(draw);
}

draw();

