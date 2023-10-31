import React from 'react'
import PropTypes from 'prop-types'

import { StyledInput } from './Input.styled'

export const Input = (props) => {
  const {
    name,
    filterFn,
    setFilteredData,
    filteredData,
    setCurrentPageNumber,
    dataTestid
  } = props

  const [value, setValue] = React.useState('')

  const handleOnChange = (e) => {
    const newObj = { ...filteredData, [name]: e.target.value }
    setFilteredData(newObj)
    setCurrentPageNumber(1)
    setValue(e.target.value)
    filterFn(newObj)
  }

  return (
    <StyledInput
      type={'text'}
      name={name}
      value={value}
      autoComplete={'one-time-code'}
      onChange={handleOnChange}
      data-testid={dataTestid}
    />
  )
}

Input.propTypes = {
  name: PropTypes.string,
  filterFn: PropTypes.func,
  setFilteredData: PropTypes.func,
  setCurrentPageNumber: PropTypes.func,
  filteredData: PropTypes.object,
  dataTestid: PropTypes.string
}

export default Input
