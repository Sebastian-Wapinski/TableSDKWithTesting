import React from 'react'
import PropTypes from 'prop-types'

import { StyledPaginationNav } from './PaginationNav.styled'

export const PaginationNav = (props) => {
  const {
    limit = 5,
    data,
    setCurrentPageNumber,
    setAllPages
  } = props

  const calculatePagesAmount = () => {
    return Math.ceil((isNaN(length) ? 0 : length) / limit)
  }

  const length = data && data.length
  const pages = calculatePagesAmount()

  const pageNumbers = (new Array(pages).fill(0).map((item, index) => {
    return (
      <li
        key={`${index}/pageNumber`}
        onClick={() => {
          setCurrentPageNumber(index + 1)
        }}
      >
        {index + 1}
      </li>
    )
  }))

  React.useEffect(() => {
    setAllPages(pages)
  }, [pages, setAllPages])

  return (
    <StyledPaginationNav>
      {pageNumbers}
    </StyledPaginationNav>
  )
}

PaginationNav.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setAllPages: PropTypes.func
}

export default PaginationNav
