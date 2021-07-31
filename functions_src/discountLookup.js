const forms = require('./forms.json');

exports.handler = async function (event, context) {
  const payload = JSON.parse(event.body)

  if (!payload.formId || !payload.code) {
    return {
      statusCode: 422,
      body: 'Invalid payload'
    };
  }

  const form = forms.find(form => form.id === payload.formId)
  if (!form) {
    console.error("Form not found with id ", payload.formId)
    return {
      statusCode: 406,
      body: "Invalid code supplied"
    }
  }

  let formFields = form.fields
  const discounts = formFields.find(formValue => formValue.name === 'discounts')?.options ?? []
  const validCode = discounts.find(discount => discount.code === payload.code)

  if (validCode) {
    return {
      statusCode: 200,
      body: JSON.stringify(validCode)
    }
  }

  return {
    statusCode: 406,
    body: "Invalid code supplied"
  }
};
