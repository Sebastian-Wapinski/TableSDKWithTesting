import styled from 'styled-components'

const DefaultStyledCustomErrorBoundary = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

width: 100%;
height: 100vh;

background-color: green;
`

const StyledCustomErrorBoundary = styled(DefaultStyledCustomErrorBoundary)(
  props => props.style
)

const StyledPreMessage = styled.p`

`

const StyledMessage = styled.p`

`

const StyledRefreshButton = styled.button`

`

export { StyledCustomErrorBoundary, StyledPreMessage, StyledMessage, StyledRefreshButton }
