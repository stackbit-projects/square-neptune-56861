const jQuery = require("jquery");
const bowser = require("bowser");
/*
Handling the 'your browser is out of date' banner, will appear on these browsers, where the version is less than..:
Chrome 40
Firefox 63
IE 11
Opera 30
Safari (Mac) 11.1
Safari (Mobile) 11 (Safari mobile versions numbers match up to iOS versions, so effectively iOS 11)
Edge 17
Samsung internet 9.0.01.80
docs for bowser: https://lancedikson.github.io/bowser/docs/index.html
*/
if (process.browser) {
  window.addEventListener("load", function() {
    if (jQuery(".sitecore-form").length) {
      var browser = bowser.getParser(window.navigator.userAgent);
      // populate hidden field on form
      if (jQuery('input[data-sc-field-name="browserDetails"]').length) {
        var b = browser.getBrowser().name;
        var v = browser.getBrowser().version;
        var o = browser.getOS().name;
        var s = browser.getOS().version;
        jQuery('input[data-sc-field-name="browserDetails"]').val(b + ' ' + v + ' (' + o + ' ' + s + ')');
      }
      var isNotValidBrowser = browser.satisfies({
        // declare browsers per OS
        windows: {
          "internet explorer": "<11",
          "edge": "<17"
        },
        macos: {
          safari: "<11.1"
        },
        // per platform (mobile, desktop or tablet)
        mobile: {
          safari: '<11',
          'android browser': '<3.10'
        },
        tablet: {
          safari: '<11',
          'android browser': '<3.10'
        },
        SamsungBrowser: "<9.0.01.80",
        chrome: "<40",
        firefox: "<63",
        opera: "<30"
      });
      if (isNotValidBrowser) {
        if(jQuery('.c-browserBanner').length){
          //alert('BAD');
          jQuery("body").addClass("no-scroll");
          jQuery("html").addClass("no-scroll");
          jQuery(".c-browserBanner").addClass("showing");
          // handle focus
          var popup = jQuery('.c-browserBanner__wrapper');
          trapFocus(popup[0]);
          //var KEYCODE_TAB = 9;
        }
      }
    } // if sitecore-form
  });
  function trapFocus(element) {
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'),
        firstFocusableEl = focusableEls[0];
        lastFocusableEl = focusableEls[focusableEls.length - 1];
        KEYCODE_TAB = 9;
    firstFocusableEl.focus();
    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
        if (!isTabPressed) {
            return;
        }
        if ( e.shiftKey ) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
  }
}