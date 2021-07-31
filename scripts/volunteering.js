const jQuery = require("jquery");

if (process.browser) {
    var opportunites = [];

    /**
     * Removes volunteering from selected opportunites
     */
    jQuery("body").on("click", ".js-volunteeringRemoveLink", function (e) {
        e.preventDefault();
        var _this = jQuery(this);
        var thisId = _this.data('id');
    
        removeElementById(thisId);
        jQuery('.js-volunteeringCheckbox[data-id="' + thisId + '"]').prop('checked', false);
    
        var volunteeringCheckboxes = jQuery('.js-volunteeringCheckbox');
        volunteeringCheckboxes.each(function () {
            var _this = jQuery(this);
            if (!_this.is(':checked')) {
                _this.prop('disabled', false);
            }
        });
        toggleVolunteeringForm();
        toggleSelectedCheckbox();
    });
    
    /**
     * On volunteering item toggle do some logic
     */
    jQuery("body").on("change", ".js-volunteeringCheckbox", function (e) {
        var _this = jQuery(this);
        var thisType = _this.data('type');
        var thisLocation = _this.data('location');
        var thisSupervisor = _this.data('supervisor');
        var thisAddress = _this.data('address');
        var thisDistance = _this.data('distance');
        var thisPositions = _this.data('positions');
        var thisOpportunityName = _this.data('opportunityname');
        var thisRegion = _this.data('region');
        var thisId = _this.data('id');
    
        if (!_this.is(':checked')) {
    
            removeElementById(thisId);
            var volunteeringCheckboxes = jQuery('.js-volunteeringCheckbox');
            volunteeringCheckboxes.each(function () {
                var _this = jQuery(this);
                if (!_this.is(':checked')) {
                    _this.prop('disabled', false);
                }
            });
    
        } else {
    
            // if there is less then 2 opportunity selected add to opportunites
            if (opportunites.length < 2) {
    
                opportunites.push({
                    id: thisId,
                    type: thisType,
                    location: thisLocation,
                    supervisor: thisSupervisor,
                    address: thisAddress,
                    distance: thisDistance,
                    positions: thisPositions,
                    opportunityname: thisOpportunityName,
                    region: thisRegion
                });
    
                selectedVolunteering();
            }
    
            // if there is 2 or more selected opportunity block ui
            if (opportunites.length === 2) {
                var volunteeringCheckboxes = jQuery('.js-volunteeringCheckbox');
                volunteeringCheckboxes.each(function () {
                    var _this = jQuery(this);
                    if (!_this.is(':checked')) {
                        _this.prop('disabled', true);
                    }
                });
            }
    
        }
    
        toggleVolunteeringForm();
    
    });
    
    jQuery("body").on("change", ".js-volunteeringQuestion input[type='radio']", function (e) {
        var _this = jQuery(this);
        var thisVal = _this.val();
        jQuery('.js-volunteeringFormError').hide();
        if (thisVal === "No" && opportunites.some(function (e) {
        return e.type === 'Puppy Walker';
        })) {
        jQuery('.js-volunteeringScreening').removeClass('display-none');
        jQuery('.js-volunteeringProceedBtn').prop('disabled', true);
        }else if(thisVal === "No"){
            jQuery('.js-volunteeringProceedBtn').prop('disabled', false);
        }else {
            jQuery('.js-volunteeringScreening').addClass('display-none');
            jQuery('.js-volunteeringProceedBtn').prop('disabled', true);
        }
    });
    
    /**
     * Check volunteering checkboxes
     */
    jQuery("body").on("change", ".js-volunteeringScreening input[type='radio']", function (e) {
        e.preventDefault();
        var volunteering = jQuery(".js-volunteeringScreening input[type='radio'][value='Yes']");
        var volunteeringNoRadios = jQuery(".js-volunteeringScreening input[type='radio'][value='No']:checked");
        var volunteeringLength = jQuery(".js-volunteeringScreening input[type='radio']");
        var volunteeringChecked = 0;
        volunteering.each(function () {
            var _this = jQuery(this);
            if(_this.is(':checked')){
                volunteeringChecked = volunteeringChecked + 1;
            }
        });
    
        console.log('run');
    
        if((volunteeringLength.length/2) === volunteeringChecked){
            jQuery('.js-volunteeringProceedBtn').prop('disabled', false);
        }else {
            jQuery('.js-volunteeringProceedBtn').prop('disabled', true);
        }
    
        if(volunteeringNoRadios.length > 0){
            jQuery('.js-volunteeringFormError').show();
        }else {
            jQuery('.js-volunteeringFormError').hide();
        }
    
    });
    
    
    /**
     * Proceed to volunteering form
     */
    /* jQuery("body").on("click", ".js-volunteeringProceedBtn", function (e) {
        e.preventDefault();
        var _this = jQuery(this);
    
        var searchData = {
            "role1": "test role 1",
            "role2": "test role 2",
            "postCode": "so166pn"
        };
    
        if((_this.is(':disabled')) || (_this.hasClass('is-disabled'))){
            alert('is disabled');
        }else {
            $.ajax({
                type: "POST",
                url: siteUrl+"/api/sitecore/volunteeringApi/InsertVolunteeringRequest",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(searchData),
                success: function (response) {
                    console.log(response);
                    console.log('success');
    
                },
    
                error: function() {
                    console.log("oops");
                }
    
            });
        }
    }); */
    
    /**
     * Creates volunteering items in volunteering form
     */
    function selectedVolunteering() {
        var volunteeringUl = jQuery('.js-volunteeringUl');
        var volunteeringUlRemove = jQuery('.js-volunteeringUlRemove');
    
        volunteeringUl.empty();
        volunteeringUlRemove.empty();
        opportunites.forEach(function (entry, i) {
            jQuery('.js-volunteeringRole'+i+' [data-sc-field-name]').val(entry.type +': '+entry.location);
            volunteeringUl.append('<li class="c-volunteering__list-item c-volunteering__list-item--modified"> <span class="c-donateAnHourResults__opportunities c-donateAnHourResults__opportunities--modified"><span class="c-donateAnHourResults__opportunities--type">' + entry.type + '</span> <p class="c-donateAnHourResults__opportunities--location">' + entry.location + '</p></span><a class="c-volunteering__remove-link js-volunteeringRemoveLink" data-id="' + entry.id + '" href="/" title="remove this role">Remove this role</a></li>');
            if(entry.type === "Puppy Walker"){
                volunteeringUlRemove.append('<li class="c-volunteering__list-item c-volunteering__list-item--modified"> <span class="c-donateAnHourResults__opportunities c-donateAnHourResults__opportunities--modified"><span class="c-donateAnHourResults__opportunities--type">' + entry.type + '</span> <p class="c-donateAnHourResults__opportunities--location">' + entry.location + '</p></span><a class="c-volunteering__remove-link js-volunteeringRemoveLink" data-id="' + entry.id + '" href="/" title="remove this role">Remove this role</a></li>');
            }
            jQuery('.js-volunteeringSupervisor'+i+' [data-sc-field-name]').val(entry.supervisor);
            jQuery('.js-volunteeringDistance'+i+' [data-sc-field-name]').val(entry.distance);
            jQuery('.js-volunteeringAddress'+i+' [data-sc-field-name]').val(entry.region);
            jQuery('.js-volunteeringPositionsAvailable'+i+' [data-sc-field-name]').val(entry.positions);
            jQuery('.js-volunteeringOpportunityName'+i+' [data-sc-field-name]').val(entry.opportunityname);
    
        });
        var postcode = jQuery('#postcode').val();
        jQuery('.js-volunteeringPostcode [data-sc-field-name]').val(postcode);
    
        toggleSelectedCheckbox();
    };
    
    /**
     * Removes opportunity from opportunites by id
     */
    function removeElementById(id) {
      var thisId = id;
      opportunites = opportunites.filter(function (x) {
        return x.id != thisId;
      });
      selectedVolunteering();
    };
    
    /**
     * Toggles Volunteering form
     */
    function toggleVolunteeringForm() {
        if (opportunites.length) {
            jQuery('.js-volunteeringForm').show();
    
            jQuery('html, body').animate({
                scrollTop: $(".js-volunteeringForm").offset().top
            }, 1000);
    
            jQuery('.js-volunteeringProceedBtn').prop('disabled', true);
    
            // reset radio buttons
            jQuery(".js-volunteeringForm input:radio").prop('checked', false);
            jQuery(".js-volunteeringQuestion input:radio").removeAttr('checked');
            jQuery('.js-volunteeringScreening').hide();
            jQuery('.js-volunteeringFormError').hide();
    
        } else {
            jQuery('.js-volunteeringForm').hide();
        }
    };
    
    /**
     * Toggles Selected Volunteering state
     */
    // store role in session for data tracking
    var rolesSelected = [];
    var locationsSelected = [];
    
    function toggleSelectedCheckbox() {
        var volunteeringCheckboxes = jQuery('.js-volunteeringCheckbox');
        rolesSelected = [];
        locationsSelected = [];
        volunteeringCheckboxes.each(function () {
            var _this = jQuery(this);
            var thisId = _this.data('id');
            if (_this.is(':checked')) {
                jQuery('.js-volunteeringCheckbox[data-id="' + thisId + '"]').parent().parent().addClass('is-selected');
                rolesSelected.push(_this.data("type"));
                locationsSelected.push(_this.data("location"));
            } else {
                jQuery('.js-volunteeringCheckbox[data-id="' + thisId + '"]').parent().parent().removeClass('is-selected');
            }
        });
        sessionStorage.setItem("roles_selected", rolesSelected);
        sessionStorage.setItem("locations_selected", locationsSelected);
    };
    
    
    // driven by field name Disabilities
    jQuery("[data-sc-field-name='Disabilities']").change(function () {
        sessionStorage.setItem("disabilities", jQuery('[data-sc-field-name="Disabilities"]').val());
    });

}
