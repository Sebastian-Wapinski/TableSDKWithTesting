import React from 'react'
import PropTypes from 'prop-types'

import { StyledPaginationNav, StyledUl, StyledLi, StyledDots, StyledPaginationContainer } from './PaginationNav.styled'
import { setPagesNumbersDependsOnPageNumber } from '../helper/helper'

export const PaginationNav = (props) => {
  const {
    pageLimit = 5,
    data,
    setCurrentPageNumber,
    setAllPages,
    currentPageNumber
  } = props

  const calculatePagesAmount = () => {
    return Math.ceil((isNaN(length) ? 0 : length) / pageLimit)
  }

  const addStartDots = (item, index) => {
    return (
      <StyledPaginationContainer key={`${index}/dots`}>
        <StyledDots data-testid={'startDots'}>...</StyledDots>
        {item}
      </StyledPaginationContainer>
    )
  }

  const addEndDots = (item, index) => {
    return (
      <StyledPaginationContainer key={`${index}/dots`}>
        {item}
        <StyledDots data-testid={'endDots'}>...</StyledDots>
      </StyledPaginationContainer>
    )
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
        data-testid={`${index + 1}/pageNumber/test/${isActive}`}
      >
        {index + 1}
      </StyledLi>
    )
  })
    .filter((item, index) => {
      const pageNumber = index + 1
      return setPagesNumbersDependsOnPageNumber(pageNumber, currentPageNumber, pages)
    })
    .map((item, index) => {
      const pageNumber = index + 1

      if (currentPageNumber > 3 && pageNumber === 2) {
        return addStartDots(item, index)
      }

      if (currentPageNumber < (pages - 2) && pageNumber === 4) {
        return addEndDots(item, index)
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
  pageLimit: PropTypes.number,
  currentPageNumber: PropTypes.number,
  data: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setAllPages: PropTypes.func
}

export default PaginationNav
