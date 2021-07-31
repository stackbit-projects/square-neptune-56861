import React from 'react'

const cookieName = 'cookie-policy'

export const CookieBanner = (props) => {
  const [hideBanner, setHideBanner] = React.useState(false)

  React.useEffect(() => {
    if (props.renderingContext.item.url.includes('privacy-policy') || document.cookie.includes(cookieName)) {
      setHideBanner(true)
    }
  }, [])

  return (
    <div 
      className="privacy-warning permisive"
      style={{
        display: hideBanner ? 'none' : 'block'
      }}
    >
      <div className="info">
        <p>We use necessary cookies to make our site work and give you the best possible experience. You can choose not to allow some types of cookies but this might affect how the website works. We would like to set optional analytics and advertising cookies to help us improve and customise your browsing experience; for analytics and metrics; and to allow Guide Dogs and our advertising partners to provide you with messages tailored to your interests.  We won’t set optional cookies unless you enable them.  For more information about the cookies we use, please see our <a href="/privacy-policy">Privacy Policy</a>.</p>
      </div>
      <div className="controls">
        <div className="submit">
          <button
            onClick={() => {
              document.cookie = `${cookieName}=accepted`;
              setHideBanner(true)
            }}
          >Accept</button>
        </div>

        <div className="submit" style={{ paddingLeft: '15px' }}>
          <button onClick={() => window.location.replace('privacy-policy#cookie-consent')}>Manage preferences</button>
        </div>

        <div className="submit REJECT CLASS" style={{ paddingLeft: '15px' }}>
          <button
            onClick={() => {
              document.cookie = `${cookieName}=rejected`;
              setHideBanner(true)
            }}
          >Reject</button>
        </div>
      </div>
    </div>
  )
}