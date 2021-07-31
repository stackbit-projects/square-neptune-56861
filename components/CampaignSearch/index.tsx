import React from 'react'

const CampaignSearch = (props) => {
  const [postCode, setPostcode] = React.useState("")
  const [error, setError] = React.useState(false)

  const valid_postcode = (postcode)  => {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/i;
    return regex.test(postcode);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!postCode || !valid_postcode(postCode)) {
      setError(true)
    } else {
      const url = '/how-you-can-help/volunteering-for-guide-dogs/apply-for-a-role/?q=' + postCode + '#volunteeringSearchResults';
      window.location.replace(url)
    }
  }

  return (
    <div className="component c-danCampaignSearch columns">
      <div className="component-content">
        <div className="component c-searchBox small-12 columns">
          <div className="c-searchBox__wrapper c-searchBox__wrapper--increased-padding">
            <div className="c-searchBox__input c-searchBox__input--inline">
              <label htmlFor="searchLocation">Enter your postcode</label>
              <input type="text" id="postcode" placeholder="Please enter postcode..." value={postCode} onChange={(e) => {
                setPostcode(e.target.value)
              }}/>
            </div>
            <div className="c-searchBox__input s--button c-searchBox__input--volunteering">
              <button onClick={onSubmit} type="button" className="search-box-button">
                Search
              </button>
            </div>
          </div>
          <span className="error" id="postcodeError" style={{display: error ? 'block' : ''}}>Please enter postcode</span>
        </div>
      </div>
    </div>
  )
}

export default CampaignSearch