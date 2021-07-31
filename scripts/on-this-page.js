if (process.browser) {
  window.addEventListener('load', () => {
    // On this page component link builder
    var onThisPageList = document.querySelector('.js-onThisPageLinks');
    if (onThisPageList) {
        var allH2s = document.querySelectorAll('h2');
        if (allH2s.length > 0) {
            setTimeout(function(){
                var h2;
                for (h2 = 0; h2 < allH2s.length; h2++) {
                var _this = allH2s[h2];
                var title = _this.innerText || _this.textContent;
                // turn title into url friendly string
                var url = stringToSlug(title);
                // set headers id attr
                _this.setAttribute('id',url);
    
                var newLi = document.createElement('li');
                newLi.innerHTML = '<a href="#'+url+'" title="'+title+'">'+title+'</a>';
                onThisPageList.appendChild(newLi);
                }
                onThisPageList.classList.remove('loading');
            }, 1500);
        } else {
            setTimeout(function(){
                var newLi = document.createElement('li');
                newLi.innerHTML = 'No links found';
                onThisPageList.appendChild(newLi);
                onThisPageList.classList.remove('loading');
            }, 1500);
        }
    }
    
    // Turns string into url friendly string
    function stringToSlug(text) {
      return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    }
  });
}
