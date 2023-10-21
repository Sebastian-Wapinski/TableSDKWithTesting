import React from 'react'
import PropTypes from 'prop-types'

import { StyledPagination } from './Pagination.styled'

export const Pagination = (props) => {
  const {
    children,
    pageNum = 1,
    limit = 5,
    setCurrentPageNumber
  } = props

  const calculatePagesAmount = () => {
    return Math.ceil((isNaN(length) ? 0 : length) / limit)
  }

  // const length = children.props && children.props.children[1] && children.props.children[1].props && children.props.children[1].props.data
  const length = children
  console.log(length)
  const pages = calculatePagesAmount()

  const pageNumbers = (new Array(pages).fill(0).map((item, index) => {
    return (
      <li
        key={`${index}/pageNumber`}
        onClick={() => setCurrentPageNumber(index + 1)}
      >
        {index + 1}
      </li>
    )
  }))

  const begin = limit * (pageNum - 1)
  const end = pageNum * limit

  return (
    children.props.children[1] ?
      <StyledPagination>
        {children.slice(begin, end)}
        <nav>
          <ul>
            {pageNumbers}
          </ul>
        </nav>
      </StyledPagination>
      :
      null
  )
}

Pagination.propTypes = {
  children: PropTypes.node,
  limit: PropTypes.number,
  pageNum: PropTypes.number,
  setCurrentPageNumber: PropTypes.func
}

export default Pagination
