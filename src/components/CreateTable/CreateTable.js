import React from 'react'

import { StyledCreateTable } from './CreateTable.styled'

import { getData } from '../../provider/getData'

import TableSdk from '../../SDK/TableSdk/TableSdk'

import { useErrorBoundary } from 'react-error-boundary'

export const CreateTable = () => {
  const [localTableHeaders, setLocalTableHeaders] = React.useState([])
  const [localTableData, setLocalTableData] = React.useState([])
  const { showBoundary } = useErrorBoundary()

  const areNotEqualData = React.useCallback((param1, param2) => {
    return (JSON.stringify(param1) !== JSON.stringify(param2))
  }, [])

  const fetchData = React.useCallback(async () => {
    try {
      const tableHeaders = await getData('tableHeaders')
      if (areNotEqualData(localTableHeaders, tableHeaders)) {
        setLocalTableHeaders(tableHeaders)
      }

      const tableData = await getData('tableData')
      if (areNotEqualData(localTableData, tableData)) {
        setLocalTableData(tableData)
      }
    } catch (error) {
      showBoundary(error)
    }
  }, [areNotEqualData, localTableData, localTableHeaders, showBoundary])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <StyledCreateTable>
      <TableSdk
        columns={localTableHeaders}
        data={localTableData}
      />
    </StyledCreateTable>
  )
}

export default CreateTable
