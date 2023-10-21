import React from 'react'
import PropTypes from 'prop-types'

// import { StyledTableData } from './TableData.styled'
import Pagination from '../Pagination/Pagination'

export const TableData = (props) => {
  const {
    columns,
    data,
    currentPageNumber
  } = props

  return (
    <Pagination
      pageNum={currentPageNumber}
    >
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
    </Pagination>
  )
}

TableData.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  currentPageNumber: PropTypes.number
}

export default TableData
