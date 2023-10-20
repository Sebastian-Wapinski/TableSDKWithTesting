import React from 'react'
import PropTypes from 'prop-types'

import { StyledContainerSdk } from './TableSdk.styled'
import TableHeadings from './SDKComponents/TableHeadings/TableHeadings'
import TableData from './SDKComponents/TableData/TableData'

export const TableSdk = (props) => {
  const {
    columns,
    data,
    options
  } = props

  const { sort } = options

  const [moderatedColumns, setModeratedColumns] = React.useState([])
  const [moderatedData, setModeratedData] = React.useState([])
  const [sortOrder, setSortOrder] = React.useState('asc')

  React.useEffect(() => {
    setModeratedColumns(columns)
    setModeratedData(data)
  }, [columns, data])

  const sortFn = React.useCallback((field) => {
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[field]
      const valueB = b[field]

      const isNumberA = isNaN(Number(a[field]))
      const isNumberB = isNaN(Number(b[field]))

      if (typeof valueA === 'string' && typeof valueB === 'string' && isNumberA && isNumberB) {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
      }
    })

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setModeratedData(sortedData)
  }, [data, sortOrder])

  return (
    <StyledContainerSdk>
      <table>
        <thead>
          <TableHeadings
            columns={moderatedColumns}
            onClick={sort ? sortFn : null}
          />
        </thead>
        <TableData
          columns={moderatedColumns}
          data={moderatedData}
        />
      </table>
    </StyledContainerSdk>
  )
}

TableSdk.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object
}

export default TableSdk
