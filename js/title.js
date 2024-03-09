const title = document.getElementById('titleText');
const titleCursor = document.getElementById('titleCursor');

let targetTitle = 'News';

function setTitleAnimationState(state) {
	titleAnimationState = state;
	titleCursor.style.display = state === 'paused' ? 'none' : 'inline-block';
}

let titleAnimationState = 'paused';
let titleInterval;
function setTitle(category) {
	if (currentCategory === category) return;

	targetTitle = categories[category].title;

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
