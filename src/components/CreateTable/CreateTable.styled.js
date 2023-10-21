import styled from 'styled-components'

const DefaultStyledCreateTable = styled.div`
width: 100%;
height: 100vh;
background-color: green;
`

const StyledCreateTable = styled(DefaultStyledCreateTable)(
  props => props.style
)

export { StyledCreateTable }
