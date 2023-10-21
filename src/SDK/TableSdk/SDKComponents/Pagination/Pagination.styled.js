import styled from 'styled-components'

const DefaultStyledPagination = styled.tbody`

`

const StyledPagination = styled(DefaultStyledPagination)(
  props => props.style
)

export { StyledPagination }
