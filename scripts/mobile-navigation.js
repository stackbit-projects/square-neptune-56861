const jQuery = require("jquery");

export const initMobileNav = () => {
  // firstly duplicate the search box for mobile
  jQuery('.c-header__search').clone(true).appendTo('.c-mobileNav__search');
}

if (process.browser) {
  // the actual button click
  var mobileNavBtn = document.querySelector(".js-mobNavToggle");
  var mobileNavClose = document.querySelector(".js-mobNavClose");
  var mobileNavLogo = document.querySelector(".c-mobileNav__logo a");
  
  var subNavBtns = document.getElementsByClassName("js-mobNavSubLevel");
  
  var mobileNav, mobileDonate, mobileSearchInputs, mobileSearchButton, isMobileNavOpen;
  
  if (mobileNavBtn && mobileNavClose) {
    isMobileNavOpen = false;
    mobileNav = document.querySelector(".js-mobileNav");
    mobileDonate = document.querySelector(".c-mobileNav__donate a");
    mobileSearchInputs = document.querySelectorAll(".c-mobileNav__search *");
    mobileSearchButton = document.querySelector(".c-mobileNav__search button");
  
    // click event on the toggle button
    mobileNavBtn.addEventListener("click", function( event ) {
      event.preventDefault();
      toggleNav();
    }, false);
  
    // click event on the toggle button
    mobileNavClose.addEventListener("click", function( event ) {
      event.preventDefault();
      toggleNav();
    }, false);
  
    for (var s = 0; s < subNavBtns.length; s++) {
      subNavBtns[s].addEventListener("click", function( event ) {
        event.preventDefault();
        var parent = this.parentNode.parentNode;
        var thisSub = parent.querySelector(".js-mobNavSubNav");
        thisSub.classList.toggle("is-invisible");
        thisSub.classList.toggle("is-open");
        parent.classList.toggle("active-link");
  
        // add focus to the first link element
        thisSub.getElementsByTagName('a')[0].focus()
  
        // update aria expanded status
        var expendedStatus = JSON.parse(this.getAttribute("aria-expanded")); // get aria value + turn string to bool
        this.setAttribute("aria-expanded", !expendedStatus);
      });
    }
  }
  
  function toggleNav() {
    mobileNavBtn.classList.toggle("is-open");
    isMobileNavOpen = !isMobileNavOpen;
    mobileNavBtn.setAttribute("aria-expanded", isMobileNavOpen);
    if (isMobileNavOpen) {
      mobileNavBtn.querySelector(".mobile__nav__text").innerHTML = "Close";
      // mobileNavBtn.setAttribute("aria-label", 'toggle menu expanded');
    } else {
      mobileNavBtn.querySelector(".mobile__nav__text").innerHTML = "Menu";
     // mobileNavBtn.setAttribute("aria-label", 'toggle menu collapsed');
    }
    mobileNav.classList.toggle("is-active");
    document.body.classList.toggle("is-overflow-hidden");
    // properly hide the set of links inside this element, for tabindex purposes
    mobileNav.querySelector(".mobile__nav__links").classList.toggle("is-invisible");
  }
  
  //if keyboard focus off the bottom of responsive nav, focus on the close button
  jQuery('.js-responsiveNav-last').focusin(function () {
    mobileNavLogo.focus();
  });
}
