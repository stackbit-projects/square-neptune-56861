
if (typeof $ === 'undefined') {
    window.addEventListener('load',
        function () {
            initStripePayment();
        });
} else {
    initStripePayment();
}

function initStripePayment() {

    $.getScript("https://js.stripe.com/v3/")
        .done(function (script, textStatus) {
            console.log(textStatus);
            stripeApiLoaded();
        })
        .fail(function (jqxhr, settings, exception) {
            console.error("Error loading Stripe API");
        });

    $.getScript("https://pay.google.com/gp/p/js/pay.js")
        .done(function (script, textStatus) {
            console.log(textStatus);
            onGooglePayLoaded();
        })
        .fail(function (jqxhr, settings, exception) {
            console.error("error loading Google Pay API");
        });

    $(settings.hiddenAmountInputId).nextAll(":submit").first("[name^=fxb.]").hide();

    $(settings.paypalModalElementId).click(function () {
        if (GuideDogs.payPalWindow) {
            if (GuideDogs.payPalWindow.closed) {
                GuideDogs.setPayPalModalOverlayVisibility(false);
            } else {
                GuideDogs.payPalWindow.focus();
            }
        } else {
            this.hide();
        }
    });

    $(settings.cardPaymentErrorOkbuttonId).click(function () {
        GuideDogs.setCardPaymentOverlayVisibility(false);
    });

}

function getStripeClientSecret(doneCallback) {
    // Fetch Stripe client secret
    $.ajax({
        url: settings.createPaymentIntentUrl,
        dataType: "json",
        method: "POST"
    }).error(function (data) {
        console.error("Failed to get Stripe client secret");
    }).done(function (data) {
        doneCallback(data);
    });
}

