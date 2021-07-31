import styled, { css } from 'styled-components'
import { maxInputWidth, typography } from '../../theme'

export const FormSectionWrapper = styled.div`
  margin: 0 0 24px 0;
`
export const BackButton = styled.button`
  ${typography.link}
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 24px center;
  background-image: url(/images/arrow-left-white.svg);
  border-radius: 100px;
  padding: 11px 24px 13px 62px;
  margin-top: 24px;
`

export const Section = styled.div`
  margin: 2rem 0;
  border: 2.5px solid ${props => props.theme.colors.black};
  border-radius: 10px;
  padding: 24px 25px 32px;
`

const StyledDisabledButton = css`
  opacity: 0.8;
`

const ButtonMixion = css`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 14px 24px;
  &:hover,
  &:focus,
  &:active {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
  ${props => props.disabled && StyledDisabledButton};
`

export const StyledButton = styled.button`
  ${ButtonMixion}
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center right 24px;
  background-image: url(/images/icon-arrow-white.svg);
  font-size: 20px;
  width: 100%;
  margin: 0 0 0;
  padding: 14px 55px 14px 24px;
  border-radius: 100px;
  ${ props => props.theme.breakpoints.sm} {
    width: auto;
  }
`

export const InlineStyledButton =  styled.button`
  ${ButtonMixion}
  font-family: 'castledown-regular';
  border-radius: 100px;
  padding: 13px 24px;
  font-size: 20px;
  display: block;
  position: relative;
  width: 100%;
  ${props => props.theme.breakpoints.sm} {
    top: 2rem;
    width: 170px;
    right: 0;
    display: inline-block;
    position: absolute;
    &:focus {
      position: absolute;
    }
  }
`

const StyledInputDisabledMixin = css`
  background: ${props => props.theme.colors.greyLight}!important;
  border-color: ${props => props.theme.colors.disabled}!important;
  color: ${props => props.theme.colors.disabled}!important;
  &:focus,
  &:hover {
    background: ${props => props.theme.colors.greyLight}!important;
    border-color: ${props => props.theme.colors.disabled}!important;
    color: ${props => props.theme.colors.disabled}!important;
  }
`

const StyledInputMixin = css<{removeGutter?: boolean}>`
  border: 2px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.primary}!important;
  background-color: ${props => props.error ? props.theme.colors.greyLight : props.theme.colors.offWhite}!important;
  margin: ${props => props.error ? '0 0 .5rem': '0 0 1.5rem'}!important;
  max-width: ${maxInputWidth}px;
  &:hover {
    background-color: ${props => props.error ? props.theme.colors.greyLight : props.theme.colors.offWhite}!important;
  }
  &:focus {
    background-color: ${props => props.theme.colors.white}!important;
  }
  ${props => props.disabled && StyledInputDisabledMixin}
  ${props => props.removeGutter ? "margin-bottom: 0!important;": ""}  
`

export const StyledInput = styled.input`
  ${StyledInputMixin}
`

export const StyledTextArea = styled.textarea`
  ${StyledInputMixin}
`

export const StyledDropdown = styled.select`
  ${StyledInputMixin}
`

export const StyledDropdownGroup =  styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 0;

  ${props => props.theme.breakpoints.sm} {
    flex-direction: row;
    max-width: ${maxInputWidth}px;
    span:nth-child(1), span:nth-child(2) { 
      margin-right: 2rem
    }
  }
`

export const InlineStyledInput = styled.input`
  ${StyledInputMixin}
  margin-bottom: .5rem!important;
  ${props => props.theme.breakpoints.sm} {
    width: calc(100% - 180px) !important;
  }
`

export const InlineWrapper = styled.div`
  position: relative;
  max-width: ${maxInputWidth}px;
`

export const StyledLabel = styled.label<{gutter?: boolean}>`
  ${props => props.disabled && StyledInputDisabledMixin}
  background: none!important;
  line-height: ${props => props.gutter ? "26px" :""};
  margin-bottom: ${props => props.gutter ? "32px" :""};
`

export const StyledLegend = styled.legend<{}>`
  ${props => props.disabled && StyledInputDisabledMixin}
  background: none!important;
  line-height: 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-family: castledown-bold,Segoe UI,Candara,Bitstream Vera Sans,DejaVu Sans,Trebuchet MS,Verdana,Verdana Ref,sans-serif;
  margin-bottom: 10px;
`

const CheckRadioDisabledMixin = css`
  cursor: not-allowed;
  opacity: .5;
`

const CheckRadioMixin = css`
  display: flex;
  align-items: end;
  position: relative;
  cursor: pointer;
  ${props => props.disabled && CheckRadioDisabledMixin}

  input:focus {
    & + span {
      outline: 2px dotted ${props => props.theme.colors.secondary} !important;
    }
  }

  input,
  input:focus {
    width: 100%;
    opacity:0!important; 
    position:absolute;
    top:0;
    z-index: 100;

    &:checked {
      & + span:before {
        background-image: url(/images/check--black.png);
        background-size: 1rem;
        background-position: 50%;
        background-repeat: no-repeat;
      }
    }
  }

  span {
    display: flex;
    &:focus {
      outline: 2px dotted ${props => props.theme.colors.secondary} !important;
    }
    &:before {
      content: "";
      display: inline-block;
      min-width: 25px;
      height: 24px;
      margin: 0 16px 0 0;
      border: 2px solid ${props => props.theme.colors.primary};
      
      background: ${props => props.theme.colors.primaryLightest};
      vertical-align: top;
     }
  }
`

export const StyledRadio = styled.label<{disabled?: boolean}>`
  ${CheckRadioMixin}
  span {
    align-items: center;
    &:before {
      border-radius: 50%;
     }
  }
`

export const StyledCheckbox = styled.label<{disabled?: boolean}>`
  ${CheckRadioMixin}
  span {
    &:before {
      border-radius: 6px;
     }
  }
`

export const StyledError = styled.span`
  font-size: 16px;
`