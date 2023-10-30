import React from 'react'

import { StyledCreateTable } from './CreateTable.styled'

import { getData } from '../../provider/getData'

import TableSdk from '../../SDK/TableSdk/TableSdk'

import { useErrorBoundary } from 'react-error-boundary'

export const CreateTable = () => {
  const [data, setData] = React.useState([])
  const { showBoundary } = useErrorBoundary()

  const fetchData = React.useCallback(async () => {
    try {
      const fetchedData = await getData('data')
      setData(fetchedData)
    } catch (error) {
      showBoundary(error)
    }
  }, [showBoundary])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <StyledCreateTable>
      {
        data.length !== 0 ?
          <TableSdk
            columns={data.tableHeaders}
            data={data.tableData}
            options={{
              filter: true,
              sort: true
            }}
            pageLimit={5}
          />
          :
          null
      }
    </StyledCreateTable>
  )
}

export default CreateTable
