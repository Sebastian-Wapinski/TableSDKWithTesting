import React from 'react'
import PropTypes from 'prop-types'

import { StyledCustomErrorBoundary } from './CustomErrorBoundary.styled'
import { useErrorBoundary } from 'react-error-boundary'

export const CustomErrorBoundary = (props) => {
  const {
    error
  } = props

  const { resetBoundary } = useErrorBoundary()

  return (
    <StyledCustomErrorBoundary
      role={'alert'}
    >
      <p>Something went wrong. Error Message:</p>
      <p>{error.message}</p>
      <button onClick={resetBoundary}>REFRESH</button>
    </StyledCustomErrorBoundary>
  )
}

CustomErrorBoundary.propTypes = {
  error: PropTypes.object
}

export default CustomErrorBoundary
