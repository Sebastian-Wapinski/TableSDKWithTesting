import styled from 'styled-components'

const DefaultStyledContainerSdk = styled.div`

`

const StyledContainerSdk = styled(DefaultStyledContainerSdk)(
  props => props.style
)

export { StyledContainerSdk }
