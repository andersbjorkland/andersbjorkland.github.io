
const nav = document.querySelector('nav');

const burgerMenu = document.querySelector('.burger');
burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('toggled');

    nav.classList.toggle('toggled');
});