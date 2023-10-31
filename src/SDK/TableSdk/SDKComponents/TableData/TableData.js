import React from 'react'
import PropTypes from 'prop-types'

import { StyledTbody, StyledTr, StyledTd, StyledTdInput } from './TableData.styled'
import Pagination from '../Pagination'
import Input from '../Input'

export const TableData = (props) => {
  const {
    pageLimit,
    columns,
    moderatedData,
    data,
    currentPageNumber,
    filter,
    setModeratedData,
    setCurrentPageNumber
  } = props

  const [filteredData, setFilteredData] = React.useState({})

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

  return (
    <>
      <tbody>
        <StyledTr>
          {
          filter ?
              [...columns].map((column, index) => {
                return (
                  <StyledTdInput key={`${column.id}/${column.field}/StyledTdInput`}>
                    <Input
                      type={'text'}
                      name={column.field}
                      filterFn={filterFn}
                      index={index}
                      setFilteredData={setFilteredData}
                      filteredData={filteredData}
                      setCurrentPageNumber={setCurrentPageNumber}
                      dataTestid={`${column.field}/Input/testid`}
                    />
                  </StyledTdInput>
                )
              })
            :
            null
      }
        </StyledTr>
      </tbody>
      {
        moderatedData.length !== 0 ?
          <Pagination
            pageNum={currentPageNumber}
            pageLimit={pageLimit}
          >
            {
            moderatedData.map((row) => {
              return (
                <StyledTr
                  role={'dataRow'}
                  key={`${row.id}/${row.name}`}
                >
                  {
                      columns.map((cell) => {
                        return (
                          <StyledTd
                            role={`${cell.field}/TableData`}
                            key={`${row.id}/${row.name}/${cell.id}`}
                          >
                            {row[cell.field]}
                          </StyledTd>
                        )
                      })
                    }
                </StyledTr>
              )
            })
            }
          </Pagination>
          :
          <StyledTbody>
            <StyledTr>
              <StyledTd colSpan={columns.length}>NO DATA</StyledTd>
            </StyledTr>
          </StyledTbody>
        }
    </>
  )
}

TableData.propTypes = {
  columns: PropTypes.array,
  moderatedData: PropTypes.array,
  data: PropTypes.array,
  currentPageNumber: PropTypes.number,
  pageLimit: PropTypes.number,
  filter: PropTypes.bool,
  setModeratedData: PropTypes.func,
  setCurrentPageNumber: PropTypes.func
}

export default TableData
