import React from 'react'
import PropTypes from 'prop-types'

import { StyledCustomErrorBoundary, StyledPreMessage, StyledMessage, StyledRefreshButton } from './CustomErrorBoundary.styled'
import { useErrorBoundary } from 'react-error-boundary'

export const CustomErrorBoundary = (props) => {
  const {
    error
  } = props

  const { resetBoundary } = useErrorBoundary()

  return (
    <StyledCustomErrorBoundary role={'alert'} >
      <StyledPreMessage>Something went wrong. Error Message:</StyledPreMessage>
      <StyledMessage>{error.message}</StyledMessage>
      <StyledRefreshButton onClick={resetBoundary}>REFRESH</StyledRefreshButton>
    </StyledCustomErrorBoundary>
  )
}

CustomErrorBoundary.propTypes = {
  error: PropTypes.object
}

export default CustomErrorBoundary
