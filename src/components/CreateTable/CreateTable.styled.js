import styled from 'styled-components'

const DefaultStyledCreateTable = styled.div`

`

const StyledCreateTable = styled(DefaultStyledCreateTable)(
  props => props.style
)

export { StyledCreateTable }
