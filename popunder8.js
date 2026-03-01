(function () {
    'use strict';

    function getRandomDelay() {
        return Math.floor(Math.random() * 10000) + 1000; // 1–10 sec
    }

    function scrollSmoothly(durationMs = 2000) {
        const target = document.body.scrollHeight - window.innerHeight;
        const start = window.pageYOffset;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const ease = progress * (2 - progress); // ease‑out
            const position = start + (target - start) * ease;

            window.scrollTo(0, position);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    // Page par kahin bhi random click simulate kare
    function clickAnywhere() {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);

        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        document.elementFromPoint(x, y)?.dispatchEvent(event);
    }

    function scheduleScrollAndClick() {
        const delay = getRandomDelay();
        setTimeout(() => {
            scrollSmoothly();
            clickAnywhere(); // yahan page par kahin bhi click ho jata hai
            scheduleScrollAndClick();
        }, delay);
    }

    scheduleScrollAndClick();

})();