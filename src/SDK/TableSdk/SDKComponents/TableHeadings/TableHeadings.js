import React from 'react'
import PropTypes from 'prop-types'

import { StyledTableHeadings } from './TableHeadings.styled'

export const TableHeadings = (props) => {
  const {
    columns,
    onClick
  } = props

  return (
    <StyledTableHeadings>
      {
        columns.length !== 0 ?
          columns.map((column, index) => {
            return (
              <th
                onClick={() => onClick(column.field)}
                key={`${column.field}/${index}/heading`}
              >
                {column.title}
              </th>
            )
          })
          :
          null
        }
    </StyledTableHeadings>
  )
}

TableHeadings.propTypes = {
  columns: PropTypes.array,
  onClick: PropTypes.func
}

export default TableHeadings