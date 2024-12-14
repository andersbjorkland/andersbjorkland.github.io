const textWrappers = document.querySelectorAll('.letter-anim-text');
textWrappers.forEach(function(textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
});

// Add a hover event listener to each nav item
const navItems = document.querySelectorAll('.letter-anim-text-container');
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
