const jQuery = require("jquery");

if (process.browser) {
  window.postcodeLookup = function () {
  
    var postcodeLookups = document.querySelectorAll('.postcode-wrapper');
    var postcodeLookupService;
  
    if (postcodeLookups) {
      for (var i = 0; i < postcodeLookups.length; i++) {
        var scope = postcodeLookups[i];
        var showManual = postcodeLookups[i].querySelector('.postcode-lookup').getAttribute('data-showmanualinputbutton'); //.dataset.showmanualinputbutton
  
        if (postcodeLookups[i].querySelector('.postcode-lookup').getAttribute('data-isnormal') === "True") { //.dataset.isnormal
          var step3 = scope.querySelector('.postcode-lookup-step-3');
          if (step3) {
            postcodeLookupFormAutoFill(scope, showManual);
          };
        }
  
      }
  
      if (postcodeLookups[0]) {
        var data_postcodeSearchUrl = postcodeLookups[0].querySelector('.postcode-lookup').getAttribute('data-postcodesearchurl'); // .dataset.postcodesearchurl
        var data_getAddressUrl = postcodeLookups[0].querySelector('.postcode-lookup').getAttribute('data-getaddressurl'); // .dataset.getaddressurl
      }
  
      postcodeLookupService = {
        postcodeSearchUrl: data_postcodeSearchUrl,
        getAddressUrl: data_getAddressUrl,
  
        getAddressesFromPostcode: function (postcode, callback) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', this.postcodeSearchUrl);
  
          xhr.setRequestHeader('Content-Type', 'application/json');
  
          xhr.onload = function () {
            if (xhr.status === 200) {
              var addresses = JSON.parse(xhr.responseText);
              callback(addresses);
            } else {
              alert("There has been an error.");
            }
          };
          xhr.send(JSON.stringify({
            postcode: postcode
          }));
        },
        getAddressesDetails: function (id, callback) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', this.getAddressUrl);
  
          xhr.setRequestHeader('Content-Type', 'application/json');
  
          xhr.onload = function () {
            if (xhr.status === 200) {
              var details = JSON.parse(xhr.responseText);
  
              callback(details);
            } else {
              alert("There has been an error.");
            }
          };
          xhr.send(JSON.stringify({
            id: id
          }));
        }
      };
    }
  
    //var isNormal = "@(Sitecore.Context.Database.Name.ToLower() != "core")" == "True";
    //var ShowManualInputButton = "@Model.Showmanualinputbutton";
  
    function postcodeLookupFormAutoFill(scope, ShowManualInputButton) {
  
      var supportedClassNames = {
        addressLine1: "auto-fill-address-line-1",
        addressLine2: "auto-fill-address-line-2",
        addressLine3: "auto-fill-address-line-3",
        townCity: "auto-fill-address-town-city",
        county: "auto-fill-address-county",
        postcode: "auto-fill-address-postcode",
      };
  
      var stepClassNames = {
        step1: "postcode-lookup-step-1",
        step2: "postcode-lookup-step-2",
        step3: "postcode-lookup-step-3",
      };
  
      var fieldIds = {
        postcodeLookupInput: "PostcodeLookupInput",
        postcodeLookupButton: "PostcodeLookupButton",
        postcodeAddressResults: "PostcodeAddressResults",
        postcodeAddressResultsSelect: "PostcodeAddressResultsSelect",
        enteredPostcode: "EnteredPostcode",
        backToStep1: "BackToStep1",
        enterManually: "EnterManually",
        hideEnterManuallyIfNotAvailable: "HideEnterManuallyIfNotAvailable",
        postcodeErrorMessage: "PostcodeError"
      };
  
      var elements = {
        addressLine1: scope.getElementsByClassName(supportedClassNames.addressLine1),
        addressLine2: scope.getElementsByClassName(supportedClassNames.addressLine2),
        addressLine3: scope.getElementsByClassName(supportedClassNames.addressLine3),
        townCity: scope.getElementsByClassName(supportedClassNames.townCity),
        county: scope.getElementsByClassName(supportedClassNames.county),
        postcode: scope.getElementsByClassName(supportedClassNames.postcode),
        postcodeLookupButton: scope.querySelector('#' + fieldIds.postcodeLookupButton),
        postcodeLookupInput: scope.querySelector('#' + fieldIds.postcodeLookupInput),
        postcodeAddressResults: scope.querySelector('#' + fieldIds.postcodeAddressResults),
        postcodeAddressResultsSelect: scope.querySelector('#' + fieldIds.postcodeAddressResultsSelect),
        step1: scope.getElementsByClassName(stepClassNames.step1)[0],
        step2: scope.getElementsByClassName(stepClassNames.step2)[0],
        step3s: scope.getElementsByClassName(stepClassNames.step3),
        enteredPostcode: scope.querySelector('#' + fieldIds.enteredPostcode),
        backToStep1: scope.querySelector('#' + fieldIds.backToStep1),
        enterManually: scope.querySelector('#' + fieldIds.enterManually),
        hideEnterManuallyIfNotAvailable: scope.querySelector('#' + fieldIds.hideEnterManuallyIfNotAvailable),
        postcodeErrorMessage: scope.querySelector('#' + fieldIds.postcodeErrorMessage),
        postcodeChangeAddress: scope.querySelector('#PostcodeChangeAddress'),
      };
  
      function showStep1() {
        elements.step1.style.display = "block";
        elements.step2.style.display = "none";
        for (var i = 0; i < elements.step3s.length; i++) {
          elements.step3s[i].style.display = "none";
        }
  
        elements.postcodeErrorMessage.style.display = "none";
        elements.postcodeLookupInput.classList.remove("input-validation-error");
        elements.hideEnterManuallyIfNotAvailable.style.display = "none";
  
  
        if(typeof ShowManualInputButton === "undefined") ShowManualInputButton = postcodeLookups[0].querySelector('.postcode-lookup').getAttribute('data-showmanualinputbutton');
  
        if (ShowManualInputButton.toLowerCase() === "true") {
          elements.hideEnterManuallyIfNotAvailable.style.display = "block";
        }
      }
      /**
       * conditional logic for step 1 of the postcode field.
       * We need to decide which version of the postcode field we need to show, clean or to be edited postcode field
       */
      function step1Logic(){
        // we are checking if the first address is filled in, this is the case if we want to edit the address fields.
        var el = document.getElementsByClassName('auto-fill-address-line-1');
        if (el[0] !== null && el[0].value !== "")
        {
          elements.step3s[0].style.display = "block";
          elements.step1.style.display = "none";
          elements.step2.style.display = "none";
  
          // don't show the change postcode button on volunteering form
          var hiddenPostcode = jQuery('.js-volunteeringSavedPostcode');
          if(!hiddenPostcode.length){
            elements.postcodeChangeAddress.style.display = "block";
          }
  
        }else {
          // show step 1 when the user needs to enter address
          showStep1();
        }
      }
  
      function showStep2() {
        elements.step1.style.display = "none";
        elements.step2.style.display = "block";
  
        elements.enteredPostcode.innerText = elements.postcodeLookupInput.value;
      }
  
      function showStep3() {
        for (var i = 0; i < elements.step3s.length; i++) {
          elements.step3s[i].style.display = "block";
        }
  
        elements.hideEnterManuallyIfNotAvailable.style.display = "none";
      }
  
      function removeOptions(selectbox) {
        var i;
        for (i = selectbox.options.length - 1; i >= 0; i--) {
          selectbox.remove(i);
        }
      }
  
      function addOption(selectbox, text, value) {
        var optn = document.createElement("OPTION");
        optn.text = text;
        optn.value = value;
        selectbox.options.add(optn);
      }
  
      function populateResultsSelect(addresses) {
        var dropdown = elements.postcodeAddressResultsSelect;
  
        if (dropdown) {
          removeOptions(dropdown);
  
          addOption(dropdown, "Please select an address", "");
  
          for (var i = 0; i < addresses.length; ++i) {
            var address = addresses[i];
            addOption(dropdown, address.DisplayAddress, address.Id);
          }
  
        }
      }
  
      function searchForPostcode(event) {
        if (event) {
          event.preventDefault();
        }
  
        var postcode = elements.postcodeLookupInput.value;
  
        var regex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/i; // UK Postcode regex
        var postcodeValid = regex.test(postcode);
  
        elements.hideEnterManuallyIfNotAvailable.style.display = "block";
  
        if (!postcodeValid) {
          elements.postcodeErrorMessage.style.display = "block";
          elements.postcodeLookupInput.classList.add("input-validation-error");
          elements.postcodeLookupInput.setAttribute('aria-invalid', 'true');
          elements.postcodeLookupInput.setAttribute('aria-describedBy', 'PostcodeError');
          elements.postcodeLookupInput.focus();
          return;
        }
  
        postcodeLookupService.getAddressesFromPostcode(postcode, function (addresses) {
          populateResultsSelect(addresses);
          showStep2();
          if(elements.postcodeAddressResultsSelect) { elements.postcodeAddressResultsSelect.focus(); }
        });
      }
  
      function fillInForm() {
        var selectedIndex = elements.postcodeAddressResultsSelect.selectedIndex;
        var selectedValue = elements.postcodeAddressResultsSelect.options[selectedIndex].value;
  
        if (!selectedValue) {
          // This is the default option, don't call the service.
          return;
        }
  
        postcodeLookupService.getAddressesDetails(selectedValue, function (details) {
  
          document.getElementById("SelectAddressError").style.display = "none";
  
          if (elements.addressLine1.length) {
            elements.addressLine1[0].value = details["Line1"];
          }
  
          if (elements.addressLine2.length) {
            elements.addressLine2[0].value = details["Line2"];
          }
  
          if (elements.addressLine3.length) {
            elements.addressLine3[0].value = details["Line3"];
          }
  
          if (elements.townCity.length) {
            elements.townCity[0].value = details["TownCity"];
          }
  
          //if (elements.county.length) {
          // elements.county[0].value = details["County"];
          //}
  
          if (elements.postcode.length) {
            elements.postcode[0].value = details["Postcode"];
          }
  
        });
  
        if (elements.step3s.length) {
          showStep3();
        }
      }
  
      function hasAddressAlreadyEntered() {
        if (elements.addressLine1[0] && elements.addressLine1[0].value) {
          return true;
        }
  
        if (elements.addressLine2[0] && elements.addressLine2[0].value) {
          return true;
        }
  
        if (elements.addressLine3[0] && elements.addressLine3[0].value) {
          return true;
        }
  
        if (elements.townCity[0] && elements.townCity[0].value) {
          return true;
        }
  
        // if (elements.county[0] && elements.county[0].value) {
        // return true;
        //}
  
        if (elements.postcode[0] && elements.postcode[0].value) {
          return true;
        }
  
        return false;
      }
  
      // On load hide the second stage of the form.
      step1Logic();
  
      // Events to listen for.
  
      // Step 1
      elements.postcodeLookupButton.addEventListener('click', searchForPostcode, false);
      elements.postcodeLookupButton.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          searchForPostcode(event);
        }
      });
  
      // validate UK postcode on focusout
      elements.postcodeLookupInput.addEventListener("focusout", function (event) {
        event.preventDefault();
        var postcode = this.value;
        var regex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/i; // UK Postcode regex
        if (postcode.length === 0) return;
        var postcodeValid = regex.test(postcode);
        if (!postcodeValid) {
          elements.postcodeErrorMessage.style.display = "block";
          elements.postcodeLookupInput.classList.add("input-validation-error");
          elements.postcodeLookupInput.setAttribute('aria-invalid', 'true');
          elements.postcodeLookupInput.setAttribute('aria-describedBy', 'PostcodeError');
          return;
        }else {
          elements.postcodeErrorMessage.style.display = "none";
        }
      });
  
      // Trigger this postcode script when postcode is saved in cookie
      setTimeout(function(){
  
        var hiddenPostcode = jQuery('.js-volunteeringSavedPostcode');
  
       if(hiddenPostcode.length){
        var hiddenPostcode = jQuery('input[data-sc-field-name="Postcode"]').val();
        postcodeLookupService.getAddressesFromPostcode(hiddenPostcode, function (addresses) {
          populateResultsSelect(addresses);
  
          elements.step1.style.display = "none";
          elements.step2.style.display = "block";
  
          elements.enteredPostcode.innerText = hiddenPostcode;
          elements.postcode[0].readOnly = true;
          jQuery('.auto-fill-address-postcode').val(hiddenPostcode)
          elements.backToStep1.style.display = "none";
        });
  
      }
  
  
      },500);
  
      // Step 2
      elements.backToStep1.addEventListener('click', function (event) {
        if (event) {
          event.preventDefault();
        }
  
        showStep1();
        jQuery("#PostcodeLookupInput").focus();
      }, false);
  
      elements.postcodeChangeAddress.addEventListener('click', function (event) {
        elements.postcodeChangeAddress.style.display = "none";
        showStep1();
      }, false);
  
      elements.postcodeAddressResultsSelect.addEventListener('change', fillInForm, false)
  
      // Step 3
  
      if (!elements.step3s.length) {
        // Hide the button that allows entering manually if step 3 not available.
        elements.hideEnterManuallyIfNotAvailable.style.display = "none";
      } else {
        // Or Hide step 3 until enter manually is clicked (or a postcode is found).
  
        if (!hasAddressAlreadyEntered()) {
          for (var i = 0; i < elements.step3s.length; i++) {
            elements.step3s[i].style.display = "none";
          }
        }
  
        elements.hideEnterManuallyIfNotAvailable.addEventListener('click', function (event) {
          if (event) {
            event.preventDefault();
          }
  
          showStep3();
          // clear existing fields
          if (elements.addressLine1.length) {
            elements.addressLine1[0].value = '';
          }
  
          if (elements.addressLine2.length) {
            elements.addressLine2[0].value = '';
          }
  
          if (elements.addressLine3.length) {
            elements.addressLine3[0].value = '';
          }
  
          if (elements.townCity.length) {
            elements.townCity[0].value = '';
          }
  
          if (elements.county.length) {
            elements.county[0].value = '';
          }
  
          if (elements.postcode.length) {
            var hiddenPostcode = jQuery('input[data-sc-field-name="Postcode"]');
            if(hiddenPostcode.length === 0){
              elements.postcode[0].value = '';
            }
  
  
  
          }
  
        }, false);
      }
    }
  }
  
  window.postcodeLookup();
}
