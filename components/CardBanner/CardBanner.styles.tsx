import styled from 'styled-components'

export const Root = styled.div`
  padding: 0;
  margin:1rem auto;
  margin-right:-16px;
  margin-left:-16px;
  width:-webkit-calc(100% + 32px);
  width:calc(100% + 32px);
  ${props => props.theme.breakpoints.sm} {
    width:100%;
    margin:1.5rem auto;
    margin-right:-24px;
    margin-left:-24px;
    width:-webkit-calc(100% + 48px);
    width:calc(100% + 48px);
  }
  ${props => props.theme.breakpoints.md} {
    width:100%;
    margin:2rem auto;
  }
`;