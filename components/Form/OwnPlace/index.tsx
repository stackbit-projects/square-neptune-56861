import React from 'react'
import DashedDivider from '../../Divider/Dashed'
import { StyledButton } from '../Form.styles'
import { RegFeeText, Root, Wrapper } from './OwnPlace.styles'

interface OwnPlaceProps {
  onClick: () => void 
}

export const OwnPlace = (props: OwnPlaceProps) => {
  return (
    <Root>
      <DashedDivider />
      <Wrapper>
        <h2>Already have your own place?</h2>
        <RegFeeText>Registration fee: </RegFeeText>
        <p className="h1">FREE</p>
        <StyledButton onClick={props.onClick}>I have my own place</StyledButton>
      </Wrapper>
    </Root>
  )
}