function stripeApiLoaded() {

    // Set your publishable key: remember to change this to your live publishable key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    stripe = Stripe(stripePublishableKey, { apiVersion: stripeVersion });
    var elements = stripe.elements();

    var elementStyles = {
        base: {
            color: '#131e29',
            backgroundColor: '#f5f5f5',
            fontSize: '1rem'
            //fontWeight:   500,
            //fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
            //fontSize: '16px',
            //fontSmoothing: 'antialiased',

            //'::placeholder': {
            //    color: '#CFD7DF',
            //},
            //':-webkit-autofill': {
            //    color: '#e39f48',
            //},
        },
        invalid: {
            color: '#E25950',

            '::placeholder': {
                color: '#FFCCA5'
            },
        },
    };

    var elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'input-validation-error'
    };

    var cardNumber = elements.create('cardNumber',
        {
            style: elementStyles,
            classes: elementClasses
        });
    cardNumber.mount('#card-number');
    cardNumber.addEventListener('change', function (_ref) {
        var error = _ref.error;
        var displayError = document.getElementById('card-number-errors');

        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
    });    

    var cardExpiry = elements.create('cardExpiry',
        {
            style: elementStyles,
            classes: elementClasses
        });
    cardExpiry.mount('#card-expiry');
    cardExpiry.addEventListener('change', function (_ref) {
        var error = _ref.error;
        var displayError = document.getElementById('card-expiry-errors');

        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
    });

    var cardCvc = elements.create('cardCvc',
        {
            style: elementStyles,
            classes: elementClasses
        });
    cardCvc.mount('#card-cvc');
    cardCvc.addEventListener('change', function (_ref) {
        var error = _ref.error;
        var displayError = document.getElementById('card-cvc-errors');

        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Focus after options clicked
    // Card focus
    $('#' + settings.cardPaymentOptionId).click(function () {
        setTimeout(function () {
                cardNumber.focus();
            },
            1000);
    });
    // Google Pay focus
    $('#' + settings.googlePayPaymentOptionId).click(function () {
        setTimeout(function () {
                $('#gpay-button-container').focus();
            },
            1000);
    });
    // Apple Pay focus
    $('#' + settings.applePayPaymentOptionId).click(function () {
        setTimeout(function () {
            $('#applepay-button-container').focus();
            },
            1000);
    });
    // PayPal focus
    $('#' + settings.payPalPaymentOptionId).click(function () {
        setTimeout(function () {
                $('#paypal-button-container').focus();
            },
            1000);
    });

    var submitButton = document.getElementById(settings.cardSubmitButtonId);

    submitButton.addEventListener('click',
        function(ev) {
            ev.preventDefault();
            GuideDogs.setCardPaymentOverlayVisibility(true);
            
            getStripeClientSecret(function(clientSecret) {

                stripe.confirmCardPayment(clientSecret,
                    {
                        payment_method: {
                            card: cardNumber                         
                        }
                    }).then(function(result) {
                    if (result.error) {
                        // Show error to your customer (e.g., insufficient funds)
                        console.log(result.error.message);
                        GuideDogs.showPaymentError(result.error.message);
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            // Show a success message to your customer
                            // There's a risk of the customer closing the window before callback
                            // execution. Set up a webhook or plugin to listen for the
                            // payment_intent.succeeded event that handles any business critical
                            // post-payment actions.

                            // Make Server API call here
                            $.ajax({
                                url: settings.submitFormDataUrl,
                                dataType: "json",
                                method: "POST"
                            }).error(function(data) {
                                console.error("Card payment error!");
                                GuideDogs.showPaymentError(settings.successfulPaymentWithFormSubmissionError + "<p>Payment reference: " + result.paymentIntent.description + "</p>");
                            }).done(function(data) {

                                $(settings.hiddenAmountInputId).val(result.paymentIntent.description);
                                GuideDogs.clickNextSubmitButton();
                            });
                        }
                    }
                });
            });
        });

    
    // Payment Request Button
    var paymentRequest = stripe.paymentRequest({
        country: 'GB',
        currency: 'gbp',
        total: {
            label: settings.applePayMerchantName,
            amount: settings.Amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,   
    });
    var prButton = elements.create('paymentRequestButton',
        {
            paymentRequest: paymentRequest,
            style: {
                paymentRequestButton: {
                    height: '44px'
                    // Defaults to '40px'. The width is always '100%'.
                },
            }
        });

// Check the availability of the Payment Request API first.
    var paymentRequestSupported = paymentRequest.canMakePayment();
    paymentRequestSupported.then(function(result) {
        if (result && result.applePay) {
            document.getElementById(settings.applePayPaymentOptionId).style.display = '';
            prButton.mount('#' + settings.paymentRequestButtonId);
        } else {
            document.getElementById(settings.paymentRequestButtonId).style.display = 'none';
            document.getElementById(settings.applePayPaymentOptionId).style.display = 'none';
        }        
    });

    paymentRequest.on('paymentmethod',
        function(ev) {
            // Confirm the PaymentIntent without handling potential next actions (yet).
            GuideDogs.setCardPaymentOverlayVisibility(true);

            getStripeClientSecret(function(clientSecret) {

                stripe.confirmCardPayment(
                    clientSecret,
                    { payment_method: ev.paymentMethod.id },
                    { handleActions: false }
                ).then(function(confirmResult) {
                    if (confirmResult.error) {
                        // Report to the browser that the payment failed, prompting it to
                        // re-show the payment interface, or show an error message and close
                        // the payment interface.
                        ev.complete('fail');
                    } else {
                        // Report to the browser that the confirmation was successful, prompting
                        // it to close the browser payment method collection interface.
                        ev.complete('success');
                        // Let Stripe.js handle the rest of the payment flow.
                        stripe.confirmCardPayment(clientSecret).then(function(result) {
                            if (result.error) {
                                // The payment failed -- ask your customer for a new payment method. 
                                console.log(result.error.message);
                                GuideDogs.showPaymentError(result.error.message);
                            } else {
                                // The payment has succeeded.
                                // Make Server API call here
                                $.ajax({
                                    url: settings.submitFormDataUrl,
                                    dataType: "json",
                                    method: "POST"
                                }).error(function(data) {
                                    console.error("Apple Pay payment error!");
                                    GuideDogs.showPaymentError(settings.successfulPaymentWithFormSubmissionError + "<p>Payment reference: " + result.paymentIntent.description + "</p>");
                                }).done(function(data) {

                                    $(settings.hiddenAmountInputId).val(result.paymentIntent.description);
                                    GuideDogs.clickNextSubmitButton();
                                });
                            }
                        });
                    }
                });
            });
        });
}


// GOOGLE PAY

var googlePayMerchantInfo = {
    // TODO a merchant ID is available for a production environment after approval by Google
    // See {link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    merchantId: settings.googlePayMerchantId,
    merchantName: settings.googlePayMerchantName
};

var googlePayTransactionInfo = {
    countryCode: 'GB',
    currencyCode: 'GBP',
    totalPriceStatus: 'FINAL',
    totalPriceLabel: settings.productType,
    // set to cart total
    totalPrice: settings.googlePayAmount
};


function confirmPaymentWithStripe(paymentTokenJson) {
    GuideDogs.setCardPaymentOverlayVisibility(true);

    getStripeClientSecret(function (clientSecret) {

        stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: {
                        token: JSON.parse(paymentTokenJson).id //'tok_visa'
                    }
                }
            }
        ).then(function (result) {
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
                GuideDogs.showPaymentError(result.error.message);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    // Show a success message to your customer
                    // There's a risk of the customer closing the window before callback
                    // execution. Set up a webhook or plugin to listen for the
                    // payment_intent.succeeded event that handles any business critical
                    // post-payment actions.

                    // Make Server API call here
                    $.ajax({
                        url: settings.submitFormDataUrl,
                        dataType: "json",
                        method: "POST"
                    }).error(function (data) {
                        console.error("Google Pay payment error!");
                        GuideDogs.showPaymentError(settings.successfulPaymentWithFormSubmissionError + "<p>Payment reference: " + result.paymentIntent.description + "</p>");
                    }).done(function (data) {

                        $(settings.hiddenAmountInputId).val(result.paymentIntent.description);
                        GuideDogs.clickNextSubmitButton();
                    });
                }
            }
        });
    });
}

