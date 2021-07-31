import React from 'react'
// import "../../styles/component-case-study.scss";
import { linkFormatter } from '../../utils/formatter';
import { getBlueBackground } from '../../utils/styleClass';

interface ImageProps {
  src: string
  width: string
  height: string
  "data-variantitemid": string
  "data-variantfieldname": string
  alt?: string
}

const CardArticle = (props) => {
  const { renderingContext } = props

  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for CardArticle")
    return null
  }

  const { item: { id, fields }, parameters } = renderingContext
  const backgroundStyle = getBlueBackground(parameters?.Styles)

  let imageAttr: ImageProps = {
    src: `${fields.image.url}?h=${fields.image.height}&amp;w=${fields.image.width}&amp;hash=6940A9C3A97A0F58BB776EAB35A8B2E9`,
    width: fields.image.width,
    height: fields.image.height,
    "data-variantitemid": `{${id}}`,
    "data-variantfieldname": "Image"
  }

  if (fields.image.alt) {
    imageAttr = {
      ...imageAttr,
      alt: fields.image.alt
    }
  }

  return (
    <div className={`component c-caseStudy small-12 columns ${backgroundStyle}`}>
      <div className="component-content">
        <div className="c-caseStudy__wrapper">
          <div className="c-caseStudy__image">
            {fields.image && <img {...imageAttr} loading="lazy"/>}
          </div>
          <div className="c-caseStudy__content">
            <h3 className="c-caseStudy__title field-title" dangerouslySetInnerHTML={{ __html: fields.title }} />
            <div className="c-caseStudy__summary field-summary" dangerouslySetInnerHTML={{ __html: fields.summary }} />
            <p />
            {fields.link &&
              <p className="c-caseStudy__link field-link">
                <a href={linkFormatter(fields.link)} data-variantitemid={`{${id}}`} role="button" data-variantfieldname="Link" target={fields.link.target}>{fields.link.text}</a>
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardArticle