// adding 'play' functionality to the image on a podcast spotlight
if (process.browser) {
  window.addEventListener('load', () => {
    var podcast = document.querySelector(".c-podcast");
  
    if (podcast) {
      var mp3 = document.querySelector(".c-podcast__mp3");
      var img = podcast.querySelector(".c-podcast__image");
    
      img.addEventListener("click", function( event ) {
          if (mp3.paused == false) {
              mp3.pause();
          } else {
              mp3.play();
            }
      }, false);
    
      mp3.addEventListener("playing", function( event ) {
        img.classList.add("mp3-playing");
      });
      mp3.addEventListener("pause", function( event ) {
        img.classList.remove("mp3-playing");
      });
    }
  });
}
