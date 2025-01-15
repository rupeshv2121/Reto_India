const resNav = document.querySelector('.res-nav');
const navContainer = document.querySelector('.nav-container');
const closeNav = document.querySelector('.close-nav');
const navGroup = document.querySelector('.nav-group ul');

// Toggle the mobile menu
resNav.addEventListener('click', () => {
    navContainer.classList.toggle('open');
    navGroup.classList.toggle('open');
});

// Close the menu when clicking on the cross icon
closeNav.addEventListener('click', () => {
    navContainer.classList.remove('open');
    navGroup.classList.remove('open');
});

