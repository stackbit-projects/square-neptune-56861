export const getBlueBackground = (variant: string) => {
  const Styles = {
    LightBlue: "{76720053-27F8-4CCF-8652-69A6A91FA586}",
    DarkBlue: "{0D887421-9606-4A99-8B97-D20C79EAE2C0}",
  }

  const lightBlueBg = variant === Styles.LightBlue;
  const darkBlueBg = variant === Styles.DarkBlue;

  if (!lightBlueBg && !darkBlueBg) {
    return ""
  }

  let bgClass = "row-bg "

  if (lightBlueBg) {
    bgClass += "row-bg--blue"
  }

  if (darkBlueBg) {
    bgClass += "row-bg--darkBlue"
  }

  return bgClass
}