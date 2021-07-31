const jQuery = require("jquery");
// POLYFILL For MutationObserver
if (process.browser) {

    (function() {
        var MutationObserver;
    
        if (window.MutationObserver != null) {
          return;
        }
    
        MutationObserver = (function() {
          function MutationObserver(callBack) {
            this.callBack = callBack;
          }
    
          MutationObserver.prototype.observe = function(element, options) {
            this.element = element;
            return this.interval = setInterval((function(_this) {
              return function() {
                var html;
                html = _this.element.innerHTML;
                if (html !== _this.oldHtml) {
                  _this.oldHtml = html;
                  return _this.callBack.apply(null);
                }
              };
            })(this), 200);
          };
    
          MutationObserver.prototype.disconnect = function() {
            return window.clearInterval(this.interval);
          };
    
          return MutationObserver;
    
        })();
    
        window.MutationObserver = MutationObserver;
    
      }).call(this);
    
    
    
    
    
    
    
    // POLYFILL FOR isInteger
    Number.isInteger = Number.isInteger || function(value) {
        return typeof value === "number" &&
               isFinite(value) &&
               Math.floor(value) === value;
    };
    
    // POLYFILL FOR padStart
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength,padString) {
            targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength-this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0,targetLength) + String(this);
            }
        };
    }
    
    
    
    var siteUrl = location.protocol + '//' + location.hostname;
    var bankAccountValid = false;
    
    /**
     * this function loads on every form load
     */
    window.formFunction = function(){
    
        // set date in a hidden field
        jQuery('input[data-sc-field-name="date"]').val(todaysDate());
        establishTracking();
        checkDobFields();
    };
    
    // Deletes data when focusin on short code input
    jQuery("body").on("focusin", ".js-shortCodeInput", function (e) {
        jQuery(this).val('');
        bankAccountValid = false;
    });
    
    // Sets mobile phone number to true so later we can use it for a race condition
    jQuery("body").on("change", ".js-mobileNumber", function (e) {
        var _this = jQuery(this);
        if (!_this.hasClass("input-validation-error")) {
            sessionStorage.setItem("mobile_number", 'true');
        } else {
            sessionStorage.setItem("mobile_number", null);
        }
    });
    
    // Check the status of js-contactVia and based on the value trigger js-phoneNumberSection
    jQuery("body").on("change", ".js-contactVia", function (e) {
        var _this = jQuery('.js-contactVia');
        if (_this.is(':checked')) {
            if (sessionStorage.getItem("mobile_number") === null) {
                jQuery('.js-phoneNumberSection').show();
            }
        } else {
            jQuery('.js-phoneNumberSection').hide();
        }
    });
    
    // Check the status of KeepInTouchByPhone and based on the value trigger js-phoneNumberSection
    jQuery("body").on("change", "input[value='KeepInTouchByPhone']", function (e) {
        var _this = jQuery(this);
        if (_this.is(':checked')) {
            if (sessionStorage.getItem("mobile_number") === null) {
                jQuery('.js-phoneNumberSection').show();
            }
        } else {
            jQuery('.js-phoneNumberSection').hide();
        }
    });
    
    
    
    // add is loading state to form submit button because sometimes it's timing out
    jQuery("body").on("click", "form input[type='submit']:not(.section-edit,.js-accordion,.js-formCompleteMonthlyDonation,.js-noSubmit)", function (e) {
        var _this = jQuery(this);
        _this.addClass("is-loading");
        _this.disabled = true;
        var validator = $("main form");
        if(!validator.valid()){
            _this.removeClass("is-loading");
            _this.disabled = false;
        }else{
            //if there is not postcode
            var postcodeSelector = jQuery('.postcode-wrapper').not(":hidden");
            if(!postcodeSelector.length){
                setTimeout(function(){
                    jQuery("html, body").animate({ scrollTop: $(".form__donation").offset().top }, "slow");
                },200);
            }
        }
        // check for errors as per 22606, if there are any, scroll to them
        var checkErrors = setInterval(function(){
            //console.log('check error');
            if (jQuery('.validation-summary-errors').length) {
                //console.log('yes error');
                scrollToError();
                stopChecking();
            }
            if (!jQuery('input.is-loading').length) {
                //console.log('input loading');
                stopChecking();
            }
    
        }, 2000);
    
        function scrollToError() {
            //console.log('scroll error');
            jQuery('html, body').animate({
                scrollTop: (jQuery('.validation-summary-errors').first().offset().top-40)
            }, 1000);
        }
    
        function stopChecking() {
            //console.log('stop checking');
            clearInterval(checkErrors);
        }
    });
    
    var postcodeValStatus = false;
    
    // trigger postocde validation on simple pages
    jQuery("body").on("click", "input[type='submit']:not(.js-accordion,.js-gotoStep,.js-noSubmit)", function (e) {
        var _this = jQuery(this);
        // check if we have a postcode component in the form
        var postcodeSelector = jQuery('.postcode-wrapper').not(":hidden");
        if (postcodeSelector.length) {
            //check if postcode val is false
    
            if (!postcodeValStatus) {
                e.preventDefault();
                // run form validation, using sitecore validation
                var validator = $("main form");
                if (validator.valid()) {
                    if (postcodeSelector.find('.postcode-lookup-step-1').is(':visible') && postcodeSelector.find('.postcode-lookup-step-3').is(':hidden')) {
                        postcodeSelector.find('#PostcodeError').show();
                        postcodeSelector.find('#PostcodeLookupInput').addClass('input-validation-error');
                        postcodeValStatus = false;
                        _this.removeClass("is-loading");
                        _this.disabled = false;
                    } else if (postcodeSelector.find('#PostcodeAddressResultsSelect').is(':visible') && postcodeSelector.find('#PostcodeAddressResultsSelect').val() === "" && postcodeSelector.find('#HideEnterManuallyIfNotAvailable').is(':visible')) {
                        postcodeSelector.find('#SelectAddressError').show();
                        postcodeSelector.find('#PostcodeAddressResultsSelect').addClass('input-validation-error').attr('aria-invalid', 'true').attr('aria-describedBy', 'SelectAddressError');
                        postcodeValStatus = false;
                        _this.removeClass("is-loading");
                        _this.disabled = false;
                    } else {
                        // if postcode validation passed re-submit the form
                        postcodeValStatus = true;
                        postcodeSelector.find('#PostcodeError').hide();
                        postcodeSelector.find('#SelectAddressError').hide();
                        _this.click();
                    }
    
                    // scroll to error
                    if(!postcodeValStatus){
                        $('html, body').animate({
                            scrollTop: (jQuery('.field-validation-error:visible').first().offset().top-100)
                        }, 1000);
                    }
    
                }else {
                     $('html, body').animate({
                        scrollTop: (jQuery('.input-validation-error').first().offset().top-40)
                    }, 1000);
                }
            }
        }
    });
    
    
    // Updates amount pod input with selected amount pod value
    jQuery("body").on("change", "input[name='amount_pod']", function (e) {
        var amountPodValue = jQuery(this).val();
        jQuery('.js-amountPod').val(amountPodValue);
        jQuery('.js-amountPod').removeClass('input-validation-error');
        jQuery('.js-amountPod').addClass('valid');
        jQuery('.js-amountPod').siblings('.field-validation-error').text('');
        sessionStorage.setItem("donation_amount", amountPodValue);
    });
    
    // Updates amount pod input with clean value eg. two decimal points
    jQuery("body").on("change", ".js-amountPod", function (e) {
        var amount = parseFloat(jQuery(this).val()); // turn string into number
        var step = parseFloat(jQuery(this).attr('step'));
        var numberToFix = 0;
        switch(step) {
            case 1:
                numberToFix = 0;
                break;
            case 0.1:
                numberToFix = 1;
              break;
            case 0.01:
                numberToFix = 2;
                break;
            default:
                numberToFix = 0;
        }
        // check if number is clean number if yes turn into two decimal points
        var reString = "^\\s*((\\d+(\\.\\d{0,1})?)|((\\d*(\\.\\d{1,1}))))\\s*$";
        var re = new RegExp(reString);
        if(re.test(amount)){
            amount = parseFloat(amount).toFixed(numberToFix);
           jQuery(this).val(amount);
        }
        sessionStorage.setItem("donation_amount",amount);
    });
    
    // If the user enters a custom amount removes the checked state from amount pods
    jQuery("body").on("focusin", ".js-amountPod", function (e) {
        jQuery("input[name='amount_pod']").prop('checked', false);
    });
    
    // Removes white spaces form a text input
    jQuery("body").on("focusout", "input[type='text']", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val();
        _this.val(thisVal.trim());
    
    });
    
    // Validates phone numbers, removes white spaces and removes 44 and +44 from phone number.
    jQuery("body").on("focusout", ".js-inputValidPhone", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val();
        thisVal = thisVal.replace(/\s/g, ''); // removes spaces
        thisVal = thisVal.replace(/^(\+44\(0\)|(\+44)|(44))/g, "0"); // removes +44 & 44 from phone number
        _this.val(thisVal);
    });
    
    // Cleans up the postcode input field value if the country is UK
    jQuery("body").on("focusout", ".js-inputValidPostcode", function (e) {
        var _this = jQuery(this);
        if (jQuery('.js-formCountry').val() === 'United Kingdom') {
            var thisVal = _this.val();
            var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i; // Ensure all UK postcodes have a space in them.
            var formatedPostcode = thisVal.replace(postcodeRegEx, "$1 $2");
            _this.val(formatedPostcode);
        }
    });
    
    // Improves the 'how would you like donate ?' form
    jQuery("body").on("change", ".form__select-donation input[type='radio']", function (e) {
        var _this = jQuery(this);
        var thisParent = _this.parent();
        var dataHref = thisParent.data('href');
        jQuery('.js-selectDonationType').attr('href', dataHref);
    });
    
    
    // Improves the sort code input field experience, if user enters the 2 digits the focus goes to the next input automatically
    jQuery("body").on("keyup", ".js-shortCodeInput", function (e) {
        var _this = jQuery(this);
        var thisValue = _this.val();
        jQuery('.js-formShortCodeError').hide();
        if (thisValue.length === 2) {
            if (_this.parent().next('div').length) {
                _this.parent().next().find('.js-shortCodeInput').focus();
            }
        }
    });
    
    /**
     * We need to disable enter keypress on input elements to fix bug #1295
     */
    
    jQuery("body").on("keypress", "input", function (e) {
        var _this = jQuery(this);
        // its is enter key and its not a submit button prevent default
        if(e.which == 13 && !_this.is('input[type="submit"]')) {
            e.preventDefault();
        }
    });
    
    
    /**
     * Improves monthly donation form experience
     * - combines the 3 sort code input values into 1 and saves it to a hidden field.
     * - stops native submit func to first validate the sort codes, if ok = submit the form again, no = show error
     */
    
    jQuery("body").on("click", ".js-formCompleteMonthlyDonation", function (e) {
    
        var validator = $("main form");
        if (validator.valid() && !bankAccountValid) {
            disableSubmitButton();
            e.preventDefault();
    
            var shortCode = '';
            jQuery('.js-shortCodeInput').each(function () {
                var _this = jQuery(this);
                var thisVal = _this.val();
                shortCode += thisVal;
            });
            var accountNumber = jQuery('.js-formAccountNumber').val();
            jQuery('input[data-sc-field-name="Sort Code"]').val(shortCode);
    
            // validate bank account details
            jQuery.get(siteUrl + "/guidedogsapi/BankAccountValidation/IsBankAccountValid?accountnumber=" + accountNumber + "&sortcode=" + shortCode, function (data) {
                if (data) {
                    // get bank details from short code
                    jQuery.get(siteUrl + "/guidedogsapi/bankaccountvalidation/getbranchdetails?sortcode=" + shortCode, function (data) {
                        jQuery('input[data-sc-field-name="BankName"]').val(data.BankName);
                        jQuery('input[data-sc-field-name="BranchName"]').val(data.BranchName);
                        var accountNumberShorthand = accountNumber.replace(/.(?=.{4})/g, 'x');
                        jQuery('input[data-sc-field-name="shortaccountnumber"]').val(accountNumberShorthand);
                        bankAccountValid = true;
                        enableSubmitButton();
                        jQuery('.js-formCompleteMonthlyDonation').click();
                    });
                } else {
                    enableSubmitButton();
                    jQuery('.js-formShortCodeError').show();
                }
            });
        }else {
            bankAccountValid = false;
    
            setTimeout(function(){
                disableSubmitButton();
            }, 100);
        }
    
        var checkErrorsMonthly = setInterval(function(){
            //console.log('check error');
            if (jQuery('.field-validation-error:visible').length) {
                stopChecking();
                enableSubmitButton();
            }
            if (jQuery('.validation-summary-errors').length) {
                //console.log('yes error');
                scrollToError();
                stopChecking();
                enableSubmitButton();
            }
            if (!jQuery('input.is-loading').length) {
                //console.log('input loading');
                stopChecking();
                enableSubmitButton();
            }
    
        }, 2000);
    
        function scrollToError() {
            //console.log('scroll error');
            jQuery('html, body').animate({
                scrollTop: (jQuery('.validation-summary-errors').first().offset().top-40)
            }, 1000);
        }
    
        function stopChecking() {
            //console.log('stop checking');
            clearInterval(checkErrorsMonthly);
        }
    
        function disableSubmitButton() {
            jQuery('.js-formCompleteMonthlyDonation').addClass('is-loading');
            jQuery(".js-formCompleteMonthlyDonation").attr("disabled", true);
        }
    
        function enableSubmitButton() {
            jQuery('.js-formCompleteMonthlyDonation').removeClass('is-loading');
            jQuery(".js-formCompleteMonthlyDonation").attr("disabled", false);
        }
    });
    
    function todaysDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }
    
    // Get Lucky Lottery selected weeks and update lucky amount
    jQuery("body").on("change", ".js-luckyLotteryWeeks", function (e) {
        luckyLotteryWeeks();
    });
    
    
    // Simple information component trigger
    jQuery("body").on("click", ".js-form-info-trigger", function (e) {
        e.preventDefault();
        var formInfo = jQuery('.js-form-info');
        var _this = jQuery(this);
        var isExpanded = _this.attr("aria-expanded");
        if (isExpanded == "true") {
            $(this).attr("aria-expanded", false);
            formInfo.attr("aria-hidden", true);
          } else if (isExpanded == "false") {
            $(this).attr("aria-expanded", true);
            formInfo.attr("aria-hidden", false);
          }
        formInfo.toggle();
    });
    
    // Lucky Lottery amount calculator
    function luckyLotteryWeeks() {
        var _thisVal = parseInt(jQuery(".js-luckyLotteryWeeks").val());
        luckyLotteryCalculateAmount(_thisVal);
    }
    
    /**
     * Correct amount:
     * 1 week = 4.34,
     * 2 weeks = 8.67,
     * 3 weeks = 13.00,
     * 4 weeks = 17.34,
     * 5 weeks = 21.67
     * @param value number of entries per week
     */
    function luckyLotteryCalculateAmount(value){
        if (Number.isInteger(value)) {
        var amount = '0.00';
        switch (value) {
        case 2:
        amount = '8.67';
        break;
        case 3:
        amount = '13.00';
        break;
        case 4:
        amount = '17.34';
        break;
        case 5:
        amount = '21.67';
        break;
        default:
        amount = '4.34';
        break;
        }
    
        jQuery('.js-luckyLotteryAmount').html(amount);
        jQuery('input[data-sc-field-name="Amount"]').val(amount);
        jQuery('.js-luckyLotteryCollectionSection').find('input[type=hidden]').val(amount);
        sessionStorage.setItem("donation_amount", amount);
        }
       }
    
    /**
     * set lucky lottery amount on page load (if it was set before)
     */
    window.luckyLotteryPersistAmount = function(){
        var _thisVal = parseInt(jQuery(".js-luckyLotteryWeeks").val());
        luckyLotteryCalculateAmount(_thisVal);
    };
    
    
    
    // SESSION VARS FOR VARIOUS TRACKING
    function establishTracking() {
        // driven by field name PlayPrompt
        jQuery("[data-sc-field-name='DonationPromptList']").change(function () {
            sessionStorage.setItem("donation_prompt", jQuery('[data-sc-field-name="DonationPromptList"]').val());
        });
    
        // This section needs a class name .StayInTouchChoicesSection
        var stayInTouchChoices = [];
        jQuery('.StayInTouchChoicesSection input[type="checkbox"]').change(function() {
            stayInTouchChoices = [];
            jQuery('.StayInTouchChoicesSection input[type="checkbox"]').each(function () {
                var sThisVal = $(this).data('sc-field-name');
                if (this.checked) {
                    stayInTouchChoices.push(sThisVal);
                }
            });
            sessionStorage.setItem("stay_in_touch", stayInTouchChoices);
        });
    
        // GiftAid
        // value is stored in session
        jQuery("[data-sc-field-name='GiftAidSelection']").change(function () {
            var btnName = this.name;
            var giftAid = $("input:radio[name='"+btnName+"']:checked").val();
            sessionStorage.setItem("gift_aid", giftAid);
        });
    
        // GiftAid
        // value is stored in session
        jQuery("[data-sc-field-name='GiftAidChoices']").change(function () {
            var btnName = this.name;
            var giftAid = $("input:radio[name='"+btnName+"']:checked").val();
            sessionStorage.setItem("gift_aid", giftAid);
        });
    
        // driven by field name AlternativeFormat
        jQuery("[data-sc-field-name='AlternativeFormat']").change(function () {
            sessionStorage.setItem("alternative_format", jQuery('[data-sc-field-name="AlternativeFormat"]').val());
        });
    
        // driven by field name GiftAidSelection
        jQuery("[data-sc-field-name='SponsoringFor']").change(function () {
            var btnName = this.name;
            var giftAid = $("input:radio[name='"+btnName+"']:checked").val();
            sessionStorage.setItem("selected_sponsoring", giftAid);
        });
    
    }
    
    function checkDobFields() {
        var dateOfBirth = [];
        jQuery(".form__dob select").on('change', function() {
            dateOfBirth = [];
            jQuery('.form__dob > div select').each(function () {
                var selectValue = jQuery(this).val();
                jQuery(this).removeClass("input-validation-error");
                if (selectValue != null ) {
                    dateOfBirth.push(selectValue);
                }
            });
    
            if (dateOfBirth.length < 3) {
                jQuery(".js-validateDOB").val('');
            } else {
    
                // validate date
                var dateParts = dateOfBirth.join(",");
                var actualDate = new Date(dateParts);
                //console.log(actualDate);
                var todaysDate = new Date();
                //console.log(todaysDate);
                var oneDay = 24*60*60*1000;
                var diffDays = Math.round(Math.abs((actualDate.getTime() - todaysDate.getTime())/(oneDay)));
                //console.log(diffDays + ' - ' + diffDays/365);
    
                if (jQuery(".js-validateDOB").hasClass("js-validate16")) {
                    //console.log('check 16');
                    if ((diffDays/365) > 16.01) {
                        // is over 16
                        jQuery(".js-validateDOB").val(dateOfBirth);
                        jQuery(".js-validateDOB + .field-validation-error").empty();
                    } else {
                        // console.log('not over 16');
                        jQuery(".js-validateDOB").val('');
                    }
                } else {
                    jQuery(".js-validateDOB").val(dateOfBirth);
                    jQuery(".js-validateDOB + .field-validation-error").empty();
                }
    
            }
        });
    
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
              var attributeValue = jQuery(mutation.target).prop(mutation.attributeName);
              //console.log("Class attribute changed to:", attributeValue);
              if (attributeValue.indexOf("input-validation-error") >= 0){
                jQuery('.form__dob > div select').each(function () {
                    jQuery(this).addClass("input-validation-error");
                });
              } else {
                jQuery('.form__dob > div select').each(function () {
                    jQuery(this).removeClass("input-validation-error");
                });
              }
            }
          });
        });
        var $div = jQuery(".js-validateDOB");
        if ($div.length > 0) {
            observer.observe($div[0], {
            attributes: true
            });
        }
    
        //js-validateDOB - to hide
        jQuery(".js-validateDOB").css("visibility", "hidden");
        jQuery(".js-validateDOB").css("height", "0");
        jQuery(".js-validateDOB").css("margin", "0");
        jQuery(".js-validateDOB").css("padding", "0");
    
        var validateDOBid = jQuery(".js-validateDOB").attr("id");
        jQuery("label[for='"+validateDOBid+"']").hide();
    
        // on page load, if hidden dob has a value, use it to fill the drop downs
        var dobValue = jQuery(".js-validateDOB").val();
        if (dobValue) {
            var dobArr = dobValue.split(',');
            if (dobArr.length > 0) {
                var tempDay = dobArr[0];
                jQuery(".form__dob-day select").val(tempDay);
                var tempMonth = dobArr[1];
                jQuery(".form__dob-month select").val(tempMonth);
                var tempYear = dobArr[2];
                jQuery(".form__dob-year select").val(tempYear);
            }
        }
    }
    
    document.addEventListener("DOMContentLoaded", function(event) {
        // check idle time of the user on form pages to prevent form session timeout issues
        if(jQuery('.form__donation').length){
            // manually set formtimeout
            if(typeof formTimeout !== "undefined"){
                if (formTimeout === 1){
                    formTimeout = 240;
                }
    
                setTimeout(function(){ window.location = '/'; }, (formTimeout * 60000));
            }
        }
    });
    
    // handle the loved one data ready for the thank you page
    jQuery("body").on("change", ".js-lovedOneDropdown", function (e) {
        var selectedLovedOne = jQuery('.js-lovedOneDropdown').val();
        // fill the hidden field
        jQuery('.js-lovedOneOtherSection').find('[data-sc-field-name="LovedOneEntered"]').val(selectedLovedOne);
    });
    
    // if the loved one has been manually entered, replace the value from above
    jQuery("body").on("blur", ".js-lovedOneOther", function (e) {
        var selectedLovedOne = jQuery('.js-lovedOneOther').val();
        // fill the hidden field
        jQuery('.js-lovedOneOtherSection').find('[data-sc-field-name="LovedOneEntered"]').val(selectedLovedOne);
    });
}
