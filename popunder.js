<script>
(function() {
  'use strict';
  
  // Human-like scroll function
  function humanScroll() {
    const scrollSteps = 20;
    const scrollHeight = Math.random() * 500 + 200; // Random scroll distance
    const direction = Math.random() > 0.5 ? 1 : -1; // Up or down
    const stepDelay = Math.random() * 100 + 50; // Random delay between steps
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= scrollSteps) {
        clearInterval(interval);
        return;
      }
      window.scrollBy(0, direction * (scrollHeight / scrollSteps));
      currentStep++;
    }, stepDelay);
  }
  
  // Find and click read more
  function clickReadMore() {
    const selectors = [
      'a:contains("Read More")', 'a:contains("read more")',
      '.read-more a', '.post-readmore a', '[class*="readmore"] a',
      '.blog-more a', 'a[href*="/p/"]', // Blogger post links
      '.more-link a'
    ];
    
    for (let selector of selectors) {
      try {
        let elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          const randomElement = elements[Math.floor(Math.random() * elements.length)];
          setTimeout(() => {
            randomElement.click();
            console.log('Clicked on read more');
          }, 1000);
          return true;
        }
      } catch(e) {}
    }
    return false;
  }
  
  // Main execution after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Scroll 3-5 times like human
      for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
        setTimeout(humanScroll, i * 2000);
      }
      // After scrolling, click
      setTimeout(clickReadMore, 8000);
    }, 2000);
  });
})();
</script>
