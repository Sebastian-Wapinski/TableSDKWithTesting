import React from 'react'
import PropTypes from 'prop-types'

import { StyledTableHeadings, StyledTh } from './TableHeadings.styled'

export const TableHeadings = (props) => {
  const {
    columns,
    $isSorting,
    setModeratedData,
    moderatedData
  } = props

  const [sortOrder, setSortOrder] = React.useState('asc')

  const sortFn = React.useCallback((field) => {
    if ($isSorting) {
      const sortedData = [...moderatedData].sort((a, b) => {
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
    } else {
      return null
    }
  }, [$isSorting, moderatedData, setModeratedData, sortOrder])

  return (
    <StyledTableHeadings>
      {
          columns.map((column, index) => {
            return (
              <StyledTh
                onClick={() => sortFn(column.field)}
                key={`${column.field}/${index}/heading`}
                $isSorting={$isSorting}
                data-testid={`${column.field}/tableHeading`}
              >
                {column.title}
              </StyledTh>
            )
          })
        }
    </StyledTableHeadings>
  )
}

TableHeadings.propTypes = {
  columns: PropTypes.array,
  moderatedData: PropTypes.array,
  setModeratedData: PropTypes.func,
  $isSorting: PropTypes.bool
}

export default TableHeadings
