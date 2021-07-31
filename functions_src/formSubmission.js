const forms = require('./forms.json');
const axios = require('axios')
const {
  createValidationSchema,
  validate,
  updateFieldDisabledState,
  computeConditionRule
} = require('./formUtils');

exports.handler = async function (event, context) {
  const payload = JSON.parse(event.body)
  if (!payload.formId) {
    return {
      statusCode: 400,
      body: "Invalid form submitted"
    }
  }

  const form = forms.find(form => form.id === payload.formId)
  if (!form) {
    console.log("Form not found with id of ", payload.formId)
    return {
      statusCode: 404,
      body: "Unrecognized form submitted"
    }
  }

  let formFields = form.fields
  const conditions = formFields.reduce((sum, item) => {
    if (item.isHTML || !item.conditions) {
      return sum
    }
    return [
      ...sum,
      ...item.conditions
    ]
  }, [])

  conditions.forEach(condition => {
    const cond = condition.MatchType === 'any' ? 'find' : 'every'
    const isValid = condition.Conditions[cond](rule => {
      const value = Object.keys(payload).find(value => value === rule.FieldKey)
      if (payload[value]) {
        return computeConditionRule({operator: rule.Operator, match: rule.Value, value: payload[value]})
      }
    })

    condition.Actions.forEach(action => {
      const isDisabled = action.Action === 'disable'
      const state = isValid ? isDisabled : !isDisabled
      formFields = updateFieldDisabledState(formFields, action.FieldKey, state)
    })
  })

  const schema = createValidationSchema({fields: formFields, hardcodedAddress: false})
  const validation = await validate({ schema, values: payload, fields: formFields })

  if (!validation || Object.keys(validation).length > 0) {
    console.log("Validation failed")

    return {
      statusCode: 422,
      body: JSON.stringify(validation)
    };
  }

  const dataFormFields = Object.keys(payload).map(fieldID => {
    if (fieldID === 'discountCode') {
      const matchedItem = formFields.find(field => field.name === 'discounts')
      if (!matchedItem) {
        return null
      }
      return {
        Value: payload[fieldID],
        Id: matchedItem.itemID,
        Name: matchedItem.itemName
      }
    }

    if (fieldID === 'paymentId') {
      const matchedItem = formFields.find(field => field.name === 'payment')
      if (!matchedItem) {
        return null
      }
      return {
        Value: payload['paymentId'],
        Id: matchedItem.itemID,
        Name: matchedItem.itemName
      }
    }

    const matchedItem = formFields.find(field => field.id === fieldID)
    if (!matchedItem) {
      return null
    }

    return {
      Value: String(payload[fieldID]),
      Id: matchedItem.itemID,
      Name: matchedItem.itemName
    }
  }).filter(item => item)

  const data = {
    FormId: payload.formId,
    FormFields: dataFormFields
  }

  try {
    const response = await axios.post(`${process.env.SITECORE_ORIGIN}/api/forms/saveformdata`, data, {
      headers: {
        'Authorization': `Basic ${process.env.SITECORE_PROXY_BASIC_AUTH}`
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 502,
      body: "Unable to save form"
    };
  }
};

