if (process.browser) {
  var svgAudio = document.querySelector('.svg-mp3');
  var svgLogo = document.querySelectorAll('.svg-logo');
  var inEditor = document.querySelector('.on-page-editor');
  
  // https://zhuanlan.zhihu.com/p/24349496
  function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }
  
  addLoadEvent(function() {
    if (svgLogo) {
      //localStorage.clear();
      checkSonic();
    }
  });
  
  function checkSonic() {
      if(localStorage.getItem('gdSonic')) {
        for (var i = 0; i < svgLogo.length; i++) {
          svgLogo[i].classList.remove('delay');
          svgLogo[i].classList.add('animating');
        }
      } else {
        if (svgAudio && !inEditor) {
          playSonic();
        } else {
          for (var j = 0; j < svgLogo.length; j++) {
            svgLogo[j].classList.remove('delay');
            svgLogo[j].classList.add('animating');
          }
        }
        localStorage.setItem('gdSonic', true);
      }
  }
  
  function playSonic() {
    if (!localStorage.getItem('gdSonic')) {
      var promise = svgAudio.play();
      if (promise !== undefined) {
        promise.then(function(_) {
          //console.log('playing?');
        }).catch(function(error) {
          //console.log('nope');
        });
      }
    }
    for (var k = 0; k < svgLogo.length; k++) {
      svgLogo[k].classList.remove('delay');
      svgLogo[k].classList.add('animating');
    }
  }
}
