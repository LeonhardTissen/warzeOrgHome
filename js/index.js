const background = document.getElementById('background');
const earth = document.getElementById('earthContainer');
const earthSunglasses = document.getElementById('earthSunglasses');

const underline = document.getElementById('navUnderline');

const colorAffectedElements = [background, earth];

let currentCategory = 'news';

const categoryColors = {
	wartos: {
		hueShift: 140,
		color: 'rgb(255, 20, 20)',
	},
	news: {
		hueShift: 110,
		color: '#FF38A5',
	},
	projects: {
		hueShift: 80,
		color: 'rgb(255, 20, 255)',
	},
	aboutme: {
		hueShift: 0,
		color: '#449eff',
	}
}

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
	const { hueShift, color } = categoryColors[category];
	colorAffectedElements.forEach((element) => {
		element.style.filter = `hue-rotate(${hueShift}deg)`;
	});
	document.documentElement.style.setProperty('--highlight', color);
	
	if (category !== currentCategory) {
		hideCategory(currentCategory);
		showCategory(category);
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
selectCategory('news');
moveUnderlineToElement(document.getElementById('selectedCategory'));
