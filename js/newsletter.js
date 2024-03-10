const newsletterContainer = document.getElementById('newsletter');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterButton = document.getElementById('newsletterSubscribe');
const newsletterClose = document.getElementById('newsletterClose');

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function subscribe() {
	const email = newsletterEmail.value;

	if (!email) {
		alert('Please enter your email');
		return;
	}

	if (!validateEmail(email)) {
		alert('Please enter a valid email');
		return;
	}

	fetch(`https://warze.org/newsletter?email=${email}&action=subscribe`).then((response) => {
		if (response.status === 200) {
			alert('You have been subscribed to our newsletter');

			closeNewsletter();
		} else {
			alert('There was an error subscribing to our newsletter');
		}
	});
}

function closeNewsletter() {
	newsletterContainer.remove();
}

newsletterButton.addEventListener('click', subscribe);

newsletterEmail.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		subscribe();
	}
});

newsletterClose.addEventListener('click', closeNewsletter);
