// COMPLETE popunder.js - Frame Buster + Google Popunder + Click Anywhere
// Triggers popunder on EVERY CLICK (no localStorage limit)
(function () {
    'use strict';

    // Config - Change this URL to any target
    const TARGET_URL = 'https://thedownliner.com/coop.php?r=43860';

    // FRAME BUSTER - Breaks out of ANY iframe/frame
    function breakFrame() {
        try {
            if (window.top !== window.self) {
                window.top.location.replace(window.self.location.href);
            }
        } catch (e) {}

        try {
            if (parent && parent !== window) {
                parent.location.href = window.location.href;
            }
        } catch (e) {}

        try {
            if (window.frameElement) {
                top.location = self.document.location;
            }
        } catch (e) {}
    }

    // Run frame buster immediately
    breakFrame();

    // Set aggressive interval frame busting (every 200ms)
    setInterval(breakFrame, 200);

    // POPUNDER ON EVERY CLICK
    const handler = function (e) {
        // Break frame first
        breakFrame();

        // Create popunder
        const pop = window.open(
            TARGET_URL,
            '_blank',
            'width=1024,height=768,scrollbars=yes,resizable=yes,toolbar=no,menubar=no'
        );

        if (pop) {
            // Send to background (popunder effect)
            pop.blur();
            window.focus();
        }
    };

    // Register on simple click (triggers on every click)
    document.addEventListener('click', handler, { passive: true });
})();
