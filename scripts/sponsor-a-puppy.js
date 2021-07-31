const jQuery = require("jquery");
// contains list of selected puppies
var selectedPuppies = [];
var selectedPuppiesNames = [];


if (process.browser) {
    // Site url
    var siteUrl = location.protocol + '//' + location.hostname;

    jQuery("body").on("change", "input[name='amount_pod']", function (e) {
        // e.preventDefault()
        sponsorAPuppyMonthlyDonation()
    })

    jQuery("body").on("change", ".js-sponsorAPuppyPuppies", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val();
        var puppyName = _this.attr('data-name');
    
        selectedPuppies = [];
        selectedPuppiesNames = [];
        jQuery('.js-sponsorAPuppyPuppies').each(function (i) {
            var sThisVal = $(this).val();
            var puppyName = $(this).attr('data-name');
            if (this.checked) {
                selectedPuppies.push(sThisVal);
                selectedPuppiesNames.push(puppyName);
            } else {
                var index = selectedPuppies.indexOf(sThisVal);
                if (index !== -1) selectedPuppies.splice(index, 1);
    
                var index = selectedPuppiesNames.indexOf(puppyName);
                if (index !== -1) selectedPuppiesNames.splice(index, 1);
            }
        });
    
        // reset puppy names
        jQuery('input[data-sc-field-name="puppyname1"], input[data-sc-field-name="puppyname2"], input[data-sc-field-name="puppyname3"]').val('');
        // fill in puppy names into hidden puppy field
        for (var i = 0; i < selectedPuppiesNames.length; i++) {
            jQuery('input[data-sc-field-name="puppyname'+ [i+1] +'"]').val(selectedPuppiesNames[i]);
        }
    
        jQuery('.js-sponsorAPuppyPuppiesValidation input[data-sc-field-name="SelectAPuppyValidation"]').val(selectedPuppiesNames);
        sessionStorage.setItem("selected_puppies", selectedPuppies)
        sessionStorage.setItem("selected_puppies_name", selectedPuppiesNames)
        jQuery('input[data-sc-field-name="PuppyNames"]').val(arrayToStringForEmail(selectedPuppiesNames));
        jQuery('input[data-sc-field-name="numberofpuppies"]').val(selectedPuppiesNames.length);
        sponsorAPuppyMonthlyDonation();
    });
    
    /**
     * Turns array to an 'and' separated string
     * @param {Array} puppyNames
     */
    function arrayToStringForEmail(names){
        var result;
        if(names.length > 1){
            result = names.join(' and ');
        }else {
            result = names.toString();
        }
        return result;
    }
    
    /**
     * Turns puppy value eg puppy_1 to the real puppy name eg. Archie
     * @param {string} puppyName
     */
    function searchPuppyName(puppyName){
        var puppyRealName = jQuery('input[data-sc-field-name="'+puppyName+'"]').val();
        return puppyRealName;
    }
    
    // set sponsorship option  in cookie
    jQuery("body").on("change", ".js-sponsorAPuppySponsorship input[type='radio']", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val().toLowerCase();
        sessionStorage.setItem("selected_sponsorship", thisVal);
        fillInWhyThisAmount();
    });
    
    // on sponsor a puppy 2nd step when clicking the submit button we should add some data to a hidden field.
    jQuery("body").on("click", ".js-sponsorAPuppyToPayment", function (e) {
        var recipientNames = [];
    
        var RecipientFirstName1 = jQuery('input[data-sc-field-name="RecipientFirstName1"]').val();
        if(RecipientFirstName1 && RecipientFirstName1.length){
            recipientNames.push(RecipientFirstName1);
        }
        var RecipientFirstName2 = jQuery('input[data-sc-field-name="RecipientFirstName2"]').val();
        if(RecipientFirstName2 && RecipientFirstName2.length){
            recipientNames.push(RecipientFirstName2);
        }
        var RecipientFirstName3 = jQuery('input[data-sc-field-name="RecipientFirstName3"]').val();
        if(RecipientFirstName3 && RecipientFirstName3.length){
            recipientNames.push(RecipientFirstName3);
        }
    
        jQuery('input[data-sc-field-name="RecipientNames"]').val(arrayToStringForEmail(recipientNames));
    
        var nrOfSelectedPuppies = sessionStorage.getItem("selected_puppies_name").split(",");
        jQuery('input[data-sc-field-name="SponsoringFor"]').val(sessionStorage.getItem("selected_sponsoring")+""+nrOfSelectedPuppies.length);
    
        // generateCertificateUrl();
        generatePuppyPhotoZips();
    
    });
    
    
    jQuery("body").on("change", ".js-sponsorAPuppySponsoring input[type='radio']", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val().toLowerCase();
        sessionStorage.setItem("selected_sponsoring", thisVal);
        if(thisVal === 'myself'){
            jQuery('input[data-sc-field-name="SponsoringPuppyFor"]').val('for yourself');
        }else if(thisVal === 'gift'){
            jQuery('input[data-sc-field-name="SponsoringPuppyFor"]').val('as a gift');
        }
    });
    
    /**
     * Stores first name into session
     * values needs to be stored in session to reused later.
     */
    jQuery("body").on("change", "input[data-sc-field-name='FirstName']", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val().toLowerCase();
        sessionStorage.setItem("first_name", thisVal);
    });
    
    /**
     * Stores last name into session
     * values needs to be stored in session to reused later.
     */
    jQuery("body").on("change", "input[data-sc-field-name='LastName']", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val().toLowerCase();
        sessionStorage.setItem("last_name", thisVal);
    });
    
    jQuery("body").on("click", ".js-SAPAddress", function (e) {
        generateCertificateUrl();
    });
    
    jQuery("body").on("click", ".js-SAPReferences", function (e) {
        generateCertificateUrl();
    });
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    /**
     * Generate Certificate Url to be placed in a hidden field
     */
    function generateCertificateUrl(){
        var firstName = capitalizeFirstLetter(sessionStorage.getItem("first_name"));
        var lastName = capitalizeFirstLetter(sessionStorage.getItem("last_name"));
        var puppies = sessionStorage.getItem("selected_puppies_name");
        var sponsoringType = sessionStorage.getItem("selected_sponsoring");
    
        if(sponsoringType === 'myself'){
            jQuery.get(siteUrl + "/guidedogsapi/sapdownloads/GetCertificateLink?firstname1="+firstName+"&lastname1="+lastName+"&puppy1="+puppies, function( data ) {
                jQuery('input[data-sc-field-name="CertificateUrl"]').val(data);
            });
        }else {
            var selectedPuppyNames = puppies.split(",");
            var recipients = [];
    
            jQuery('input[data-sc-field-name^="RecipientFirstName"]').each(function(i) {
                var _this = jQuery(this);
                var thisName = _this.attr('data-sc-field-name');
                var thisIndex = thisName.substr(thisName.length - 1);
                var RecipientFirstName = encodeURIComponent(jQuery('input[data-sc-field-name="RecipientFirstName'+[thisIndex]+'"]').val());
                var RecipientLastName = encodeURIComponent(jQuery('input[data-sc-field-name="RecipientLastName'+[thisIndex]+'"]').val());
                if(RecipientFirstName && selectedPuppyNames[i]){
                    recipients.push({firstName:RecipientFirstName, lastName: RecipientLastName, puppy: selectedPuppyNames[i]});
                }
            });
    
            if(recipients.length){
                for (var i = 0; i < recipients.length; i++) {
                    jQuery.ajax({
                        url: siteUrl + "/guidedogsapi/sapdownloads/GetCertificateLink?firstname1="+recipients[i].firstName+"&lastname1="+recipients[i].lastName+"&puppy1="+recipients[i].puppy,
                        success: function (data) {
                            jQuery('input[data-sc-field-name="RecipientFirstNameSAP'+ [i+1] +'"]').val(decodeURIComponent(recipients[i].firstName));
                            jQuery('input[data-sc-field-name="RecipientLastNameSAP'+ [i+1] +'"]').val(decodeURIComponent(recipients[i].lastName));
                            jQuery('input[data-sc-field-name="CertificateUrl'+ [i+1] +'"]').val(data);
                        },
                        async: false
                    });
                }
            }
        }
    }
    
    /**
     * Generate puppy photo zip urls to be placed in a hidden field
     */
    function generatePuppyPhotoZips(){
        var selectedPuppyNames = sessionStorage.getItem("selected_puppies_name");
        selectedPuppyNames = selectedPuppyNames.split(",");
        for (var i = 0; i < selectedPuppyNames.length; i++) {
            jQuery('input[data-sc-field-name="ImageUrl'+ [i+1] +'"]').val("/guidedogsapi/SAPPuppyPhotoZipCreator/GeneratePuppyPhotosZip?puppy1="+selectedPuppyNames[i]);
            // jQuery('input[data-sc-field-name="ImageUrl'+ [i+1] +'"]').val(siteUrl + "/guidedogsapi/SAPPuppyPhotoZipCreator/GeneratePuppyPhotosZip?puppy"+[i+1]+"="+selectedPuppyNames[i]);
        }
    }
    
    function sponsorAPuppyMonthlyDonation() {
        var amountRadio = jQuery('.js-amountPodAmountRadio');
        var puppies = selectedPuppies.length >= 2 ? selectedPuppies.length : 1;
        amountRadio.each(function() {
            var _this = jQuery(this);
            var thisValue = parseFloat(_this.attr('data-value')).toFixed(2);
            var finalPrice = (thisValue*puppies).toFixed(2);
            var parent = _this.parentsUntil(".donation__amount__item");
            parent.find('.js-amountPodAmount').html(finalPrice);
            parent.find('.js-amountPodAmountRadio').val(finalPrice);
    
            // update custom amount input value when nr of puppies change
            if(_this.is(':checked')){
                jQuery('.js-amountPod').val(finalPrice);
                sessionStorage.setItem("donation_amount", finalPrice);
            }
            fillInWhyThisAmount();
          });
    };
    
    function fillInWhyThisAmount(){
        var puppies = selectedPuppies.length >= 2 ? selectedPuppies.length : 1;
        var whyThisAmount = jQuery('.js-donationAmountWhyThisAmount');
        if (sessionStorage.getItem("selected_sponsorship") !== null) {
            var sponsorship = sessionStorage.getItem("selected_sponsorship");
            if(sponsorship === "monthly"){
                var whyThisAmountValue = parseFloat(whyThisAmount.attr('data-monthly')).toFixed(2);
            }else{
                var whyThisAmountValue = parseFloat(whyThisAmount.attr('data-single')).toFixed(2);
            }
        }else {
            var whyThisAmountValue = parseFloat(whyThisAmount.attr('data-monthly')).toFixed(2);
        }
        whyThisAmount.html((whyThisAmountValue*puppies));
        jQuery('.js-amountPod').attr({
            "min" : parseFloat(whyThisAmountValue*puppies).toFixed(2)
        });
    };
    
    /**
     * Pre select a puppy based on url query string
     * for example, /url?puppy_selected=puppy_1
     */
    window.preSelectPuppy = function(){
        var params = "";
    
        if(jQuery('.js-sponsorAPuppySponsoring').length){
    
        var urlParams = urlParam('puppy_selected');
        var resetPuppy = false;
        if(window.location.hash) {
            var hash = window.location.hash.substring(1);
            if (hash == "reset") {
                resetPuppy = true;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        }
    
        if(sessionStorage.getItem("selected_puppies") === null || resetPuppy){
            if(urlParams && urlParams.length){
                params = urlParams;
              //  sessionStorage.setItem("selected_puppies", params);
              sessionStorage.setItem("selected_puppies", '');
              sessionStorage.setItem("selected_puppies_name", '');
            }
        }else {
            params =  sessionStorage.getItem("selected_puppies");
        }
    
    /*     if (!urlParams && sessionStorage.getItem("selected_puppies") != null) {
            params =  sessionStorage.getItem("selected_puppies");
        }
     */
    
        if(jQuery(".js-sponsorAPuppySponsorship input[type='radio']:checked").length){
            jQuery(".js-sponsorAPuppySponsorship input[type='radio']:checked").change();
        }
    
        var paramsArray = params.split(",");
        for (var i = 0; i < paramsArray.length; i++) {
            jQuery(".js-sponsorAPuppyPuppies").each(function() {
                var _this = jQuery(this);
                if(_this.val() === paramsArray[i]){
                    _this.prop('checked', true).change();
                }
            });
        }
    }
    
    
    };
    
    function urlParam(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null){
           return null;
        }
        else {
           return decodeURI(results[1]) || 0;
        }
    }
    
    
    /**
     * Appends selected puppy names into the sponsor a puppy form
     */
    window.sponsorAPuppyNames = function() {
        var puppyNamesString = "";
        if (sessionStorage.getItem("selected_puppies_name") !== null) {
            var selectedPuppyNames = sessionStorage.getItem("selected_puppies_name");
            selectedPuppyNames = selectedPuppyNames.split(",");
            for (var i = 0; i < selectedPuppyNames.length; i++) {
                // on the last iteration add different string
                if((i + 1) == (selectedPuppyNames.length)){
                    puppyNamesString = puppyNamesString + '<span class="text-color-primary">' + selectedPuppyNames[i] + '</span>';
                }else {
                    puppyNamesString = puppyNamesString + '<span class="text-color-primary">' + selectedPuppyNames[i] + '</span> and ';
                }
            }
            jQuery('.js-sponsorAPuppySelectedNames').html(puppyNamesString);
            if (sessionStorage.getItem("selected_sponsorship") !== null) {
                jQuery('.js-sponsorAPuppyPaymentType').html('<span class="text-color-primary">' + sessionStorage.getItem("selected_sponsorship") + '</span>');
            }
    }
    };
}
