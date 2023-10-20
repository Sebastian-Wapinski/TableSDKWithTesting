import styled from 'styled-components'

const DefaultStyledTableData = styled.tbody`

`

const StyledTableData = styled(DefaultStyledTableData)(
  props => props.style
)

export { StyledTableData }
