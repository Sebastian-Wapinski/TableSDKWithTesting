import styled from 'styled-components'

const DefaultStyledPaginationNav = styled.div`

`

const StyledPaginationNav = styled(DefaultStyledPaginationNav)(
  props => props.style
)

export { StyledPaginationNav }
