import styled, { css } from 'styled-components'
import { typography } from '../../theme'

type BannerType = "cancel" | "full" | "own_place"

export const Root = styled.div`
  margin: 26px 0;
  background: ${props => props.theme.colors.primaryLight};
  padding: 24px 32px;
  display: block;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  ${props => props.theme.breakpoints.md} {
    display: flex;
  padding: 16px 50px;

  }
`

export const Text = styled.p`
  ${typography.h3}
  margin: 0 0 16px;
  
  ${props => props.theme.breakpoints.md} {
    margin: 0;
    max-width: 70%;
  }
`

const ButtonArrowMixin = css`
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center right 24px;
  background-image: url(/images/icon-arrow-white.svg);
  padding-right: 50px;
  text-align: left;
`

export const Button = styled.a<{type: BannerType}>`
  text-decoration: none;
  border-radius: 100px;
  text-align: center;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 11px 24px;
  display: block;
  &:hover {
    color: ${props => props.theme.colors.white};
  }
  ${props => ["full", "cancel"].includes(props.type) && ButtonArrowMixin}
  ${props => props.theme.breakpoints.md} {
    display: block;
    text-align: left;
  }
`