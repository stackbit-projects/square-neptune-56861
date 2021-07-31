import React from 'react'
import { Root } from './CardBanner.styles'
// import "../../styles/component-image-spotlight.scss";
import { getBlueBackground } from '../../utils/styleClass';
import { linkFormatter } from '../../utils/formatter';

interface ImageProps {
  src: string
  width: string
  height: string
  "data-variantitemid": string
  "data-variantfieldname": string
  alt?: string
}

const CardBanner = (props) => {
  const { renderingContext } = props
  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for CardBanner")
    return null
  }

  const { item: { id, fields }, parameters } = renderingContext
  const backgroundStyle = getBlueBackground(parameters?.Styles)

  let imageAttr: ImageProps = {
    src: `${fields.image.url}?h=441&amp;w=784&amp;hash=B195B5C138CDD72ACAA9F22BF698AFC0`,
    width: "784",
    height: "441",
    "data-variantitemid": `{${id}}`,
    "data-variantfieldname": "Image"
  }

  if (fields.image.alt) {
    imageAttr = {
      ...imageAttr,
      alt: fields.image.alt,
    }
  }

  return (
    <Root className={`component small-12 columns ${backgroundStyle}`}>
      <div className="component-content">
        <div className="c-imageSpotlight__wrapper">
          {fields.image &&
            <div className="c-imageSpotlight__image">
              <div className="ar-16-9">
                <img {...imageAttr} loading="lazy" />
              </div>
            </div>
          }
          <div className="c-imageSpotlight__content">
            <h3 className="c-imageSpotlight__title field-title" dangerouslySetInnerHTML={{ __html: fields.title }} />
            {fields.summary && fields.summary.startsWith("<")
              ? <React.Fragment><div dangerouslySetInnerHTML={{ __html: fields.summary }} /> <p /></React.Fragment>
              : <p dangerouslySetInnerHTML={{ __html: fields.summary }} />
            }
            {fields.link &&
              <p className="c-imageSpotlight__link field-link">
                <a href={linkFormatter(fields.link)} data-variantitemid={`{${id}}`} role="button" data-variantfieldname="Link" target={fields.link.target}>{fields.link.text}</a>
              </p>
            }
          </div>
        </div>
      </div>
    </Root>
  )
}

export default CardBanner