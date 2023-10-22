import styled from 'styled-components'

const DefaultStyledButtonsChangingPages = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const StyledButtonsChangingPages = styled(DefaultStyledButtonsChangingPages)(
  props => props.style
)

const StyledButton = styled.button`
padding:  0.2rem 0.2rem;
margin:  0.5rem 0.5rem;
border: 1px solid ${props => props.theme.forthBackground};
background: ${props => props.theme.forthBackground};
color: ${props => props.theme.primaryBackground};
transition: all 0.3s ease-in-out;
width: 100%;
max-width: 3rem;
text-align: center;
border-radius: 10px;
font-size: 2rem;

&:hover {
  cursor: pointer;
  background: ${props => props.theme.primaryBackground};
  color: ${props => props.theme.forthBackground};
}

&:disabled {
  background: ${props => props.theme.secondaryBackground};
  color: ${props => props.theme.forthBackground};
  cursor: not-allowed;
}
`

const StyledPagesInfo = styled.p`
color: ${props => props.theme.secondaryTextColor};
`

export { StyledButtonsChangingPages, StyledButton, StyledPagesInfo }
