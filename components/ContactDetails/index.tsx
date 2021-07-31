import React from 'react'
// import "../../styles/component-getintouch.scss";

const Variants = {
  All: "{55861F56-E0CD-43F3-96D9-574552AB7D10}",
  EmailOnly: "{04CF5404-EC1F-4421-9216-20C86A0AEABB}",
  PhoneOnly: "{FBBFC646-525D-4997-A37F-DD4262F5CB25}",
}

const ContactDetails = (props) => {
  const { renderingContext } = props

  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for ContactDetails")
    return null
  }

  const { item: {id, fields }, parameters } = renderingContext

  const all = parameters?.FieldNames === Variants.All;
  const emailOnly = parameters?.FieldNames === Variants.EmailOnly;
  const phoneOnly = parameters?.FieldNames === Variants.PhoneOnly;

  return (
    <div className="component c-getInTouch small-12 columns">
      <div className="component-content">
        <div className="c-getInTouch__wrapper">
          <h3 className="c-getInTouch__title field-getintouchtitle" dangerouslySetInnerHTML={{ __html: fields.getintouchtitle }} />
          <div className="c-getInTouch__summary field-getintouchcopy" dangerouslySetInnerHTML={{ __html: fields.getintouchcopy }} />
          {fields.getintouchemaillink && (!phoneOnly || all) &&
            <p className="c-getInTouch__email field-getintouchemaillink">
              <a href={fields.getintouchemaillink.url} data-variantitemid={`{${id}}`} data-variantfieldname="GetInTouchEmailLink">{fields.getintouchemaillink.text}</a>
            </p>
          }

          {fields.getintouchtelephonetext && (!emailOnly || all) &&
            <p className="c-getInTouch__telephone field-getintouchtelephonetext" data-rel="external">
              <a title="fundraising getintouch" aria-label={`Telephone Number ${fields.getintouchtelephonetext}`} href={`tel:${fields.getintouchtelephonetext}`}>{fields.getintouchtelephonetext}</a>
            </p>
          }
        </div>
      </div>
    </div>
  )
}

export default ContactDetails