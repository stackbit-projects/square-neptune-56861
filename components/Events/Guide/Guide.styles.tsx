import styled from 'styled-components'
import { typography } from '../../../theme'

export const Root = styled.div`
  position: relative;
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 6px;
  background-color: ${props => props.theme.colors.white};
  padding: 32px 30px;
`

export const Title = styled.h4`
  ${typography.h4}
  margin-bottom: 16px;

`

export const Image = styled.img`
  width: 100%;
`

export const Summary = styled.p`
  ${typography.body}
  margin: 24px 0;
`
