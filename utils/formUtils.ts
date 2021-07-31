import * as Yup from 'yup'
import { format } from 'date-fns'

export interface ConditionProps {
  MatchType: "any" | "all"
  Actions: Array<{
    FieldKey: string,
    Action: "disable" | "enable",
    Value: string | null
  }>
  Conditions: Array<{
    FieldKey: string,
    Operator: string,
    Value: string
  }>
}

export interface FormValuesProps {
  name: string;
  itemID?: string;
  itemName?: string;
  alias?: string;
  id?: string;
  type?: string;
  isHTML?: boolean;
  htmlElement?: string;
  items?: any[]
  submit?: boolean;
  label?: string;
  rows?: number;
  step?: number;
  className?: string;
  helptext?: string;
  placeholder?: string;
  defaultValue?: string;
  redirectURL?: string
  options?: any[];
  disabled?: boolean;
  conditions?: ConditionProps[];
  validation?: {
    regex: any[],
    min: number,
    max: number,
    required: boolean
  };
}

function formatFieldProps(item: any): FormValuesProps {
  if (item.Name.toLowerCase() === "amount") {
    const amountFields: any = ["payment", item.FieldKey].map((amountField: string) => {
      return {
        id: item.FieldKey,
        itemID: item.Id,
        itemName: item.Name,
        name: amountField,
        type: "hidden",
        defaultValue: item.DefaultValue
      }
    })
    return amountFields
  }

  if (item.Type.toLowerCase() === "postcode") {
    return {
      name: "address",
      type: "hidden",
      itemID: item.Id,
      itemName: item.Name,
    }
  }

  if (item.Name.toLowerCase() === "discounts") {
    return {
      id: item.FieldKey,
      name: "discounts",
      type: "hidden",
      itemID: item.Id,
      itemName: item.Name,
      options: item.Discounts?.map(discount => ({
        code: discount.Code,
        method: discount.Type,
        amount: Number(discount.Value),
        start: format(new Date(discount.StartDate), "yyyy/mm/dd"),
        end: format(new Date(discount.ExpiryDate), "yyyy/mm/dd"),
      }))
    }
  }

  const componentType = item.Type.toLowerCase()
  if (componentType === "stripepayment") {
    const paymentFields = item.StripePayment.map((paymentField) => {
      return {
        id: paymentField.Id,
        name: paymentField.Id,
        type: "hidden",
        itemID: paymentField.Id,
        itemName: paymentField.Name,
        defaultValue: paymentField.Value
      }
    })

    return paymentFields
  }


  if (componentType === "button") {
    return {
      name: "button",
      type: "button",
      step: Number(item.NavigationStep),
      submit: Boolean(item.SubmitActions),
      isHTML: true,
      redirectURL: item.RedirectUrl
    }
  }

  if (["section", "page"].includes(componentType)) {
    return {
      name: item.Name.toLowerCase(),
      type: componentType,
      isHTML: true,
    }
  }

  if (["text", "rawhtml", "sectionheader"].includes(componentType)) {
    const ariaLabelAttr = ["sectionheader"].includes(componentType) ? 
    item.arialabel ? `aria-label:"${item.arialabel}"` : `aria-label:"${item.Text}"` : '';
    const htmlElement = componentType === "rawhtml" ? `${item.Html}` : `<${item.HtmlTag} ${ariaLabelAttr}>${item.Text}</${item.HtmlTag}>`
    return {
      name: "html",
      type: "html",
      htmlElement,
      isHTML: true,
    }
  }

  let type: string = componentType

  if (componentType === "input") {
    type = "text"
  } else if (componentType.includes("multiline")) {
    type = "textarea"
  } else if (["dropdown list", "donationpromptlist"].includes(componentType)) {
    type = "dropdown"
  } else if (componentType.includes("list")) {
    type = item.Subtype.toLowerCase().replace(" button", "")
  }

  const payload = {
    itemID: item.Id,
    itemName: item.Name,
    id: item.FieldKey,
    name: item.FieldKey,
    type,
    label: item.Title,
    alias: item.Alias,
    rows: Number(item.Rows ?? 0),
    helptext: item.HelpText,
    placeholder: item.Placeholder,
    defaultValue: item.DefaultValue,
    className: item.CssClass,
    options: (item.Options || []).map(option => ({
      value: option.Value,
      label: option.Text,
      selected: option.Selected
    })),
    disabled: false,
    conditions: item.Conditions,
    validation: {
      regex: (item.Validators ?? []).map(validation => ({
        type: validation.FriendlyType,
        message: validation.Message,
        params: validation.Parameters
      })),
      min: item.MinLength || item.Min,
      max: item.MaxLength || item.Max,
      required: item.Required
    }
  }

  if (["addressline1", "addressline2", "addressline3", "postcode", "country", "county", "town"].includes(payload.itemName.toLowerCase())) {
    payload.type = "hidden"
  }

  if (type === "date") {
    if (payload.defaultValue) {
      payload.defaultValue = payload.defaultValue.replace("T00:00:00", "")
    }
    payload.placeholder = "yyyy-mm-dd"
  }

  if (item.Options && item.Options.length > 0) {
    if (["dropdown", "radio list"].includes(type)) {
      payload.defaultValue = item.Options.find(option => option.Selected)?.Value ?? ""
    } else {
      payload.defaultValue = item.Options.filter(option => option.Selected).map(option => option.Value)
    }
  }

  const dateValidation = payload.validation.regex?.find(validation => validation.type === 'DateValidation')
  if (dateValidation) {
    const currentDate = new Date()
    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    payload.validation.min = formatDateValue(minDate)
    payload.validation.max = formatDateValue(maxDate)
  }

  return payload
}

