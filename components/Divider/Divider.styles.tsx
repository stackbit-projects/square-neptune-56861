import styled from 'styled-components'

export const DashedLine = styled.hr`
  border-style: dashed;
  border-color: ${props => props.theme.colors.primary};
`