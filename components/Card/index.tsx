import React from 'react'
import { linkFormatter } from '../../utils/formatter'
import { getBlueBackground } from '../../utils/styleClass'
import { Root, Wrapper, Content, Text, ImageWrapper, Image, Link } from "./Card.styles"

const Variants = {
  Default: "{D288AE53-0DFF-418F-9773-52A51A40B582}",
  NoImage: "{83D702CA-4797-4B98-9C9A-E861370CE490}",
  Large: "{0199A687-14BF-4599-A99A-6A97576E18D8}"
}

const Styles = {
  MakeEqualHeight: "{3182392E-93CD-425C-8778-611B677FA58A}",
}

const Card = (props: any) => {
  const { renderingContext } = props

  if (!renderingContext.item || !renderingContext.item.fields) {
    console.error("No item supplied for Card")
    return null
  }

  const { item: { id, name, fields }, parameters } = renderingContext

  const isLarge = parameters?.FieldNames === Variants.Large;
  const noImage = parameters?.FieldNames === Variants.NoImage;
  const jsClass = parameters?.Styles === Styles.MakeEqualHeight;
  const backgroundStyle = getBlueBackground(parameters?.Styles)

  let formattedUrl = fields.link?.url.split("/") ?? []
  if (formattedUrl.length > 0) {
    formattedUrl = formattedUrl[formattedUrl.length - 1].replace(/-/g, " ")
  } else {
    formattedUrl = ""
  }

  return (
    <Root className={`component c-navigationPod c-navigationPod--manual small-12 columns ${backgroundStyle} ${jsClass ? "js-equalHeight" : ""}`}>
      <div className="component-content">
        <Wrapper className="c-navigationPod__wrapper">
          {!noImage && fields['pod image'] &&
            <ImageWrapper isLarge={isLarge}>
              {fields['pod image'].alt 
               ? <Image src={fields['pod image'].url} alt={fields['pod image'].alt} loading="lazy" />
               : <Image src={fields['pod image'].url} loading="lazy" />
              }
            </ImageWrapper>
          }
          <Content>
            {fields.link &&
              <div className=" field-link">
                <Link href={linkFormatter(fields.link)} data-variantitemid={`{${id}}`} data-variantfieldname="Link">{fields.link.text || formattedUrl}</Link>
              </div>
            }
            <Text className="field-pod-text" dangerouslySetInnerHTML={{ __html: fields['pod text'] }} />
            {isLarge && fields['cta link'] &&
              <div className="c-navigationPod__cta field-cta-link">
                <a href={linkFormatter(fields['cta link'])} data-variantitemid={`{${id.toUpperCase()}}`} data-variantfieldname="CTA link">{fields['cta link'].text}</a>
              </div>
            }
          </Content>
        </Wrapper>
      </div>
    </Root>
  )
}

export default Card