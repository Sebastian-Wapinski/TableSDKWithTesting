import styled, { css } from 'styled-components'

const DefaultStyledPaginationNav = styled.nav`

`

const StyledPaginationNav = styled(DefaultStyledPaginationNav)(
  props => props.style
)

const StyledUl = styled.ul`
list-style: none;
display: flex;
justify-content: center;
align-items: center;
`

const StyledLi = styled.li`
padding:  0.5rem 0.5rem;
margin:  0.5rem 0.5rem;
border: 1px solid ${props => props.theme.forthBackground};
background: ${props => props.theme.forthBackground};
color: ${props => props.theme.primaryBackground};
transition: all 0.3s ease-in-out;
width: 100%;
max-width: 3rem;
text-align: center;
border-radius: 10px;

&:hover {
  cursor: pointer;
  background: ${props => props.theme.primaryBackground};
  color: ${props => props.theme.forthBackground};
}

${
  props => props.$isActive && css`
    background: ${props => props.theme.primaryBackground};
    color: ${props => props.theme.forthBackground};
  
    &:hover {
    cursor: not-allowed;
    background: ${props => props.theme.primaryBackground};
    color: ${props => props.theme.forthBackground};
  }
  `
}
`

const StyledDots = styled.p`
color: ${props => props.theme.primaryTextColor};
`

export { StyledPaginationNav, StyledUl, StyledLi, StyledDots }
