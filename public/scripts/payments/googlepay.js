
    /**
     * Define the version of the Google Pay API referenced when creating your
     * configuration
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
         */
    var baseRequest = {
        apiVersion: 2,
    apiVersionMinor: 0
  };
  
  /**
   * Card networks supported by your site and your gateway
   *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    * @todo confirm card networks supported by your site and gateway
    */
   //const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
   var allowedCardNetworks = ["AMEX", "MASTERCARD", "VISA"];
   
   /**
    * Card authentication methods supported by your site and your gateway
    *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    * @todo confirm your processor supports Android device tokens for your
    * supported card networks
    */
   var allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
   
   /**
    * Identify your gateway and your site's gateway merchant identifier
    *
    * The Google Pay API response will return an encrypted payment method capable
    * of being charged by a supported gateway after payer authorization
    *
    * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
    */
   var tokenizationSpecification = {
        type: 'PAYMENT_GATEWAY',
  parameters: {
        "gateway": "stripe",
        "stripe:version": stripeVersion,
        "stripe:publishableKey": stripePublishableKey
  }
};

/**
 * Describe your site's support for the CARD payment method and its required
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    */
    var baseCardPaymentMethod = {
        type: 'CARD',
  parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

// Polyfill for Object.assign
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

/**
 * Describe your site's support for the CARD payment method including optional
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    */
    var cardPaymentMethod = Object.assign(
  {},
    baseCardPaymentMethod,
  {
        tokenizationSpecification: tokenizationSpecification
  }
);

/**
 * An initialized google.payments.api.PaymentsClient object or null if not yet set
 *
 * @see {@link getGooglePaymentsClient}
    */
   var paymentsClient = null;
   
   /**
    * Configure your site's support for payment methods supported by the Google Pay
    * API.
    *
    * Each member of allowedPaymentMethods should contain only the required fields,
    * allowing reuse of this base request when determining a viewer's ability
    * to pay and later requesting a supported payment method
    *
 * @returns {object} Google Pay API version, payment methods supported by the site
    */
function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
    baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod]
  }
);
}

/**
* Configure support for the Google Pay API
*
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
    */
function getGooglePaymentDataRequest() {
    var paymentDataRequest = Object.assign({}, baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = googlePayMerchantInfo;
  return paymentDataRequest;
}

/**
 * Return an active PaymentsClient or initialize
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
    */
function getGooglePaymentsClient() {
  if ( paymentsClient === null ) {
      paymentsClient = new google.payments.api.PaymentsClient({ environment: googlePayEnvironment });
    }
    return paymentsClient;
  }
  
  /**
   * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
   *
   * Display a Google Pay payment button after confirmation of the viewer's
   * ability to pay.
   */
function onGooglePayLoaded() {
    var paymentsClient = getGooglePaymentsClient();
    paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(function(response) {
          if (response.result) {
              document.getElementById(settings.googlePayPaymentOptionId).style.display = '';
              addGooglePayButton();
              // @todo prefetch payment data to improve performance after confirming site functionality
              // prefetchGooglePaymentData();
          } else {
              document.getElementById(settings.googlePayPaymentOptionId).style.display = 'none';
          }
      })
      .catch(function(err) {
        // show error in developer console for debugging
          console.error(err);
          document.getElementById(settings.googlePayPaymentOptionId).style.display = 'none';
    });
}

/**
* Add a Google Pay purchase button alongside an existing checkout button
*
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
    */
function addGooglePayButton() {
    var paymentsClient = getGooglePaymentsClient();
    var button =
      paymentsClient.createButton({onClick: onGooglePaymentButtonClicked, buttonType: 'short'});
    document.getElementById('gpay-button-container').appendChild(button);
}

/**
* Provide Google Pay API with a payment amount, currency, and amount status
*
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
    */
function getGoogleTransactionInfo() {
    return googlePayTransactionInfo;
}

/**
 * Prefetch payment data to improve performance
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
    */
function prefetchGooglePaymentData() {
    var paymentDataRequest = getGooglePaymentDataRequest();
    // transactionInfo must be set but does not affect cache
  paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
    currencyCode: 'GBP'
  };
  var paymentsClient = getGooglePaymentsClient();
  paymentsClient.prefetchPaymentData(paymentDataRequest);
}

/**
 * Show Google Pay payment sheet when Google Pay payment button is clicked
 */
function onGooglePaymentButtonClicked() {
    var paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  
    var paymentsClient = getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
      .then(function(paymentData) {
        // handle the response
        processPayment(paymentData);
    })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
    });
}

/**
* Process payment data returned by the Google Pay API
*
 * @param {object} paymentData response from Google Pay API after user approves payment
 * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
    */
function processPayment(paymentData) {
        // show returned data in developer console for debugging
        console.log(paymentData);
    // @todo pass payment token to your gateway to process payment
    var paymentTokenJson = paymentData.paymentMethodData.tokenizationData.token;
    confirmPaymentWithStripe(paymentTokenJson);
}
