import styled from 'styled-components'

const DefaultStyledPagination = styled.div`

`

const StyledPagination = styled(DefaultStyledPagination)(
  props => props.style
)

export { StyledPagination }
