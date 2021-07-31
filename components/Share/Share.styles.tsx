import styled from 'styled-components'
import { typography } from '../../theme'

export const Root = styled.div`
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 6px;
  padding: 24px 24px;
`


export const Title = styled.h2`
  ${typography.h2}
`

export const Heading = styled.h3`
  ${typography.body}
  margin: 24px 0 17px;
`


export const ShareLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 32px;
`

export const ShareLink = styled.a`
  
  color: ${props => props.theme.colors.primary};
  border-radius: 6px;
  border: 2px solid ${props => props.theme.colors.primary};
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 46%;
  
  padding: 32px 0 24px 0;
  margin-bottom: 16px;

  text-align: center;
  font-size: 1rem;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  img {
    margin-bottom: 8px;
    width: 40px;
    display: block;
  }

  span {
    ${typography.body}
  }

  ${props => props.theme.breakpoints.sm} {
    width: 32%;
  }
`