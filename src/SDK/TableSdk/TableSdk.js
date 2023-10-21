import React from 'react'
import PropTypes from 'prop-types'

import { StyledContainerSdk } from './TableSdk.styled'
import TableHeadings from './SDKComponents/TableHeadings'
import TableData from './SDKComponents/TableData'
import Input from './SDKComponents/Input'
import PaginationNav from './SDKComponents/PaginationNav/PaginationNav'

export const TableSdk = (props) => {
  const {
    columns,
    data,
    options
  } = props

  const { sort, filter } = options

  const [moderatedData, setModeratedData] = React.useState([])
  const [sortOrder, setSortOrder] = React.useState('asc')
  const [filteredData, setFilteredData] = React.useState({})
  const [currentPageNumber, setCurrentPageNumber] = React.useState(1)
  const [allPages, setAllPages] = React.useState(1)

  React.useEffect(() => {
    setModeratedData(data)
  }, [data])

  const sortFn = React.useCallback((field) => {
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
  }, [moderatedData, sortOrder])

  const filterFn = (newFilterParams) => {
    const newFilteredData = data.filter((oneRow) => {
      const conditions = Object.entries(newFilterParams).map((param) => {
        const [key, value] = param
        return oneRow[key].toLowerCase().startsWith(value.toLowerCase())
      })

      return conditions.every((condition) => condition)
    })

    setModeratedData(newFilteredData)
  }

  const inputsToFilter = [...columns].map((column, index) => {
    return (
      <Input
        type={'text'}
        name={column.field}
        key={`${column.id}/${column.field}/input`}
        filterFn={filterFn}
        index={index}
        setFilteredData={setFilteredData}
        filteredData={filteredData}
        setCurrentPageNumber={setCurrentPageNumber}
      />
    )
  })

  return (
    <StyledContainerSdk>
      {
        filter ? inputsToFilter : null
        }
      <table>
        <thead>
          <TableHeadings
            columns={columns}
            onClick={sort ? sortFn : null}
            filter={filter}
            inputsToFilter={filter ? inputsToFilter : null}
          />
        </thead>
        {
            moderatedData.length > 0 ?
              <TableData
                columns={columns}
                data={moderatedData}
                currentPageNumber={currentPageNumber}
              />
              :
            // <tbody><tr><td>No Data</td></tr></tbody>
              null
          }
      </table>
      <nav>
        <ul>
          <PaginationNav
            data={moderatedData}
            setCurrentPageNumber={setCurrentPageNumber}
            setAllPages={setAllPages}
          />
        </ul>
      </nav>
      <div>
        <button
          onClick={() => {
            if (currentPageNumber > 1) {
              setCurrentPageNumber(prevState => prevState - 1)
            }
          }}
        >
          &lsaquo;
        </button>
        <p>{currentPageNumber}/{allPages}</p>
        <button
          onClick={() => {
            if (currentPageNumber < allPages) {
              setCurrentPageNumber(prevState => prevState + 1)
            }
          }}
        >
          &rsaquo;
        </button>
      </div>
    </StyledContainerSdk>
  )
}

TableSdk.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object
}

export default TableSdk
