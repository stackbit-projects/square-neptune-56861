// import "../../styles/component-hero.scss";

const Hero = (props) => {
  const fields = props?.renderingContext?.item?.fields;
  if (!fields) {
    return null;
  }
  const {
    herotitle,
    heroimage,
    herosummarycopy,
    heroctabuttonlink,
    herofocalpoint,
  } = fields;

  return (
    <div className="component c-hero c-hero--primary small-12 columns">
      <div className="component-content">
        <div className="c-hero__wrapper">
          {heroimage &&
            <div
              className="c-hero__image"
              style={{
                backgroundImage: `url(${heroimage.url})`,
              }}
            />
          }
          <div className="c-hero__content">
            <h1
              className="c-hero__title field-herotitle"
              dangerouslySetInnerHTML={{ __html: herotitle }}
            />
            <p
              className="c-hero__text field-herosummarycopy"
              dangerouslySetInnerHTML={{ __html: herosummarycopy }}
            />
            {heroctabuttonlink && (
              <div className="c-hero__cta field-heroctabuttonlink">
                <a
                  href={heroctabuttonlink.url}
                  data-variantitemid="{3D1B565F-6DFD-42C5-9BE5-D6C3F6FD295D}"
                  data-variantfieldname="HeroCtaButtonLink"
                >
                  {heroctabuttonlink.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `@media only screen and (max-width: 959px) {.c-hero__image { background-position: ${herofocalpoint}} } }`,
        }}
      />
    </div>
  );
};

export default Hero