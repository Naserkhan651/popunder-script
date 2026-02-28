(function() {
  'use strict';
  
  // Human-like scrolling with random behavior
  function humanScroll() {
    const scrollSteps = Math.floor(Math.random() * 15) + 15; // 15-30 steps
    const scrollHeight = (Math.random() * 600 + 300) * (Math.random() > 0.5 ? 1 : -1);
    const stepDelay = Math.random() * 120 + 60; // 60-180ms between steps
    
    let currentStep = 0;
    const startScroll = window.pageYOffset;
    
    const interval = setInterval(() => {
      if (currentStep >= scrollSteps) {
        clearInterval(interval);
        return;
      }
      
      // Smooth random scroll with easing
      const progress = currentStep / scrollSteps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const scrollAmount = scrollHeight * easeOut;
      
      window.scrollTo(0, startScroll + scrollAmount);
      currentStep++;
      
      // Random pause chance (human behavior)
      if (Math.random() < 0.1) {
        setTimeout(() => clearInterval(interval), Math.random() * 500 + 200);
      }
    }, stepDelay);
  }
  
  // Advanced read more finder and clicker
  function findAndClickReadMore() {
    const selectors = [
      // Common Blogger read more classes
      '.read-more a', '.readmore a', '.blog-more a', '.more-link a',
      '.post-readmore a', '[class*="read-more"] a', '[class*="readmore"] a',
      
      // Text-based selectors
      'a[href*="/p/"]', 'a:contains("باقی پڑھیں")', 'a:contains("مزید پڑھیں")',
      'a:contains("Read More")', 'a:contains("read more")', 'a:contains("Continue")',
      
      // Generic post links
      '.post-body a:last-child', '.post h2 a', '.entry-title a',
      '.post-title a', '[class*="post"] a:not([rel="nofollow"]):not(.comment-link)'
    ];
    
    for (let selector of selectors) {
      try {
        let elements;
        if (selector.includes(':contains')) {
          // Manual text search for older browsers
          elements = Array.from(document.querySelectorAll('a')).filter(a => 
            a.textContent.toLowerCase().includes('read') || 
            a.textContent.includes('مزید') || 
            a.textContent.includes('باقی')
          );
        } else {
          elements = document.querySelectorAll(selector);
        }
        
        if (elements.length > 0) {
          // Pick random element
          const randomIndex = Math.floor(Math.random() * elements.length);
          const target = elements[randomIndex];
          
          // Human-like mouse movement before click
          simulateMouseMove(target);
          
          setTimeout(() => {
            target.click();
            console.log('✅ Human-like click on:', target.textContent.trim());
          }, Math.random() * 800 + 400);
          
          return true;
        }
      } catch(e) {
        console.log('Selector failed:', selector);
      }
    }
    console.log('❌ No read more button found');
    return false;
  }
  
  // Simulate human mouse movement
  function simulateMouseMove(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 20;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 10;
    
    // Create fake mouse events
    const events = ['mousemove', 'mouseover'];
    events.forEach(eventType => {
      const event = new MouseEvent(eventType, {
        bubbles: true,
        clientX: x,
        clientY: y
      });
      element.dispatchEvent(event);
    });
  }
  
  // Main execution sequence
  function startHumanBehavior() {
    console.log('🤖 Starting human simulation...');
    
    // Initial pause (human reading time)
    setTimeout(() => {
      // Multiple scroll sessions (3-6 times)
      const scrollCount = Math.floor(Math.random() * 4) + 3;
      let scrollDelay = 0;
      
      for (let i = 0; i < scrollCount; i++) {
        setTimeout(humanScroll, scrollDelay);
        scrollDelay += Math.random() * 2500 + 2000; // 2-4.5 seconds between scrolls
      }
      
      // Final read more click after scrolling
      setTimeout(findAndClickReadMore, scrollDelay + 1000);
      
    }, Math.random() * 3000 + 1000); // 1-4 seconds initial delay
  }
  
  // Only run on main blog pages (not single posts)
  if (!window.location.pathname.includes('/p/') && !window.location.pathname.includes('/search')) {
    // Wait for page to fully load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startHumanBehavior);
    } else {
      startHumanBehavior();
    }
    
    // Also run on dynamic content (AJAX loaded posts)
    const observer = new MutationObserver(() => {
      if (Math.random() < 0.3) { // 30% chance on content change
        setTimeout(startHumanBehavior, 3000);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
})();
