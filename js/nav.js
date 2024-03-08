const navBarDrawer = document.getElementById('navBarDrawer');

const navBarLauncher = document.getElementById('navBarLauncher');

function showMobileNavBarDrawer() {
	navBarDrawer.classList.remove('tuckedAway');
}

function hideMobileNavBarDrawer() {
	navBarDrawer.classList.add('tuckedAway');
}

navBarLauncher.addEventListener('click', () => {
	showMobileNavBarDrawer();
});
