import React from 'react'
import PropTypes from 'prop-types'

import { StyledContainerSdk, StyledTable, StyledThead } from './TableSdk.styled'
import TableHeadings from './SDKComponents/TableHeadings'
import TableData from './SDKComponents/TableData'
import PaginationNav from './SDKComponents/PaginationNav/PaginationNav'
import ButtonsChangingPages from './SDKComponents/ButtonsChangingPages/ButtonsChangingPages'

export const TableSdk = (props) => {
  const {
    columns,
    data,
    options,
    pageLimit
  } = props

  const { sort = false, filter = false } = options

  const [moderatedData, setModeratedData] = React.useState([])
  const [currentPageNumber, setCurrentPageNumber] = React.useState(1)
  const [allPages, setAllPages] = React.useState(1)

  React.useEffect(() => {
    setModeratedData(data)
  }, [data])

  return (
    typeof columns !== 'undefined' && typeof data !== 'undefined' ?
      <StyledContainerSdk>
        <StyledTable>
          <StyledThead>
            <TableHeadings
              columns={columns}
              $isSorting={sort}
              setModeratedData={setModeratedData}
              moderatedData={moderatedData}
            />
          </StyledThead>
          <TableData
            columns={columns}
            moderatedData={moderatedData}
            data={data}
            currentPageNumber={currentPageNumber}
            filter={filter}
            setModeratedData={setModeratedData}
            setCurrentPageNumber={setCurrentPageNumber}
            pageLimit={pageLimit}
          />
        </StyledTable>
        <PaginationNav
          data={moderatedData}
          setCurrentPageNumber={setCurrentPageNumber}
          setAllPages={setAllPages}
          currentPageNumber={currentPageNumber}
          pageLimit={pageLimit}
        />
        {
        moderatedData.length > 0 ?
          <ButtonsChangingPages
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            allPages={allPages}
          />
          :
          null
      }
      </StyledContainerSdk>
      :
      null
  )
}

TableSdk.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  pageLimit: PropTypes.number,
  options: PropTypes.object
}

export default TableSdk
