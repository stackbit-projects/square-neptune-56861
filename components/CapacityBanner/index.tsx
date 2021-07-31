import React from 'react'
import { Root, Text, Button } from './CapacityBanner.styles'

const CapacityBanner = (props) => {
  const { page: { fields: { capacity } }} = props.renderingContext

  if (!capacity) {
    return null
  }

  let url = null
  if (capacity["link"] && capacity["link"]["linktype"] === "anchor") {
    url = `#${capacity["link"]["anchor"]}`
  } else if (capacity["link"]) {
    url = capacity["link"]["url"]
  }

  return (
    <div className="component small-12 columns">
      <Root>
        <Text>{capacity["summary"]}</Text>
        {url &&
          <Button type={capacity["title"]} href={url} target={capacity["link"]["target"]}>{capacity["link"]["text"]}</Button>
        }
      </Root>
    </div>
  )
}

export default CapacityBanner