///////

var GuideDogs = GuideDogs || {};

GuideDogs.disablePayPalButton = function() {
    GuideDogs.isPayPalButtonDisabled = true;
};

GuideDogs.enablePayPalButton = function() {
    GuideDogs.isPayPalButtonDisabled = false;
};

GuideDogs.setCardPaymentOverlayVisibility = function (show) {
    if (show) {
        $(settings.cardPaymentOverlayWaitMessageId).show();
        $(settings.cardPaymentOverlayElementId).show();

    } else {
        $(settings.cardPaymentOverlayElementId).hide();
        $(settings.cardPaymentOverlayWaitMessageId).hide();
        $(settings.cardPaymentErrorMessageModalId).hide();
    }
};

GuideDogs.showPaymentError = function (message) {    
    $(settings.cardPaymentOverlayWaitMessageId).hide();
    $(settings.cardPaymentOverlayElementId).show();

    $(settings.cardPaymentErrorMessageId).html(message);
    $(settings.cardPaymentErrorMessageModalId).show();    
};

GuideDogs.setPayPalModalOverlayVisibility = function (show) {
    if (show) {
        $(settings.paypalModalElementId).show();
    } else {
        $(settings.paypalModalElementId).hide();
    }
};

GuideDogs.openPayPalWindow = function () {
    if (GuideDogs.isPayPalButtonDisabled)
        return;

    var winLeft = (window.screenLeft ? window.screenLeft : window.screenX);// + ((window.outerWidth - window.innerWidth) / 2);
    var winTop = (window.screenTop ? window.screenTop : window.screenY) + ((window.outerHeight - window.innerHeight) / 2);

    var width = 466;
    var height = 540;
    var left = winLeft + ((window.innerWidth - width) / 2);
    var top = winTop + ((window.innerHeight - height) / 2);

    GuideDogs.payPalWindow = window.open(settings.paypalUrl, 'gdPayPalPopup', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',scrollbars=no,resizable=no');
    setInterval(function () {
        if (GuideDogs.payPalWindow && GuideDogs.payPalWindow.closed) {
            GuideDogs.setPayPalModalOverlayVisibility(false);
        }
    }, 1000);

    GuideDogs.setPayPalModalOverlayVisibility(true);
};

GuideDogs.clickNextSubmitButton = function () {
    // Show next submit button after 30secs in case auto click is unsuccessful
    setTimeout(function () {
        GuideDogs.setCardPaymentOverlayVisibility(false);
        $(settings.hiddenAmountInputId).nextAll(":submit").first().show();
    }, 30000);

    // Auto-click to continue to next step
    $(settings.hiddenAmountInputId).nextAll(":submit").first().click();
};

GuideDogs.paypalPaymentCallbacks = {
    paymentCancelled: function() {
        if (GuideDogs.payPalWindow) {
            GuideDogs.payPalWindow.close();
        }
        GuideDogs.setPayPalModalOverlayVisibility(false);
    },

    paymentFailed: function(message) {
        if (GuideDogs.payPalWindow) {
            GuideDogs.payPalWindow.close();
        }
        GuideDogs.setPayPalModalOverlayVisibility(false);
        alert("PayPal payment error: " + message);
    },

    paymentComplete: function(reference) {
        if (GuideDogs.payPalWindow) {
            GuideDogs.payPalWindow.close();
            GuideDogs.setPayPalModalOverlayVisibility(false);
        }

        GuideDogs.setCardPaymentOverlayVisibility(true);

        $(settings.hiddenAmountInputId).val(reference);
        GuideDogs.clickNextSubmitButton();
    }
};
