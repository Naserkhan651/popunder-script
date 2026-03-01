(function () {
    'use strict';

    // 5–10 second ka random delay (ms)
    function getRandomDelay() {
        return Math.floor(Math.random() * 5000) + 5000; // 5000–10000
    }

    // Tumhara image URL
    const YOUR_IMAGE_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtMz_e9my8D7LOlJ2oVROjuBJvZXkxWFgYb2waXz6TTDKUffk3xgMLJl0BGVVdL0oDh8znEl43AfhtnDJ39kIhHRF67ndvSvVpIGLm1ehnnQiT9se_d8dfHnSQQYysz8q4_NTnDLbe_St8jKCmJaGqRkWt2Cj88xih6dRhAdRB1Gq-tJLtipqqwKYr_ak/s1410/vector-download-download-button-illustration-data.jpg'; // ← yahan apna image URL daalo

    // Page ke sab images check karo, uss URL wali image ko select karo
    function findImageByUrl(url) {
        const images = document.querySelectorAll('img');
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            // compare normalized URLs (full src)
            if (img.src === url) {
                return img;
            }
        }
        return null;
    }

    // Natural click (mouse move, mousedown, mouseup, click)
    function naturalClickOnImage(img) {
        const rect = img.getBoundingClientRect();
        if (!rect || rect.width === 0 || rect.height === 0) return;

        // Image ke andar center ke aas‑paas random point
        const x = rect.left + rect.width * 0.4 + Math.random() * rect.width * 0.2;
        const y = rect.top  + rect.height * 0.4 + Math.random() * rect.height * 0.2;

        // 1. Mouse move
        const mouseMove = new MouseEvent('mousemove', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        img.dispatchEvent(mouseMove);

        // 2. Mouse down
        const mouseDown = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        img.dispatchEvent(mouseDown);

        // 3. Mouse up + click (thoda delay jaise real finger)
        setTimeout(() => {
            const mouseUp = new MouseEvent('mouseup', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            img.dispatchEvent(mouseUp);

            const click = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            img.dispatchEvent(click);
        }, 50 + Math.random() * 100); // 50–150 ms
    }

    // 5–10 sec delay ke baad natural click (repeat)
    function scheduleNaturalClick() {
        const img = findImageByUrl(YOUR_IMAGE_URL);
        if (!img) {
            setTimeout(scheduleNaturalClick, 1000);
            return;
        }

        naturalClickOnImage(img);

        // Next click 5–10 sec baad
        setTimeout(scheduleNaturalClick, getRandomDelay());
    }

    // DOM load ho jaye then start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleNaturalClick);
    } else {
        scheduleNaturalClick();
    }

})();