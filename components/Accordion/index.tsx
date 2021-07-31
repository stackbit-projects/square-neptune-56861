import React from 'react'
// import "../../styles/component-accordion.scss";
import loadable from '@loadable/component'

const Image =  loadable(() => import('../Image'))
const Video =  loadable(() => import('../Video'))

const Wrapper: React.FC<{ index: number, heading: string }> = (props) => {
  return (
    <li className="item" key={`accordion-${props.index}`}>
      <button type="button" className="toggle-header js-accordionToggle" aria-expanded="false" aria-controls={`section${props.index}`} id={`toggle${props.index}`} data-tabindex={props.index}>
        <span className="label">
          <div className="component content small-12 columns">
            <div className="component-content">
              <div className="field-heading" dangerouslySetInnerHTML={{ __html: props.heading }} />
            </div>
          </div>
        </span>
      </button>
      <div className="toggle-content js-accordionContent" id={`section${props.index}`} aria-labelledby={`toggle${props.index}`} aria-hidden="false">
        {props.children}
      </div>
    </li>
  )
}

const Content: React.FC<{ content: string }> = (props) => {
  return (
    <div className="component content small-12 columns">
      <div className="component-content">
        <div className="field-content" dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </div>
  )
}

const Accordion = (props) => {
  const { renderingContext } = props
  const { item: { children } } = renderingContext

  if (!children || children.length === 0) {
    return null
  }

  return (
    <div className="component accordion small-12 columns" data-properties="{&quot;expandOnHover&quot;:false,&quot;expandedByDefault&quot;:false,&quot;speed&quot;:500,&quot;easing&quot;:&quot;swing&quot;,&quot;canOpenMultiple&quot;:true,&quot;canToggle&quot;:true,&quot;isControlEditable&quot;:false}">
      <div className="component-content">
        <div>
          <ul className="items">
            {children.map((listItem, index) => {
              if (listItem.children && listItem.children.length > 0 && listItem.children[0].children) {

                if (listItem.children[0].children[0].fields.image) {
                  return (
                    <Wrapper index={index} heading={listItem.fields.heading}>
                      <Image
                        renderingContext={{
                          item: {
                            fields: listItem.children[0].children[0].fields
                          }
                        }}
                      />
                      <Content content={listItem.fields.content} />
                    </Wrapper>
                  )
                }

                if (listItem.children[0].children[0].fields.youtubemovie) {
                  return (
                    <Wrapper index={index} heading={listItem.fields.heading}>
                      <Video renderingContext={{
                        item: {
                          fields: {
                            youtubemovie: listItem.children[0].children[0].fields.youtubemovie
                          }
                        }
                      }} />
                    </Wrapper>
                  )
                }
              }

              return (
                <Wrapper index={index} heading={listItem.fields.heading}>
                  <div className="component content small-12 columns">
                    <div className="component-content">
                      <div className="field-content" dangerouslySetInnerHTML={{ __html: listItem.fields.content }} />
                    </div>
                  </div>
                </Wrapper>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Accordion