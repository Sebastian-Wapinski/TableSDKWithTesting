import React from 'react'
import PropTypes from 'prop-types'

import { StyledButtonsChangingPages, StyledButton, StyledPagesInfo } from './ButtonsChangingPages.styled'

export const ButtonsChangingPages = (props) => {
  const {
    currentPageNumber,
    setCurrentPageNumber,
    allPages
  } = props

  const setPrevPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(prevState => prevState - 1)
    }
  }

  const setNextPage = () => {
    if (currentPageNumber < allPages) {
      setCurrentPageNumber(prevState => prevState + 1)
    }
  }

  return (
    <StyledButtonsChangingPages>
      <StyledButton
        onClick={setPrevPage}
        disabled={(currentPageNumber === 1)}
        data-testid={'prevButton/ButtonsChangingPages'}
      >
        &lsaquo;
      </StyledButton>
      <StyledPagesInfo>{currentPageNumber}/{allPages}</StyledPagesInfo>
      <StyledButton
        onClick={setNextPage}
        disabled={(currentPageNumber === allPages)}
        data-testid={'nextButton/ButtonsChangingPages'}
      >
        &rsaquo;
      </StyledButton>
    </StyledButtonsChangingPages>
  )
}

ButtonsChangingPages.propTypes = {
  currentPageNumber: PropTypes.number,
  setCurrentPageNumber: PropTypes.func,
  allPages: PropTypes.number
}

export default ButtonsChangingPages
