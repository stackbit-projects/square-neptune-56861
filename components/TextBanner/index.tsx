import React from 'react'
// import "../../styles/component-promo-pod.scss";
import { linkFormatter } from '../../utils/formatter';

const Variant = {
  BlueBackground: "{F3715535-4F33-4543-8217-4B17B810ECD1}",
  BlueNoCTABackground: "{462ECBEC-C6C3-410C-98D5-4632822D72BE}",
}

const TextBanner = (props) => {
  const {renderingContext} = props

  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for TextBanner")
    return null
  }

  const {  item: { id, fields }, parameters } = renderingContext

  const blueBg = parameters?.FieldNames === Variant.BlueBackground;
  const blueNoCTA = parameters?.FieldNames === Variant.BlueNoCTABackground;

  let className = 'c-promoPod--blue'

  if (blueNoCTA) {
    className += ' c-promoPod--noCTA'
  }

  let linkText = fields.link?.text || ""

  if (!linkText && fields.link && fields.link.url) {
    const splitURL = fields.link.url.split("/")
    const url = splitURL[splitURL.length - 1]
    linkText = url.replace(/-/g, " ");
  }

  return (
    <div className={`component c-promoPod ${blueBg || blueNoCTA ? className : ""} small-12 columns`}>
      <div className="component-content">
        <div className="c-promoPod__wrapper">
          <p className="c-promoPod__text field-text" dangerouslySetInnerHTML={{ __html: fields.text }} />
          <p className="c-promoPod__link field-link">
            {fields.link &&
              <a href={linkFormatter(fields.link)} data-variantitemid={`{${id}}`} role="button" data-variantfieldname="Link" target={fields.link.target}>{linkText}</a>
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextBanner