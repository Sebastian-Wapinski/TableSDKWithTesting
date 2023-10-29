import styled, { css } from 'styled-components'
import { responsiveSizes } from '../../../../components/style/responsiveSizes'

const DefaultStyledTableHeadings = styled.tr`

`

const StyledTableHeadings = styled(DefaultStyledTableHeadings)(
  props => props.style
)

const StyledTh = styled.th`
border: 1px solid ${props => props.theme.primaryBackground};
border-collapse: collapse;
padding: 0.7rem 1rem;
background: ${props => props.theme.forthBackground};
color: ${props => props.theme.primaryBackground};
transition: all 0.3s ease-in-out;
min-width: 3rem;
max-width: 10rem;

${
  props => props.$isSorting && css`
    &:hover {
      cursor: pointer;
      background: ${props => props.theme.primaryBackground};
      color: ${props => props.theme.forthBackground};
}
  `
}

@media (max-width: ${responsiveSizes.small}) {
  padding: 0.4rem 0.2rem;
  font-weight: 400;
  font-size: 0.7rem;
  max-width: 2.7rem;
  overflow-wrap: break-word;
}
`

export { StyledTableHeadings, StyledTh }
