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








