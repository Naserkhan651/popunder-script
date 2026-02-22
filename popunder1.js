<!DOCTYPE html>
<html>
<head>
    <title>Auto-Click Redirect</title>
</head>
<body>
<a href="https://www.google.com" target="_blank" id="redirectLink" style="display:none;">
    <img id="autoClickImg" 
         src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhipZL7EqIfJ4FrLBXnqyF_8IEsYcXbdmDCcwXNFtinhfn13KOGnwb29eWs75C9R1mS8VLObzUWuknbON4rXx9HmehCzVg0mPv0LR1yFuXDvFxBL-_AhzkyvVCbFc-jYf5MUi3sog-7PiTq6Qxg9oPaSVmXEcoNLOh8l2C8CUevouP47CxoZV-b7fxVnnk/s1280/The-Art-of-Sarah.webp"
         style="cursor:pointer; max-width:100%;">
</a>

<script>
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Random total scroll time (1–2 sec)
let totalScrollTime = randomBetween(1000, 2000);
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
        window.location.href = 'https://www.google.com';
        window.location.replace('https://www.google.com'); // No history
      }, 100);
      
    }, clickDelay);
  }
}, randomBetween(150, 300));
</script>
</body>
</html>