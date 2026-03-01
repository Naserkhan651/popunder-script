(function () {
    'use strict';

    // 5–10 second ka random delay (milliseconds)
    function getRandomDelay() {
        return Math.floor(Math.random() * 5000) + 5000; // 5000–10000
    }

    // Kisi image par click karne ka function
    function clickRandomImage() {
        const images = document.querySelectorAll('img');
        if (!images.length) return;

        const randomIndex = Math.floor(Math.random() * images.length);
        const img = images[randomIndex];

        // Simple click trigger
        img.click();

        // Agar onclick event handler differently attach ho, to MouseEvent bhi use kar sakte
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        img.dispatchEvent(event);
    }

    // Lagatar 5–10 second delay se click start kare
    function scheduleImageClick() {
        setTimeout(() => {
            clickRandomImage();
            scheduleImageClick(); // repeat
        }, getRandomDelay());
    }

    // Page load ho jaye ke baad start karo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleImageClick);
    } else {
        scheduleImageClick();
    }

})();