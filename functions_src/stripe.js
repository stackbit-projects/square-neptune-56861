const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async function (event, context) {
  const payload = JSON.parse(event.body)

  if (!payload.amount || !payload.referenceNumber) {
    return {
      statusCode: 422,
      body: "Unprocessable Entity"
    };
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount,
    currency: "gbp",
    statement_descriptor_suffix: payload.statement,
    description: payload.referenceNumber,
    metadata: {
      "Product type": payload.productType,
      "Website reference ID": payload.referenceNumber,
      "Sitecore form ID": payload.formId ?? "unknown",
      "Sitecore form session ID": payload.sessionId
    },
  });

  return {
    statusCode: 200,
    body: paymentIntent.client_secret
  };
};
