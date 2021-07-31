import React from 'react'

const Divider = (props) => {
  return (
    <div className={`component divider small-12 columns ${props.dashed && "dashed"}`}>
      <div className="component-content">
        <hr />
      </div>
    </div>
  )
}

export default Divider