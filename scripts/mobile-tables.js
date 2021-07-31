const jQuery = require("jquery");

if (process.browser) {
  (function($) {
    'use strict';
  
    jQuery(window).on('load', function() {
        /**
         * Loop through each table element on page load and wrap it with div.table
         */
        jQuery('table').each(function(){
        var _this = jQuery(this);
        _this.wrap("<div class='table'></div>");
      });
    });
  
  })(jQuery);
  
}