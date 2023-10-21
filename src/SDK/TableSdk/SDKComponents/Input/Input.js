import React from 'react'
import PropTypes from 'prop-types'

import { StyledInput } from './Input.styled'

export const Input = (props) => {
  const {
    name,
    filterFn,
    setFilteredData,
    filteredData
  } = props

  const [value, setValue] = React.useState('')

  return (
    <StyledInput
      type={'text'}
      name={name}
      value={value}
      onChange={(e) => {
        const newObj = { ...filteredData, [name]: e.target.value }
        setFilteredData(newObj)
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
  filteredData: PropTypes.object
}

export default Input
