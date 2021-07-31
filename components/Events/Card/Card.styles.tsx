import styled from 'styled-components'
import { typography } from '../../../theme'

export const Root = styled.div`
  position: relative;
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 6px;
  background-color: ${props => props.theme.colors.white};
`

export const ImageWrapper = styled.div<{status: "full" | "cancelled"}>`
  position: relative;
  &::after {
    background: ${props => props.status === 'full' ? props.theme.colors.secondary : props.theme.colors.error};
    opacity: 0.4;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    content: "";
  }
`
export const Image = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
 
`

export const Wrapper = styled.div`
  padding: 32px 32px 68px;
`

export const Banner = styled.div<{status: "full" | "cancelled"}>`
  ${typography.h5}
  background: ${props => props.status === 'full' ? props.theme.colors.secondary : props.theme.colors.error};
  color: ${props => props.status === 'full' ? props.theme.colors.primary : props.theme.colors.white};
  padding: 6px 25px;
`

export const Title = styled.h3`
  ${typography.h3}
  color: ${props => props.theme.colors.primary};
  a {
    text-decoration: none;
    border: none;
    ${typography.h3}
    &:hover {
      background: none;
      color: inherit;
    }
  }
`

export const Summary = styled.p`
  ${typography.body}
  color: ${props => props.theme.colors.primary};
  margin: 0;
`