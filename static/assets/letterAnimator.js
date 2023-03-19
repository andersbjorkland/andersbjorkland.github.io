const textWrappers = document.querySelectorAll('nav a .nav-text');
textWrappers.forEach(function(textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
});

// Add a hover event listener to each nav item
const navItems = document.querySelectorAll('nav a');
navItems.forEach(function(navItem) {
    navItem.addEventListener('mouseover', function() {
        // Generate a random angle for each letter on hover
        const letters = navItem.querySelectorAll('.letter');
        letters.forEach(function(letter) {
            const angle = Math.floor(Math.random() * 21) - 10; // A random number between -10 and 10
            letter.style.transform = `rotate(${angle}deg) scale(1.2)`; // Apply the rotation to the letter
        });
    });

    // Add a mouseout event listener to each nav item
    navItem.addEventListener('mouseout', function() {
        // Reset the transform property for each letter on mouseout
        const letters = navItem.querySelectorAll('.letter');
        letters.forEach(function(letter) {
            letter.style.transform = 'none'; // Remove the rotation from the letter
        });
    });
});

const nav = document.querySelector('nav');

const burgerMenu = document.querySelector('.burger');
burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('toggled');

    nav.classList.toggle('toggled');
});