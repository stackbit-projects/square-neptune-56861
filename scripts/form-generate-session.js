const jQuery = require("jquery");

if (process.browser) {

    (function($) {
        'use strict';

        function generateId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }
      
        $(document).ready(function () {
            // Generate random new FormSessionId using a function. The function should be called
            // for each individual form on the page if there are multiple.
            $('[id^=fxb_][id$=_FormSessionId]').val(generateId);
        });

    })(jQuery);

}