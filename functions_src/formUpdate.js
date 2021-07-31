const forms = require('./forms.json');
const axios = require("axios")

exports.handler = async function (event) {
  const payload = JSON.parse(event.body)

  if (!payload.formId || !payload.sessionId || !payload.referenceNumber || !payload.PaymentMethod || !payload.status || !payload.amount) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Invalid form payload",
        WebsiteReferenceID: payload.referenceNumber
      })
    }
  }

  const form = forms.find(form => form.id === payload.formId)
  if (!form) {
    console.log("Cant form form with id", payload.formId)
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Unrecognized form submitted",
        WebsiteReferenceID: payload.referenceNumber
      })
    }
  }

  const finalAmountField = form.fields.find(field => field.itemName && field.itemName.toLowerCase() === 'finalamount')
  if (!finalAmountField) {
    console.log("cant find final amount field")
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Unable to find relevant data",
        WebsiteReferenceID: payload.referenceNumber
      })
    };
  }

  const formFieldsData = [{
    "Value": String(payload.amount),
    "Id": finalAmountField.itemID,
    "Name": finalAmountField.itemName
  }]

  if (payload.discountCode) {
    const discountField = form.fields.find(field => field.itemName && field.itemName.toLowerCase() === 'discounts')
    if (discountField) {
      formFieldsData.push({
        "Value": payload.discountCode,
        "Id": discountField.itemID,
        "Name": discountField.itemName
      })
    }
  }

  try {
    const response = await axios.post(`${process.env.SITECORE_ORIGIN}/api/forms/updateformdata`, {
      "FormId": payload.formId,
      "SitecoreFormSessionId": payload.sessionId,
      "Status": payload.status,
      "PaymentMethod": payload.PaymentMethod,
      "WebsiteReferenceID": payload.referenceNumber,
      "FormFields": formFieldsData
    }, {
      headers: {
        "Authorization": `Basic ${process.env.SITECORE_PROXY_BASIC_AUTH}`
      }
    })
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error(error)
    return {
      statusCode: 502,
      body: JSON.stringify({
        message: "Unable to update form",
        WebsiteReferenceID: payload.referenceNumber
      })
    };
  }
};

