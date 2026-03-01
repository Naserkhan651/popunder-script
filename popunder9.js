(function () {
    'use strict';

    let canClick = true;

    // 4–7 second ka random delay (milliseconds)
    function getRandomDelay() {
        return Math.floor(Math.random() * 3000) + 4000; // 4000–7000
    }

    // Thori sa smooth scroll up ya down (random)
    function randomScroll() {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        const direction = Math.random() > 0.5 ? 1 : -1;
        const step = Math.floor(Math.random() * 300) + 100; // 100–400 px

        const current = window.pageYOffset;
        const target = Math.max(0, Math.min(maxScroll, current + direction * step));

        const start = current;
        const startTime = Date.now();
        const duration = 800;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress * (2 - progress); // ease‑out
            const position = start + (target - start) * ease;

            window.scrollTo(0, position);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    // Lagatar scroll cycle (bina click ke)
    function scheduleScroll() {
        randomScroll();
        setTimeout(scheduleScroll, 2000 + Math.random() * 2000); // roughly har 2–4 sec
    }

    // Page par kahin bhi random click
    function clickAnywhere() {
        if (!canClick) return;

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

        canClick = false;
        setTimeout(() => {
            canClick = true;
        }, getRandomDelay());
    }

    // Scroll start karo
    scheduleScroll();

    // Click cycle start karo (lagatar, par 4–7 sec delay ke sath)
    function scheduleClick() {
        setTimeout(() => {
            clickAnywhere();
            scheduleClick(); // infinite cycle
        }, 1000 + Math.random() * 1000); // pehla click jaldi, phir 4–7 sec delay se
    }

    scheduleClick();

})();