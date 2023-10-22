import React from 'react'
import PropTypes from 'prop-types'

import { StyledInput } from './Input.styled'

export const Input = (props) => {
  const {
    name,
    filterFn,
    setFilteredData,
    filteredData,
    setCurrentPageNumber
  } = props

  const [value, setValue] = React.useState('')

  return (
    <StyledInput
      type={'text'}
      name={name}
      value={value}
      autoComplete={'one-time-code'}
      onChange={(e) => {
        const newObj = { ...filteredData, [name]: e.target.value }
        setFilteredData(newObj)
        setCurrentPageNumber(1)
        setValue(e.target.value)
        filterFn(newObj)
      }}
    />
  )
}

Input.propTypes = {
  name: PropTypes.string,
  filterFn: PropTypes.func,
  setFilteredData: PropTypes.func,
  setCurrentPageNumber: PropTypes.func,
  filteredData: PropTypes.object
}

export default Input
