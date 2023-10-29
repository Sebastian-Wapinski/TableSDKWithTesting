import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import CreateTable from './CreateTable'
import { ErrorBoundary } from 'react-error-boundary'
import { getData } from '../../provider/getData'
import { act } from 'react-dom/test-utils'
import TableSdk from '../../SDK/TableSdk/TableSdk'
import CustomErrorBoundary from '../CustomErrorBoundary/CustomErrorBoundary'

jest.mock('../../provider/getData')
jest.spyOn(window, 'fetch')

describe('CreateTable', () => {
  it('should fetch data', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tableHeaders: [
          {
            title: 'Name',
            field: 'name',
            id: '1'
          },
          {
            title: 'Salary',
            field: 'salary',
            id: '2'
          }
        ]
      })
    })

    const columns = await getData('tableHeaders')
    const { tableHeaders } = columns

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tableData: [
          {
            name: 'Jan',
            salary: '2000',
            id: '1'
          },
          {
            name: 'Ala',
            salary: '3000',
            id: '2'
          }
        ]
      })
    })

    const rows = await getData('tableData')
    const { tableData } = rows

    await act(async () =>
      render(
        <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
          {
          tableHeaders && tableData ?
            <CreateTable>
              <TableSdk
                columns={tableHeaders}
                data={tableData}
                options={{
                  filter: true,
                  sort: true
                }}
                pageLimit={2}
              />
            </CreateTable>
            :
            null
        }
        </ErrorBoundary>
      )
    )

    // expect(window.fetch).toHaveBeenCalledTimes(2)

    // await waitFor(() => {
    //   screen.debug()
    // })

    await waitFor(() => {
      const nameHeader = screen.getByText('Name')
      const salaryHeader = screen.getByText('Salary')

      expect(nameHeader).toBeInTheDocument()
      expect(salaryHeader).toBeInTheDocument()
      expect(screen.queryByText('Date Of Employment')).toBeNull()
    })
  })
})

//   it('should fetch tableHeaders', async () => {
//     const mockGetData = jest.fn()
//     mockGetData.mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({
//         tableHeaders: [
//           {
//             title: 'Name',
//             field: 'name',
//             id: '1'
//           },
//           {
//             title: 'Salary',
//             field: 'salary',
//             id: '2'
//           }
//         ]
//       })
//     })

//     render(
//       <ErrorBoundary>
//         <CreateTable />
//       </ErrorBoundary>
//     )

//     await waitFor(() => {
//       const nameHeader = screen.getByText('Name')
//       const salaryHeader = screen.getByText('Salary')

//       expect(nameHeader).toBeInTheDocument()
//       expect(salaryHeader).toBeInTheDocument()
//       expect(screen.queryByText('Date Of Employment')).toBeNull()
//     })
//   })

//   it('should fetch tableData', async () => {
//     const mockGetData = jest.fn()
//     mockGetData.mockResolvedValue({
//       ok: true,
//       json: async () => ({
//         tableData: [
//           {
//             name: 'Jan',
//             salary: '2000',
//             employmentDate: '2021-08-01',
//             id: '1'
//           },
//           {
//             name: 'Ala',
//             salary: '3000',
//             employmentDate: '2018-08-01',
//             id: '2'
//           }
//         ]
//       })
//     })

//     render(
//       <ErrorBoundary>
//         <CreateTable />
//       </ErrorBoundary>
//     )

//     await waitFor(() => {
//       const nameData = screen.getByText('Jan')
//       const salaryData = screen.getByText('Ala')

//       expect(nameData).toBeInTheDocument()
//       expect(salaryData).toBeInTheDocument()
//     })
//   })
// })
