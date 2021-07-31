import React from 'react'
// import "../../styles/component-message-block.scss";

const BlockText = (props) => {
  const { renderingContext } = props
  if (!renderingContext.item || !renderingContext.item.fields) {
    return null
  }
  const {  item: { fields } } = renderingContext

  return (
    <div className="component c-messageBlock columns">
      <div className="component-content">
        <div className="c-messageBlock__wrapper">
          <div className="c-messageBlock__content field-message-block" dangerouslySetInnerHTML={{__html: fields['message block']}} />
        </div>
      </div>
    </div>
  )
}

export default BlockText