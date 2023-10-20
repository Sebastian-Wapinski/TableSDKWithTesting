import styled from 'styled-components'

const DefaultStyledCustomErrorBoundary = styled.div`

`

const StyledCustomErrorBoundary = styled(DefaultStyledCustomErrorBoundary)(
  props => props.style
)

export { StyledCustomErrorBoundary }
