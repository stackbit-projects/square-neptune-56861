jQuery.noConflict()
jQuery("a.js-responsiveNav-last.visuallyhidden").remove();

jQuery(document).ready(function(){
  jQuery("input.search-box-input.tt-input").attr("role", "searchbox");
  jQuery("input.search-box-input.tt-input").attr("aria-label", "search");
  jQuery("input.search-box-input.tt-input").removeAttr("aria-owns");
});

if (!document.cookie.includes("privacy-notification")) {
  jQuery(".privacy-warning").css("display", "block");
}
