import styled from 'styled-components'
import { responsiveSizes } from '../../../../components/style/responsiveSizes'

const DefaultStyledInput = styled.input`
border: 1px solid ${props => props.theme.forthBackground};
padding: 0.7rem 1rem;
margin: 0;
background: ${props => props.theme.primaryBackground};
color: ${props => props.theme.forthBackground};
width: 100%;
min-width: 3rem;
text-align: center;

@media (max-width: ${responsiveSizes.small}) {
  font-size: 0.7rem;
}
`

const StyledInput = styled(DefaultStyledInput)(
  props => props.style
)

export { StyledInput }
