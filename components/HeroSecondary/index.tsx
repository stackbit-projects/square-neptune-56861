import React from 'react'

const HeroSecondary = (props) => {
  const { renderingContext } = props
  if (!renderingContext.item || !renderingContext.item.fields) {
    return null
  }

  const { item: { fields } } = renderingContext

  return (
    <div className="component c-hero c-hero--secondary small-12 columns">
      <div className="component-content">
        <div className="c-hero__wrapper">
          {fields.heroimage &&
            <div className="c-hero__image"
              style={{
                backgroundImage: `url(${fields.heroimage.url})`,
                backgroundPosition: fields.herofocalpoint
              }}
            ></div>
          }
          <div className="c-hero__content">
            <h1 className="c-hero__title field-herotitle" dangerouslySetInnerHTML={{ __html: fields.herotitle }} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroSecondary