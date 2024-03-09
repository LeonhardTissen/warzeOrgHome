const background = document.getElementById('background');
const earth = document.getElementById('earthContainer');
const earthSunglasses = document.getElementById('earthSunglasses');

const underline = document.getElementById('navUnderline');

let currentCategory = 'wartos';
let lastCategorySelection = 0;

function resize() {
	cvs.width = window.innerWidth;
	cvs.height = window.innerHeight;

	initializeStars();
}

resize();

window.addEventListener('resize', resize);

function getSelectedCategoryButton() {
	return document.querySelector('#navBarDesktop .selectedCategory');
}

let underlinedElementPosition = getSelectedCategoryButton().getBoundingClientRect();

function showCategory(category) {
	const categoryElement = document.getElementById(category);
	categoryElement.classList.remove('hidden');
	setTimeout(() => {
		categoryElement.style.opacity = 1;
	}, 10);
}

function hideCategory(category) {
	const categoryElement = document.getElementById(category);
	categoryElement.style.opacity = 0;
	setTimeout(() => {
		categoryElement.classList.add('hidden');
	}, 250);
}

function selectCategory(category) {
	const { hueShift, color } = categories[category];
	earth.style.filter = `hue-rotate(${hueShift}deg)`;
	document.documentElement.style.setProperty('--highlight', color);
	
	if (category !== currentCategory) {
		hideCategory(currentCategory);
		showCategory(category);
		setBackground(category);
	}
	setTitle(category);
	currentCategory = category;

	if (category === 'wartos') {
		earthSunglasses.style.opacity = 1;
		earth.style.filter = `sepia(1) brightness(0.7) saturate(10.5) hue-rotate(-32deg)`;
	} else {
		earthSunglasses.style.opacity = 0;
		earth.style.filter = `hue-rotate(${hueShift}deg)`;
	}
}

function moveUnderlineToElement() {
	const selectedCategoryButton = getSelectedCategoryButton();

	if (selectedCategoryButton === null) return;
	
	pos = selectedCategoryButton.getBoundingClientRect();

	underline.style.width = `${pos.width}px`;
	underline.style.left = `${pos.left}px`;
	underline.style.top = `80px`;
}

// Make all categories clickable
document.querySelectorAll('.category').forEach((category) => {
	category.addEventListener('click', (e) => {
		const now = performance.now();
		if (now < lastCategorySelection + 300) return;
		lastCategorySelection = now;

		document.querySelectorAll('.selectedCategory').forEach((category) => {
			category.classList.remove('selectedCategory');
		});

		e.target.classList.add('selectedCategory');

		const newCategory = e.target.dataset.category;

		selectCategory(newCategory);

		moveUnderlineToElement();

		hideMobileNavBarDrawer();
	});
});

// Initial category
selectCategory(currentCategory);
moveUnderlineToElement(document.getElementById('selectedCategory'));

// Hide PC only games if on mobile
if ('ontouchstart' in window) {
	document.querySelectorAll('.pcOnly').forEach((element) => {
		element.remove();
	});
	earth.remove();
}

// Make thumbnails turn into youtube embeds on click
document.querySelectorAll('.thumb').forEach((thumbnail) => {
	thumbnail.addEventListener('click', (e) => {
		console.log(e.target.dataset.video)
		const iframe = document.createElement('iframe');
		iframe.src = `https://www.youtube.com/embed/${e.target.dataset.video}`;
		iframe.frameborder = '0';
		iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
		iframe.allowFullscreen = true;
		e.target.parentElement.replaceChild(iframe, e.target);
	});
});
