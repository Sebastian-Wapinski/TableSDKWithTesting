import React from 'react'
import PropTypes from 'prop-types'

import { StyledTableSdk } from './TableSdk.styled'

export const TableSdk = (props) => {
  const {
    children,
    columns,
    data,
    ...otherProps
  } = props

  return (
    <StyledTableSdk
      {...otherProps}
    >
      {children}
    </StyledTableSdk>
  )
}

TableSdk.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.array,
  data: PropTypes.array
}

export default TableSdk
