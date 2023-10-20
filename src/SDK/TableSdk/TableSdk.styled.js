import styled from 'styled-components'

const DefaultStyledTableSdk = styled.div`

`

const StyledTableSdk = styled(DefaultStyledTableSdk)(
  props => props.style
)

export { StyledTableSdk }
