var jQuery = require( "jquery" );
// a11y enhancements to the accordion

if (process.browser) {
  window.accordionToggles = function () {
    (function($) {
      'use strict';

      var vid = [];

      // on page load, check the hidden footer content and set aria roles as appropriate
      // less than 640 is mobile layout
      if ($(window).width() > 640) {
        $(".js-accordionToggle.c-footerSection__mobileTitle").each(function() {
          var accordionContent = $(this).siblings(".js-accordionContent");
          accordionContent.attr("aria-hidden", false);
        });
      }

      $('.js-accordionToggle').click(function(e) {
        e.preventDefault();

        vid = [];

        var isExpanded = $(this).attr("aria-expanded");
        var section = $(this).siblings(".js-accordionContent");

        if (isExpanded === "true") {
          $(this).attr("aria-expanded", false);
          section.attr("aria-hidden", true);
          /*
          vid[i] = section.querySelector(".video");
          if (vid[i]) {
            vid[i].src = vid[i].querySelector(".sxa-video-wrapper").querySelector("iframe").getAttribute("src");
            vid[i].querySelector(".sxa-video-wrapper").querySelector("iframe").setAttribute("src", "");
          }
          */
        } else {
          $(this).attr("aria-expanded", true);
          section.attr("aria-hidden", false);
          /*
          if (vid[i]) {
            vid[i].querySelector(".sxa-video-wrapper").querySelector("iframe").setAttribute("src", vid[i].src);
          }
          */
        }

        // handle footer things too
        if ($(this).hasClass("c-footerSection__mobileTitle")) {
          if (isExpanded === "true") {
            $(this).removeClass("active");
            section.hide();
          } else {
            $(this).addClass("active");
            section.show();
          }
        }

      });

    })(jQuery);
  }

  // Call the function
window.accordionToggles();
}
