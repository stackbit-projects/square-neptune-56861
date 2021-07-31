import React from 'react'

interface ImageProps {
  src: string
  width: string
  height: string
  "data-variantitemid": string
  "data-variantfieldname": string
  alt?: string
  title?: string
}

const Variant = {
  WithCaption: "{446FE21B-8B41-4CA4-A06A-A9D5A76E59B5}",
}

const Image = (props) => {
  const { renderingContext } = props
  if (!renderingContext.item || !renderingContext.item.fields || !renderingContext.item.fields.image) {
    return null
  }

  const { item: {id, fields: { imagecaption, image }}, parameters } = renderingContext

  const withCaption = parameters?.FieldNames === Variant.WithCaption;

  let imageAttr: ImageProps = {
    src: `${image.url}?h=${image.height}&amp;w=${image.width}&amp;`,
    width: image.width,
    height: image.height,
    "data-variantitemid": id,
    "data-variantfieldname": "Image",
  }

  if (image.alt) {
    imageAttr = {
      ...imageAttr,
      alt: image.alt,
      title: image.alt,
    }
  }

  return (
    <div className="component c-imagePod file-type-icon-media-link small-12 columns">
      <div className="component-content">
        <div className="c-imagePod__image">
          <img {...imageAttr} loading="lazy" />
        </div>
        {imagecaption && withCaption &&
          <div className="c-imagePod__content">
            <p className="c-imagePod__caption field-imagecaption" dangerouslySetInnerHTML={{ __html: imagecaption }}/>
          </div>
        }
      </div>
    </div>
  )
}

export default Image