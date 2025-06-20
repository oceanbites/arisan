window.addEventListener('load', function () {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const mainContent = document.getElementById('mainContent');

        preloader.classList.add('hidden');
        setTimeout(() => {
            mainContent.classList.add('visible');
            generateCalendar();
        }, 300);
    }, 1500); 
});
