import React from 'react'

const Styles = {
  SkipLink: "{590736D8-A121-436C-B033-53288E07DCF3}",
  FooterNav: "{57CAA387-3790-4E66-A92A-16669503D2FC}"
}

const Content = (props) => {
  const { renderingContext } = props

  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for Content")
    return null
  }

  const { item: { fields }, parameters } = renderingContext

  let styleClass = "";

  if (parameters?.Styles === Styles.SkipLink)
    styleClass = "c-header__skiplinks";
  else if (parameters?.Styles === Styles.FooterNav)
    styleClass = "c-footer__navigation";

  return (
    <div className={`component rich-text small-12 columns ${styleClass}`}>
      <div className="component-content" dangerouslySetInnerHTML={{ __html: fields.text }} />
    </div>
  )
}

export default Content