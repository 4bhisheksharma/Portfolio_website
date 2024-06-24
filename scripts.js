document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'dark-mode';

    document.body.classList.add(currentTheme + '-mode');
    themeIcon.textContent = currentTheme === 'dark' ? '☀︎' : '☽';

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀︎';
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '☽';
        }
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const header = document.querySelector('header');
//     let timeout = null;

//     // Function to hide header after 3 seconds
//     const hideHeader = () => {
//         header.style.transform = 'translateY(-100%)'; // Move header above viewport
//     };

//     // Reset timeout and show header on mousemove or click
//     const resetTimer = () => {
//         clearTimeout(timeout);
//         header.style.transform = 'translateY(0)';
//         timeout = setTimeout(hideHeader, 2000); // 3000ms = 3 seconds
//     };

//     // Initial setup: Show header and start timer
//     resetTimer();

//     // Reset timer on mousemove or click
//     document.addEventListener('mousemove', resetTimer);
//     document.addEventListener('click', resetTimer);
//     document.addEventListener('touchstart', resetTimer);
// });

document.addEventListener('DOMContentLoaded', function() {
    const hours = new Date().getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Welcome, Good Morning";
    } else if (hours < 18) {
        greeting = "Welcome, Good Afternoon";
    } else {
        greeting = "Welcome, Good Evening";
    }

    let index = 0;
    function type() {
        if (index < greeting.length) {
            document.getElementById('typewriter').innerHTML += greeting.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }

    type();
});








