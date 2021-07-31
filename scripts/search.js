const jQuery = require("jquery");

if (process.browser) {
    jQuery(window).on('load', function() {
        var searchComponent =  jQuery('main .search-box .twitter-typeahead'),
            searchInput =  jQuery('main .search-box .twitter-typeahead .search-box-input.tt-input');
    
        // Create search input remove value element
        searchComponent.append('<button class="search-box-delete js-searchBoxDelete" aria-label="Clear"></button>');
        var searchInputDelete =  jQuery('.js-searchBoxDelete');
    
        // Toggle input remove value element
        searchInput.on("change keyup", function(){
            var _this = jQuery(this);
            _this.val().length >= 1 ? searchInputDelete.fadeIn() : searchInputDelete.fadeOut();
        })
    
        // Remove input value on click
        jQuery("body").on("click", '.js-searchBoxDelete', function (e) {
            searchInput.val('');
            searchInputDelete.fadeOut();
            jQuery('main .search-box-button').click();
        });
    });
}
