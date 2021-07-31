// whether to show the scrolling or to jump, based on accessibility preference
if (process.browser) {

  var motion = true;
  if (window.matchMedia('(prefers-reduced-motion)').matches) {
    motion = false;
  }

  // the actual button click
  var backToTop = document.querySelector(".js-backtotop");

  if (backToTop) {
    backToTop.classList.add("backtotop-hiding");
    window.addEventListener("scroll", debounce(checkPosition));

    backToTop.querySelector("a").addEventListener("click", function( event ) {
      event.preventDefault();
      if (motion) {
        requestAnimationFrame(scrollToTop);
        
      } else {
        // if no motion is desired, then jump straight to the top
        window.scrollTo(0, 0);
        document.body.focus();
      }
    }, false);
  }

  function scrollToTop() {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
      window.scrollBy(0, -100);
      requestAnimationFrame(scrollToTop);
    } else {
      // if there's no more scrolling needed, focus on the body
      document.body.focus();
      // set hash when user scrolled to top 
      window.location.hash = '#wrapper';
    }
  }

  function checkPosition() {
    var windowY = window.scrollY;
    if (windowY > window.innerHeight) {
      backToTop.classList.add("backtotop-showing");
      backToTop.classList.remove("backtotop-hiding");
    } else {
      backToTop.classList.add("backtotop-hiding");
      backToTop.classList.remove("backtotop-showing");
    }
  }

  function debounce(func, wait, immediate) {
    if (!wait) {wait = 10;}
    if (!immediate) {immediate = true;}

    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }
}