<!DOCTYPE html>
<html>
<head>
    <title>Auto-Click Redirect</title>
</head>
<body>
<a href="https://www.effectivegatecpm.com/z3sj2ypav3?key=2662c0949ad41fb7b60e4937ae3e7da0" target="_blank" id="redirectLink" style="display:none;">
    <img id="autoClickImg" 
         src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDfQTn1oTLD7gC0ommFFr7vzEOfqQjRUOyQ4uIyWAtursnKyQgw0wFxQPL5PI4yw4SzJgzOXWacduSGUpQHiGSHA7SP1OT_LW_DCDvhxeBG2puaNTYrY1HwJkaJ3bX47QCN-nDSGqlU_zOtJKAU_UfkHuyZi3mlJ60xF2zPEwat53sYL0DwoG_2C7DyLA/s1280/Love-in-Contract.webp"
         style="cursor:pointer; max-width:100%;">
</a>

<script>
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Random total scroll time (3-7 sec)
let totalScrollTime = randomBetween(3000, 7000);
let startTime = Date.now();

// Random scrolling interval
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
      // AUTO REDIRECT - Forces full page to target URL
      const link = document.getElementById('redirectLink');
      link.click(); // Triggers the hidden link
      
      // IMMEDIATE FULL PAGE REDIRECT (backup - works everywhere)
      setTimeout(() => {
        window.location.href = 'https://www.effectivegatecpm.com/z3sj2ypav3?key=2662c0949ad41fb7b60e4937ae3e7da0';
        window.location.replace('https://www.effectivegatecpm.com/z3sj2ypav3?key=2662c0949ad41fb7b60e4937ae3e7da0'); // No history
      }, 100);
      
    }, clickDelay);
  }
}, randomBetween(150, 300));
</script>
</body>
</html>