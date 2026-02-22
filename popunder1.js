(function() {
    'use strict';
    
    // Create hidden redirect link dynamically
    const link = document.createElement('a');
    link.href = 'https://www.google.com';
    link.id = 'redirectLink';
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Create image element
    const img = document.createElement('img');
    img.id = 'autoClickImg';
    img.src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhipZL7EqIfJ4FrLBXnqyF_8IEsYcXbdmDCcwXNFtinhfn13KOGnwb29eWs75C9R1mS8VLObzUWuknbON4rXx9HmehCzVg0mPv0LR1yFuXDvFxBL-_AhzkyvVCbFc-jYf5MUi3sog-7PiTq6Qxg9oPaSVmXEcoNLOh8l2C8CUevouP47CxoZV-b7fxVnnk/s1280/The-Art-of-Sarah.webp';
    img.style.cssText = 'cursor:pointer; max-width:100%; display:block; margin:0 auto;';
    document.body.appendChild(img);
    
    // Auto-scroll + redirect logic
    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoRedirect);
    } else {
        initAutoRedirect();
    }
    
    function initAutoRedirect() {
        let totalScrollTime = randomBetween(1000, 2000);
        let startTime = Date.now();
        
        let scrollInterval = setInterval(function () {
            let direction = Math.random() > 0.5 ? 1 : -1;
            let distance = randomBetween(50, 250) * direction;
            
            window.scrollBy({
                top: distance,
                behavior: "smooth"
            });
            
            if (Date.now() - startTime > totalScrollTime) {
                clearInterval(scrollInterval);
                
                let clickDelay = randomBetween(500, 2000);
                
                setTimeout(function () {
                    // Trigger click on hidden link
                    const redirectLink = document.getElementById('redirectLink');
                    if (redirectLink) {
                        redirectLink.click();
                    }
                    
                    // Force full page redirect (backup)
                    setTimeout(() => {
                        window.location.href = 'https://www.google.com';
                        window.location.replace('https://www.google.com');
                    }, 100);
                }, clickDelay);
            }
        }, randomBetween(150, 300));
    }
})();
