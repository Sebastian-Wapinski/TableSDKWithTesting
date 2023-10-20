import React from 'react'
import PropTypes from 'prop-types'

import { StyledTableData } from './TableData.styled'

export const TableData = (props) => {
  const {
    columns,
    data
  } = props

  return (
    <StyledTableData>
      {
        data.length !== 0 ?
          data.map((row) => {
            return (
              <tr key={`${row.id}/${row.name}`}>
                {
                  columns.map((cell) => {
                    return (
                      <td key={`${row.id}/${row.name}/${cell.id}`}>{row[cell.field]}</td>
                    )
                  })
                }
              </tr>
            )
          })
          :
          null
        }
    </StyledTableData>
  )
}

TableData.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}

export default TableData
