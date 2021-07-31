import styled from 'styled-components'
import { typography } from '../../theme'

export const Root = styled.div`
  margin: 1.5rem auto;
`

export const Heading = styled.h2`
  ${typography.h2}
  margin: 57px 0 48px;
`

export const Summary = styled.div`
  ol, ul {
    list-style: revert;
    margin: 0 0 0 1.625rem;
  }
`

export const Info = styled.p<{withoutGutter: boolean}>`
  ${typography.h4}
  ${props => props.withoutGutter && `margin-bottom: 0`};
  span {
    ${typography.h4}
    display: block;
  }
`

export const Price = styled.p`
  ${typography.h1}
`