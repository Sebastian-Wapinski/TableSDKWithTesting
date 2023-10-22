import styled from 'styled-components'
import { responsiveSizes } from '../../components/style/responsiveSizes'

const DefaultStyledContainerSdk = styled.div`
width: 90%;

@media (max-width: ${responsiveSizes.small}) {
  width: calc(100% - 2rem);
}
`

const StyledContainerSdk = styled(DefaultStyledContainerSdk)(
  props => props.style
)

const StyledTable = styled.table`
border-collapse: collapse;
width: 100%;
`

const StyledThead = styled.thead`

`

export { StyledContainerSdk, StyledTable, StyledThead }
