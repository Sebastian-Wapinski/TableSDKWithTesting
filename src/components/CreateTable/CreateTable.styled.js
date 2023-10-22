import styled from 'styled-components'

const DefaultStyledCreateTable = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

width: 100%;
height: 100vh;

background-color: ${(props) => props.theme.primaryBackground};
`

const StyledCreateTable = styled(DefaultStyledCreateTable)(
  props => props.style
)

export { StyledCreateTable }
