import React from 'react'
import PropTypes from 'prop-types'

import { StyledTbody, StyledTr, StyledTd, StyledTdInput } from './TableData.styled'
import Pagination from '../Pagination'

export const TableData = (props) => {
  const {
    columns,
    data,
    currentPageNumber,
    inputsToFilter
  } = props

  return (
    <>
      <tbody>
        <StyledTr>
          {
          inputsToFilter.map((input, index) => {
            return (
              <StyledTdInput key={`${index}/input`}>{input}</StyledTdInput>
            )
          })
      }
        </StyledTr>
      </tbody>
      {
        data.length !== 0 ?
          <Pagination
            pageNum={currentPageNumber}
          >
            {
            data.map((row) => {
              return (
                <StyledTr key={`${row.id}/${row.name}`}>
                  {
                      columns.map((cell) => {
                        return (
                          <StyledTd key={`${row.id}/${row.name}/${cell.id}`}>{row[cell.field]}</StyledTd>
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
  data: PropTypes.array,
  currentPageNumber: PropTypes.number,
  inputsToFilter: PropTypes.array
}

export default TableData
