// COMPLETE popunder.js - Frame Buster + Google Popunder + Click Anywhere
(function() {
    'use strict';
    
    // Config - Change this URL to any target
    const TARGET_URL = 'https://www.effectivegatecpm.com/z3sj2ypav3?key=2662c0949ad41fb7b60e4937ae3e7da0';
    
    // Track if already popped (prevents spam)
    let hasPopped = localStorage.getItem('popunder_shown') === 'true';
    
    // FRAME BUSTER - Breaks out of ANY iframe/frame
    function breakFrame() {
        try {
            // Method 1: Top window redirect
            if (window.top !== window.self) {
                window.top.location.replace(window.self.location.href);
            }
        } catch (e) {}
        
        try {
            // Method 2: Parent window
            if (parent && parent !== window) {
                parent.location.href = window.location.href;
            }
        } catch (e) {}
        
        try {
            // Method 3: Continuous busting
            if (window.frameElement) {
                top.location = self.document.location;
            }
        } catch (e) {}
    }
    
    // Run frame buster immediately
    breakFrame();
    
    // Set aggressive interval frame busting (every 200ms)
    setInterval(breakFrame, 200);
    
    // POPUNDER ON ANY CLICK
    if (!hasPopped) {
        document.addEventListener('click', function handler(e) {
            // Break frame first
            breakFrame();
            
            // Create popunder
            const pop = window.open(TARGET_URL, '_blank', 
                'width=1024,height=768,scrollbars=yes,resizable=yes,toolbar=no,menubar=no');
            
            if (pop) {
                // Send to background (popunder effect)
                pop.blur();
                window.focus();
                
                // Mark as done
                localStorage.setItem('popunder_shown', 'true');
            }
            
            // Remove listener (one-time only)
            document.removeEventListener('click', handler);
        }, { once: true, passive: true });
        
        // Also trigger on mouse down (better browser support)
        document.addEventListener('mousedown', function(e) {
            if (!hasPopped) handler(e);
        }, { once: true, passive: true });
    }
    
    // MOBILE TOUCH SUPPORT
    document.addEventListener('touchstart', function(e) {
        if (!hasPopped) handler(e);
    }, { once: true, passive: true });
    
})();