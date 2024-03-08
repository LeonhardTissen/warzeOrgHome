const title = document.getElementById('titleText');
const titleCursor = document.getElementById('titleCursor');

const titleNames = {
	'news': 'News',
	'wartos': 'WartOS',
	'projects': 'Projects',
	'aboutme': 'About Me'
}

let targetTitle = 'News';

function setTitleAnimationState(state) {
	titleAnimationState = state;
	titleCursor.style.display = state === 'paused' ? 'none' : 'inline-block';
}

let titleAnimationState = 'paused';
let titleInterval;
function setTitle(category) {
	if (currentCategory === category) return;

	targetTitle = titleNames[category];

	setTitleAnimationState('deleting');

	clearInterval(titleInterval);

	titleInterval = setInterval(function () {
		switch (titleAnimationState) {
			case 'deleting':
				if (title.textContent.length > 0) {
					title.textContent = title.textContent.slice(0, -1);
				} else {
					setTitleAnimationState('writing');
				}
				break;
			case 'writing':
				if (title.textContent.length < targetTitle.length) {
					title.textContent += targetTitle[title.textContent.length];
				} else {
					setTitleAnimationState('paused');
					clearInterval(titleInterval);
				}
				break;
		}
	}, 30);
}
