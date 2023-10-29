import React from 'react'
import PropTypes from 'prop-types'

import { StyledPagination } from './Pagination.styled'

export const Pagination = (props) => {
  const {
    children,
    pageNum = 1,
    pageLimit = 5
  } = props

  const begin = pageLimit * (pageNum - 1)
  const end = pageNum * pageLimit

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
  pageLimit: PropTypes.number,
  pageNum: PropTypes.number,
  currentPageNumber: PropTypes.number
}

export default Pagination
