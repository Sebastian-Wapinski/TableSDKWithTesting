import React from 'react'
import PropTypes from 'prop-types'

import { StyledPagination } from './Pagination.styled'

export const Pagination = (props) => {
  const {
    children,
    pageNum = 1,
    limit = 5
  } = props

  const begin = limit * (pageNum - 1)
  const end = pageNum * limit

  return (
    children ?
      <StyledPagination>
        {children.slice(begin, end)}
      </StyledPagination>
      :
      null
  )
}

Pagination.propTypes = {
  children: PropTypes.node,
  limit: PropTypes.number,
  pageNum: PropTypes.number,
  currentPageNumber: PropTypes.number
}

export default Pagination
