import styled from 'styled-components'
import { typography } from '../../../theme';

export const PriceText = styled.p`
  line-height: 1;
  font-size: 2.5em;
  font-family: 'castledown-heavy';
`;


export const Text = styled.p`
  ${typography.body}
  font-weight: bold;
  margin: 0 0 8px;
`

export const CardIconWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export const CardIcon = styled.img`
  width: 32px;
  height: 26px
`

export const DiscountWrapper = styled.div`
  margin-bottom: 26px;
`

export const AppliedDiscount = styled.div`
  ${typography.link}
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  max-width: 477px;
  padding: 15px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AppliedDiscountButton = styled.button`
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-image: url(/images/icon-close--blue.svg);
  width: 30px;
  height: 15px;
`