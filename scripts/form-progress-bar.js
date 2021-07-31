const jQuery = require("jquery");

/**
 * Create Form Progress Bar
 * creates progress bar markup based
 */

if (process.browser) {
    var progressBarItems = [];
    window.createFormProgressBar = function () {
        progressBarItems = [];
    
        // We check if form progress bar component exists
        if(jQuery('.js-progressBar').length) {
    
        jQuery(".js-progressBar select option").each(function() {
            progressBarItems.push(jQuery(this).val());
        });
    
        jQuery('.js-progressBar').prepend('<div class="progress-bar"><div class="progress-bar__fill js-progressBarFill"></div><ul class="js-progress-bar-ul"></ul></div>');
        for(var i = 0; i < progressBarItems.length; i++){
            jQuery('.js-progress-bar-ul').append('<li class="progress-bar__item js-progress-bar-item"><div class="progress-bar__item__name">'+progressBarItems[i]+'</div><div class="progress-bar__item__indicator"></div><div class="progress-bar__item__circle">'+(i+1)+'</div></li>');
        }
    
        var elSelector = jQuery('.js-progressBar[class*="step-"]');
        if(elSelector[0]){
            var number = elSelector[0].className.match(/\d+/);
    
            jQuery('.js-progress-bar-item').eq(number[0]-1).addClass('is-selected is-active');
            progressIndicatorAnimation(number[0]);
    
            jQuery('.js-progress-bar-item').each(function(index){
                var _this = jQuery(this);
                (index+1) <= number[0] ? _this.addClass('is-selected') : _this.removeClass('is-selected');
            });
    
        }else {
            jQuery('.js-progress-bar-item').first().addClass('is-selected is-active');
            progressIndicatorAnimation(1);
        }
        }
        jQuery('.js-donationAmountLabel').html(sessionStorage.getItem('donation_amount'));
    }
    
    /**
     * Progress Indicator Animation
     * animates progress bar width
     * @param value = current step index
     */
    function progressIndicatorAnimation(value){
        jQuery('.js-progressBarFill').width(((100 * value) / progressBarItems.length)+'%');
    }
}
