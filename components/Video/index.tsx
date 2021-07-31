import React from 'react'

const Video = (props) => {
  const { renderingContext } = props
  if (!renderingContext.item || !renderingContext.item.fields) {
    return null
  }

  const { item: { fields } } = renderingContext

  let videoId = fields.youtubemovie

  if (!videoId) {
    return null
  }

  if (videoId.includes('https')) {
    if (videoId.includes("v=")) {
      let parts = videoId.split("v=")
      if (parts[1].includes("&amp")) {
        parts = parts[1].split("&amp")
        videoId = parts[0]
      } else {
        videoId = parts[1]
      }
    } else {
      let parts = videoId.split("be/")
      videoId = parts[1]
    }
  } else if (videoId.includes('&amp')) {
    let parts = videoId.split("&amp")
    videoId = parts[0]
  }
  
  videoId = videoId.replace(" ", "").replace("v=", "")

  return (
    <div className="component video small-12 columns initialized video-small" data-properties="{&quot;enableKeyboard&quot;:&quot;true&quot;,&quot;pluginPath&quot;:&quot;/-/media/Base-Themes/Core-Libraries/Other/&quot;,&quot;name&quot;:&quot;Movie&quot;,&quot;completedTime&quot;:&quot;null&quot;}">
      <div className="component-content">
        <div className="resp-container" 
          style={{
            paddingTop: '56.25%',
            overflow: 'hidden',
            position: 'relative' 
          }}
        >
          <iframe
            className="resp-iframe"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            width="480"
            height="270"
            src={`//www.youtube-nocookie.com/embed/${videoId}?controls=1&amp;rel=0&amp;disablekb=1&amp;showinfo=0&amp;modestbranding=0&amp;html5=1&amp;iv_load_policy=3&amp;autoplay=0&amp;end=0&amp;loop=0&amp;playsinline=0&amp;start=0&amp;nocookie=false&amp;enablejsapi=1&amp;widgetid=1`}
            data-gtm-yt-inspected-353002_450="true"
            id="134111704"
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
          />
        </div>

        <div className="video-caption" dangerouslySetInnerHTML={{ __html: fields.moviecaption}} />
        <div className="video-description" dangerouslySetInnerHTML={{ __html: fields.moviedescription}} />
      </div>
    </div>
  )
}

export default Video