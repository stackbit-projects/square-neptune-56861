import React from 'react'
import { linkFormatter } from '../../utils/formatter'

const Variants = {
  Plain: "{1231EFBC-DE7A-489F-9410-C25C2B2DEBBB}",
  Large: "{69244147-9040-432C-A6AC-16BAE4863271}",
  Medium: "{859E750E-BF54-4DA2-8DD4-9786565E3640}",
  Small: "{19AE9B21-88B6-4D17-82B1-CA605DB70EA7}",
  Link: "{0D07C7F0-4367-4647-BFAF-8AAD9A8B1E27}",
}

const Button = (props) => {
  const { renderingContext } = props

  if (!renderingContext.item || !renderingContext.item.fields || !renderingContext.item.fields.link) {
    console.error("No item supplied for Button")
    return null
  }

  const { item: { id, fields: { link } }, parameters } = renderingContext

  const isPlain = parameters?.FieldNames === Variants.Plain;
  const isLarge = parameters?.FieldNames === Variants.Large;
  const isMedium = parameters?.FieldNames === Variants.Medium;
  const isSmall = parameters?.FieldNames === Variants.Small;
  const isLink = parameters?.FieldNames === Variants.Link;

  let buttonClass = isPlain ? "cta-plain" : ""

  if (isLarge) {
    buttonClass = "cta-large"
  }

  if (isMedium) {
    buttonClass = "cta-medium"
  }

  if (isSmall) {
    buttonClass = "cta-small"
  }

  if (isLink) {
    buttonClass = "cta-link"
  }

  const url = linkFormatter(link)

  return (
    <div className="component c-ctaButton ctaWrapper columns c-header__cta">
      <div className="component-content">
        <div className="field-link">
          <a href={url} data-variantitemid={`{${id}}`} className={buttonClass} role="button" data-variantfieldname="Link" target={link.target}>{link.text}</a>
        </div>
      </div>
    </div>
  )
}

export default Button