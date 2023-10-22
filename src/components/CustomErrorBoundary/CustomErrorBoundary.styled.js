import styled from 'styled-components'

const DefaultStyledCustomErrorBoundary = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

width: 100%;
height: 100vh;

background-color: ${(props) => props.theme.primaryBackground};
text-align: center;
`

const StyledCustomErrorBoundary = styled(DefaultStyledCustomErrorBoundary)(
  props => props.style
)

const StyledPreMessage = styled.p`
font-size: 1.3rem;
font-weight: 600;
color: ${(props) => props.theme.primaryTextColor};
padding: 0 0.5rem;
`

const StyledMessage = styled.p`
font-size: 0.9rem;
font-weight: 600;
color: ${(props) => props.theme.errorMessage};
padding: 1rem 0.5rem;
`

const StyledRefreshButton = styled.button`
font-size: 1.1rem;
font-weight: 600;
color: ${(props) => props.theme.primaryBackground};
background-color: ${(props) => props.theme.forthBackground};
padding: 1rem 3rem;
border-radius: 12px;
cursor: pointer;
transition: all 0.3s ease-in-out;
border: 1px solid ${(props) => props.theme.forthBackground};

&:hover {
  color: ${(props) => props.theme.forthBackground};
  background-color: ${(props) => props.theme.primaryBackground};
}
`

export { StyledCustomErrorBoundary, StyledPreMessage, StyledMessage, StyledRefreshButton }
