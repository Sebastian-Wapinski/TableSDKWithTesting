import styled from 'styled-components'
import { responsiveSizes } from '../../../../components/style/responsiveSizes'

const DefaultStyledTbody = styled.tbody`

`

const StyledTbody = styled(DefaultStyledTbody)(
  props => props.style
)

const StyledTr = styled.tr`
&:nth-child(even) {
  background: ${props => props.theme.secondaryBackground};
}
`

const StyledTd = styled.td`
border: 1px solid ${props => props.theme.primaryBackground};
border-collapse: collapse;
padding: 0.7rem 1rem;
text-align: center;

min-width: 3rem;
max-width: 8rem;

&:nth-child(-n + 1) {
  background: ${props => props.theme.forthBackground};
  color: ${props => props.theme.primaryBackground};
  font-weight: 600;
}

@media (max-width: ${responsiveSizes.small}) {
  padding: 0.2rem 0;
  font-weight: 400;
  font-size: 0.7rem;
  max-width: 2.7rem;
  overflow-wrap: break-word;
}
`

const StyledTdInput = styled.td`
padding: 0;
`

export { StyledTbody, StyledTr, StyledTd, StyledTdInput }