export const formatDateValue = (date) => {
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export function extractFields(fields: any) {
  return fields.map((item) => {
    const componentName = item.Type.toLowerCase()
    if (["section", "page", "meta"].includes(componentName)) {
      return [
        { ...formatFieldProps(item), items: extractFields(item.Fields).flat() },
      ]
    }

    return formatFieldProps(item)
  }).flat()
}

export const flattenFormValues = (fields) => {
  return fields.map((item) => {
    if (item.items) {
      return flattenFormValues(item.items)
    }

    return item
  }).flat()
}

const createYupSchema = (schema, config) => {
  const { id, validationType, validations = [] } = config;
  if (!Yup[validationType]) {
    return schema;
  }
  let validator = Yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}

export const createValidationSchema = ({ fields, hardcodedAddress, isUK }) => {
  const schema = fields.filter(field => !field.isHTML && !["address", "hidden"].includes(field.type)).map(field => {
    const item = {
      id: field.name,
      label: field.label,
      validationType: field.type === "text" || !["date", "number"].includes(field.type) ? "string" : field.type,
      validations: []
    }

    let label = field.label

    if (field.type === "checkbox") {
      item.validationType = "boolean"
    }

    if (["checkbox list", "list box"].includes(field.type)) {
      item.validationType = "array"
      item.validations.push({
        type: "nullable",
        params: []
      })
    }

    if (["date", "number"].includes(field.type)) {
      item.validations.push({
        type: "nullable",
        params: []
      })
      item.validations.push({
        type: "transform",
        params: [(curr, orig) => orig === "" ? null : curr]
      })
    }

    if (!field.disabled) {
      if (field.validation?.regex) {
        field.validation.regex.map(reg => {
          if (reg.type === "RegularExpressionValidation") {
            item.validations.push({
              type: "matches",
              params: [reg.params.regularExpression, reg.message]
            })
          }

          if (reg.type === "TimeSpanValidation") {
            const currentDate = new Date()
            if (reg.params.unit === "years") {
              currentDate.setFullYear(currentDate.getFullYear() - Number(reg.params.minvalue))
            }

            if (reg.params.unit === "days") {
              if (reg.params.minvalue) {
                currentDate.setDate(currentDate.getDate() - Number(reg.params.minvalue))
              } else if (reg.params.maxvalue) {
                currentDate.setDate(currentDate.getDate() - Number(reg.params.maxvalue) - 1)
              }
            }

            item.validations.push({
              type: reg.params.maxvalue ? "min" : "max",
              params: [currentDate, reg.message]
            })
          }

        })
      }

      if (field.type !== "date" && field.validation?.min) {
        item.validations.push({
          type: "min",
          params: [field.validation.min, `${label} is too short`]
        })
      }

      if (field.type !== "date" && field.validation?.max) {
        item.validations.push({
          type: "max",
          params: [field.validation.max, `${label} is too long`]
        })
      }

    }

    if (field.validation?.required && !field.disabled) {
      if (item.validationType === "boolean") {
        item.validations.push({
          type: "oneOf",
          params: [[true], `${label} is required`]
        })
      } else {
        item.validations.push({
          type: "required",
          params: [`${label} is required`]
        })
      }
    } else {
      item.validations.push({
        type: "trim",
        params: []
      })
      item.validations.push({
        type: "transform",
        params: [value => value === "" ? undefined : value]
      })
    }

    return item
  })

  const defaultValidation: any = {}

  const addressField = fields.find(field => field.name === "address")
  if (hardcodedAddress && addressField && !addressField.disabled && isUK) {
    defaultValidation.address = Yup.object({
      addressline1: Yup.string().required().label("address line 1"),
      town: Yup.string().required().label("Town/City"),
      country: Yup.string().required().label("country"),
      postcode: Yup.string().required().label("postcode"),
    })
  } else if(hardcodedAddress && addressField && !addressField.disabled){
    defaultValidation.address = Yup.object({
      addressline1: Yup.string().required().label("address line 1"),
      town: Yup.string().required().label("Town/City"),
      country: Yup.string().required().label("country"),
      postcode: Yup.string().label("postcode"),
    })
  }

  return Yup.object().shape(schema.reduce(createYupSchema, defaultValidation))
}

export const validate = async ({ schema, values, fields }) => {
  const validation = await schema.validate(values, { abortEarly: false })
    .then(() => (true))
    .catch((schemaError) => {
      return schemaError.inner.reduce((memo, { path, message }) => {
        const relatedField = fields.find(field => field.name === path)
        const errorMessage = message.replace("{0}", relatedField?.label ?? "")
        return {
          ...memo,
          [path]: errorMessage //[errorMessage].concat(memo[path] ?? [])
        }
      }, {})
    })

  return validation
}

export const updateFieldDisabledState = (fields, fieldId, state) => {
  const updatedFields = fields.map(field => {
    if (field.id === fieldId) {
      field.disabled = state
    }

    if (field.isHTML) {
      if (field.items) {
        return {
          ...field,
          items: updateFieldDisabledState(field.items, fieldId, state)
        }
      } else {
        return field
      }
    }
    return field
  })

  return updatedFields
}

export const computeConditionRule = ({ operator, match, value }) => {
  if (typeof value === "boolean") {
    value = String(value)
  }

  switch (operator) {
    case "is equal to":
      return value === match
    case "is not equal to":
      return value !== match
    case "contains":
      return value.includes(match)
    case "does not contain":
      return !value.includes(match)
    case "starts with":
      return value.startsWith(match)
    case "does not start with":
      return !value.startsWith(match)
    case "ends with":
      return value.endsWith(match)
    case "does not end with":
      return !value.startsWith(match)
    default:
      return false
  }
}


/**
 * search through child elements of errRef,
 * giving focus to the 1st 'focusable' element found (e.g. <input>, <select>....)
 * @param div
 * @param onlySearchForTagName - Only search for this element tag
 */
export const focusFormField = (element:HTMLElement, onlySearchForTagName?:string) => {

  let focusableElement:HTMLElement | null = null;
  let focusableElements:HTMLCollection | null = null;

  // check if element is actually focusable
  if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'BUTTON' || element.tagName === 'TEXTAREA' ) {
    focusableElement = element;
  } else {
    if (onlySearchForTagName) {
      focusableElements = element.getElementsByTagName(onlySearchForTagName);
    } else {
      // check for all focusable elements types
      focusableElements = element.getElementsByTagName('input');
      if (focusableElements.length < 1) {
        focusableElements = element.getElementsByTagName('select');
      }
      if (focusableElements.length < 1) {
        focusableElements = element.getElementsByTagName('button');
      }
      if (focusableElements.length < 1) {
        focusableElements = element.getElementsByTagName('textarea');
      }
      
    }

    if (focusableElements.length > 0) {
      focusableElement = (focusableElements[0] as HTMLElement);
    }
  }

  if (!focusableElement) {
    console.log('-------- No Focusable element found for ---------')
    console.log(element)
  } else {
    focusableElement.focus();
  }
  
}