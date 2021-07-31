import Mustache from 'mustache';

const jQuery = require("jquery");

// various scripts for the Donate an Hour search page
if (process.browser) {

  (function($) {
    'use strict';
  
    $(document).ready(function () {
      var donateSearch = document.querySelector(".js-donateAnHour");
  
      var siteUrl = location.protocol + '//' + location.hostname;
  
     // postcode lookup
  
      var searchData = {
        requestedDistance: 200,
        latitude: 0,
        longitude: 0,
        locationsOffset: 0
      };
  
      $(donateSearch).submit(function (e) {
        e.preventDefault();
        $('.js-donateAnHour .error').removeClass('show');
        $('.js-resultsError').removeClass('show');
        $('.js-donateAnHourForm').hide();
  
        // get actual values from the form results..
        var distance = $('select#searchDistance').val();
        var address = encodeURI($('input#searchLocation').val());
        if (address.length < 3) {
          $('.js-donateAnHour .error').addClass('show');
          return;
        }
  
        $.ajax({
          type: "GET",
          url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&region=uk&key=AIzaSyDQpzJpKmVlfaRT6jWHVYrYngxxphmOFvw",
          success: function (response) {
              if (response)
              {
                if (response.status == "ZERO_RESULTS") {
                  $('.js-donateAnHour .error').addClass('show');
                  $('.js-search-items').html('');
                  $('.js-campaignCount').hide();
                  return;
                }
                searchData.latitude = response.results[0].geometry.location.lat;
                searchData.longitude = response.results[0].geometry.location.lng;
                searchData.requestedDistance = distance;
                searchData.locationsOffset = 0;
                $('.js-search-items').html('');
                $('.js-campaignCount').hide();
  
                window.fetchResults();
              } else
              {
                $('.js-donateAnHour .error').addClass('show');
                $('.js-search-items').html('');
                return;
              }
          },
          error: function() {
            $('.js-donateAnHour .error').addClass('show');
            $('.js-search-items').html('');
            return;
          }
  
        });  
  
        // pass the location to search endpoint
        window.fetchResults = function () {
  
          // remove prev results
          //$('.js-search-items').html('');
          $('.js-resultsError').removeClass('show');
  
          var resultsTemplate = $('.js-resultsList-temp').html();
          // Mustache.js settings
          Mustache.tags = ['[[', ']]']; // we change the default tags, don't need todo it
          Mustache.parse(resultsTemplate);
  
          $.ajax({
              type: "POST",
              url: siteUrl+"/guidedogsapi/SalesForceApi/GetCampaignDetails",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(searchData),
              success: function (response) {
                  if (response)
                  {
                    searchData.locationsOffset = searchData.locationsOffset + 5;
                    if(response.CampaignCount > searchData.locationsOffset){
                      $('.js-loadMoreDah').show();
                    }else {
                      $('.js-loadMoreDah').hide();
                    }
  
                    $('.js-loadMoreDah').removeClass('is-loading');
  
                      if (response.CampaignCount < 1) {
                        $('.js-resultsError').addClass('show');
                        return;
                      } else {
                        $('.js-campaignCount').show();
                        $('.js-campaignCountCounter').html(response.CampaignCount);
                        var rendered = Mustache.render(resultsTemplate, response); // json data from api
                        $('.js-search-items').append(rendered);
                        // Call the accordion function so that it's ready to go for new sections
                        window.donateAnHourAccordion();
                        window.donateAnHourSelection();
                      }
                  } else
                  {
                    $('.js-search-items').html('No response');
                  }
              },
              error: function() {
                  console.log("oops");
              }
  
          });
        }
      });
  
      // Load more donate an hour results
      $('.js-loadMoreDah').on('click', function(){
        window.fetchResults();
        $(this).addClass('is-loading');
      });
  
    // handle results
  
    window.donateAnHourAccordion = function () {
      $('.c-donateAnHourResults__title').click(function(e) {
        e.preventDefault();
  
        var isExpanded = $(this).attr("aria-expanded");
        var section = $(this).siblings(".c-donateAnHourResults__contents");
  
        // handle donate-an-hour accordion
        if (isExpanded == "true") {
          $(this).removeClass("active");
          section.hide();
          $(this).attr("aria-expanded", false);
          section.attr("aria-hidden", true);
        } else if (isExpanded == "false") {
          $(this).addClass("active");
          section.show();
          $(this).attr("aria-expanded", true);
          section.attr("aria-hidden", false);
        }
  
      });
    }
    // do stuff with the application form
    window.donateAnHourSelection = function () {
  
      $('input[type=radio][name=campaignSelection]').change(function() {
        var campaignId = $(this).val();
        var campaignName = $(this).data('name');
        var campaignLocation = $(this).data('location');
        var campaignDate = $(this).data('date');
        var campaignTime = $(this).data('time');
  
        // 'select' the wrapper
        $('.occurence-selected').removeClass('occurence-selected');
        $(this).closest('.c-donateAnHourResults__occurence').addClass('occurence-selected');
  
        $('.js-donateAnHourForm').show();
        // maybe scroll? not sure this is a11y friendly
        /*
        $([document.documentElement, document.body]).animate({
          scrollTop: $(".js-donateAnHourForm").offset().top
        }, 1600);
        */
  
        // REVEAL THE FORM and set the values
        /*
        INSERT INTO HIDDEN FIELDS
        */
        $('input[data-sc-field-name="CampaignId"]').val(campaignId);
        $('input[data-sc-field-name="CampaignLocation"]').val(campaignName + ', ' + campaignLocation);
        $('input[data-sc-field-name="CampaignDate"]').val(campaignDate);
        $('input[data-sc-field-name="CampaignTimeSlot"]').val(campaignTime);
  
        // and visually show some of the data
        $('.js-selectedName').text(campaignName);
        $('.js-selectedLocation').text(campaignLocation);
        $('.js-selectedDate').text(campaignDate);
        $('.js-selectedTime').text(campaignTime);
      });
    }
    }); // doc ready
  
  })(jQuery);
}
