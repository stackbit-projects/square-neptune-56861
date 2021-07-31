import React from 'react'
// import "../../styles/component-blockquote.scss";

const Variants = {
  NoAuthor: "{21C4DBE4-994A-4E7B-B0DC-128E2A9A0182}",
}

const BlockQuote = (props) => {
  const { renderingContext } = props

  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for BlockQuote")
    return null
  }

  const { item: { fields }, parameters } = renderingContext
  const noAuthor = parameters?.FieldNames === Variants.NoAuthor;

  return (
    <div className="component c-quote small-12 columns">
      <div className="component-content">
        <figure className="c-quote__wrapper">
          <blockquote className="c-quote__text field-quote-text" dangerouslySetInnerHTML={{__html: fields['quote text']}} />
          {!noAuthor &&
            <figcaption className="c-quote__author field-author" dangerouslySetInnerHTML={{__html: fields.author}} />
          }
        </figure>
      </div>
    </div>
  )
}

export default BlockQuote