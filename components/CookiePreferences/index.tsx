import React from 'react'

const CookiePreferences = (props) => {
  const [advertising, setAdvertising] = React.useState(false)
  const [functional, setFunctional] = React.useState(false)
  const fields = props?.renderingContext?.item?.fields;
  const cookieName = fields && fields["cookie name"] ? fields["cookie name"]: 'GDUK_GDPR_PREF'
  if (!fields) {
    return null
  }

  const {title, yestext, notext, submitbuttontext} = fields;

  React.useEffect(() => {
    const parts = `; ${document.cookie}`.split(`; ${cookieName}=`);
    if (parts.length >= 2) {
      const value = JSON.parse(parts.pop().split(';').shift())
      setAdvertising(value.cc.Advertising)
      setFunctional(value.cc.Functional)
    }
  }, [cookieName])

  const onSubmit = () => {
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const updatedCookieData = {
      a: true, rm: false, ac: false, so: false,
      cc: {
        Required: true,
        Advertising: advertising,
        Functional: functional,
      },
      ed: expiryDate.toISOString()
    }

    document.cookie = `${cookieName}=${JSON.stringify(updatedCookieData)};expires='${expiryDate.toString()}';path=/`
    document.cookie = `privacy-notification=1;expires='${expiryDate.toString()}';path=/`
    window.location.replace(window.location.origin + window.location.pathname);
  }

  return (
    <div className="component cookiepreferences small-12 columns" id="TopOfCookiePreferences">
      <div className="container cookie-preferences">
        <h2 id="cookie-consent">{title}</h2>
        <p>{fields["intro content"]}</p>

        <div className="cookie-preferences__section">
          <fieldset>
            <legend><strong>Required cookies</strong></legend>
            <p id="requiredIntro">{fields["required cookie intro"]}</p>

            <div className="cookie-preferences__choices">
              <div className="cookie-preferences__choice">
                <input aria-describedby="requiredIntro" checked={true} className="customRadio" id="RequiredCookieIsAlwaysTrue" name="RequiredCookieIsAlwaysTrue" type="radio" value="True" />
                <label htmlFor="RequiredCookieIsAlwaysTrue">{yestext}</label>
              </div>
            </div>
          </fieldset>
        </div>
        {/* This repeats for every child on the datasource, currently just 2 */}
        <div className="cookie-preferences__section">
          <fieldset>
            <legend><strong>Advertising Cookies</strong></legend>
            <p id="cookie_section0">Cookies used for advertising purposes</p>

            <div className="cookie-preferences__choices">
              <div className="cookie-preferences__choice" onClick={() => setAdvertising(true)} >
                <input aria-describedby="cookie_section0" className="customRadio" id="ChildItems_0__IsSelectedyes" name="ChildItems[0].IsSelected" type="radio" value="True" checked={advertising} />
                <label htmlFor="ChildItems_0__IsSelectedyes">{yestext}</label>
              </div>
              <div className="cookie-preferences__choice" onClick={() => setAdvertising(false)} >
                <input aria-describedby="cookie_section0" className="customRadio" id="ChildItems_0__IsSelectedno" name="ChildItems[0].IsSelected" type="radio" value="False" checked={!advertising} />
                <label htmlFor="ChildItems_0__IsSelectedno">{notext}</label>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="cookie-preferences__section">
          <fieldset>
            <legend><strong>Function Cookies</strong></legend>
            <p id="cookie_section1">Cookies that allow Guide Dogs to better understand how consumers use the website</p>

            <div className="cookie-preferences__choices">
              <div className="cookie-preferences__choice">
                <input type="radio" aria-describedby="cookie_section1" id="ChildItems_1__IsSelectedyes" name="ChildItems[1].IsSelected" className="customRadio" value="True" checked={functional} onClick={() => setFunctional(true)} />
                <label htmlFor="ChildItems_1__IsSelectedyes">{yestext}</label>
              </div>
              <div className="cookie-preferences__choice">
                <input type="radio" aria-describedby="cookie_section1" className="customRadio" id="ChildItems_1__IsSelectedno" name="ChildItems[1].IsSelected" value="False" checked={!functional} onClick={() => setFunctional(false)} />
                <label htmlFor="ChildItems_1__IsSelectedno">{notext}</label>
              </div>
            </div>
          </fieldset>
        </div>

        <button type="button" className="cta-secondary cookie-preferences__button" onClick={onSubmit}>{submitbuttontext}</button>
      </div>
    </div>
  )
}

export default CookiePreferences