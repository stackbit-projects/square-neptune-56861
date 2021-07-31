// a thing to highlight the current page in the main nav
if (process.browser) {
    var currentPage = window.location.href;
    // var currentPage = window.location.pathname;
    // var lastSlashIndex = currentPage.lastIndexOf('/');
    // var result = currentPage.substring(lastSlashIndex  + 1);
  
    var nav = document.querySelector(".c-primaryNav");
    if (nav) {
      var navLinks = nav.querySelectorAll("a");
      
      for (var i = 0; i < navLinks.length; i++) {
        //if (navLinks[i].href.includes(currentPage)) {
        var n = navLinks[i];
        if (n.href.toLowerCase() === currentPage.toLowerCase()) {
          n.classList.add("active");
        }
      }
  }
}
