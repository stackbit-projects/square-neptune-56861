import styled from 'styled-components'
import { typography } from '../../theme'

export const ContinueButton = styled.button`
  ${typography.link}
  background: ${props => props.theme.colors.primaryLight};
  border-radius: 25px;
  padding: 13px 50px 13px 25px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center right 24px;
  background-image: url(/images/icon-arrow-blue.svg);
`