import React from 'react'

const JustGiving = (props) => {
  const { item: { fields } } = props.renderingContext

  if (!fields) {
    return null
  }

  return (
    <React.Fragment>
      <h2>{fields["title"]}</h2>
      <div dangerouslySetInnerHTML={{__html: fields["summary"]}}/>

      <a href={fields["link"]["url"]} target={fields["link"]["target"]}>
        <img src={fields["image"]["url"]} alt={fields["image"]["alt"]} />
      </a> 
    </React.Fragment>
  )
}

export default JustGiving