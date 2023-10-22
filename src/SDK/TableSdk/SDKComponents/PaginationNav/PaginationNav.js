import React from 'react'
import PropTypes from 'prop-types'

import { StyledPaginationNav, StyledUl, StyledLi, StyledDots } from './PaginationNav.styled'

export const PaginationNav = (props) => {
  const {
    limit = 5,
    data,
    setCurrentPageNumber,
    setAllPages,
    currentPageNumber
  } = props

  const calculatePagesAmount = () => {
    return Math.ceil((isNaN(length) ? 0 : length) / limit)
  }

  const length = data && data.length
  const pages = calculatePagesAmount()

  const pageNumbers = (new Array(pages)).fill(0).map((item, index) => {
    let isActive = false
    if (currentPageNumber === (index + 1)) {
      isActive = true
    }

    return (
      <StyledLi
        key={`${index}/pageNumber`}
        $isActive={isActive}
        onClick={() => {
          setCurrentPageNumber(index + 1)
        }}
      >
        {index + 1}
      </StyledLi>
    )
  })
    .filter((item, index) => {
      const pageNumber = index + 1

      if (currentPageNumber === 1 || currentPageNumber === pages) {
        return (
          pageNumber === 1 ||
          pageNumber === pages ||
          pageNumber === currentPageNumber ||
          pageNumber === currentPageNumber + 1 ||
          pageNumber === currentPageNumber - 1 ||
          pageNumber === currentPageNumber + 2 ||
          pageNumber === currentPageNumber - 2 ||
          pageNumber === currentPageNumber + 3 ||
          pageNumber === currentPageNumber - 3
        )
      }

      if (currentPageNumber === 2 || currentPageNumber === (pages - 1)) {
        return (
          pageNumber === 1 ||
          pageNumber === pages ||
          pageNumber === currentPageNumber ||
          pageNumber === currentPageNumber + 1 ||
          pageNumber === currentPageNumber - 1 ||
          pageNumber === currentPageNumber + 2 ||
          pageNumber === currentPageNumber - 2
        )
      }

      return (
        pageNumber === 1 ||
        pageNumber === pages ||
        pageNumber === currentPageNumber ||
        pageNumber === currentPageNumber + 1 ||
        pageNumber === currentPageNumber - 1
      )
    })
    .map((item, index) => {
      const pageNumber = index + 1

      if (currentPageNumber > 3 && pageNumber === 2) {
        return (
          <>
            <StyledDots>...</StyledDots>
            {item}
          </>
        )
      }

      if (currentPageNumber < (pages - 2) && pageNumber === 4) {
        return (
          <>
            {item}
            <StyledDots>...</StyledDots>
          </>
        )
      }

      return item
    })

  React.useEffect(() => {
    setAllPages(pages)
  }, [pages, setAllPages])

  return (
    <StyledPaginationNav>
      <StyledUl>
        {pageNumbers}
      </StyledUl>
    </StyledPaginationNav>
  )
}

PaginationNav.propTypes = {
  limit: PropTypes.number,
  currentPageNumber: PropTypes.number,
  data: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setAllPages: PropTypes.func
}

export default PaginationNav
