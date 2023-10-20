import styled from 'styled-components'

const DefaultStyledTableHeadings = styled.tr`

`

const StyledTableHeadings = styled(DefaultStyledTableHeadings)(
  props => props.style
)

export { StyledTableHeadings }
