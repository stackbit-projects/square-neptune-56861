interface LinkProps {
  anchor: string
  class: string
  id: string
  linktype: string
  text: string
  url: string
  target: string
  querystring: string
}

export const linkFormatter = (link: LinkProps) => {
  return `${link.url}${link.querystring ? `/?${link.querystring}`: ""}${link.linktype !== 'anchor' && link.anchor ? link.anchor : ""}`
}