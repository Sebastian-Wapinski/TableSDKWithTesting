import React from 'react'
import CreateTable from './CreateTable'
import { useErrorBoundary } from 'react-error-boundary'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import { getData } from '../../provider/getData'
import TableSdk from '../../SDK/TableSdk/TableSdk'

const mockData = {
  data: {
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
    ],
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
  }
}

jest.spyOn(window, 'fetch')

jest.mock('react-error-boundary', () => {
  return {
    useErrorBoundary: jest.fn()
  }
})

describe('CreateTable', () => {
  it('should fetch data', async () => {
    const showBoundary = jest.fn()
    useErrorBoundary.mockReturnValue({ showBoundary })

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => (mockData)
    })

    await act(async () => {
      render(
        <CreateTable />
      )
    })

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3005/data')
    expect(window.fetch).toHaveReturnedTimes(1)

    const fetchedDataReturnValueObject = await window.fetch.mock.results[0].value
    const fetchedDataReturnValue = await fetchedDataReturnValueObject.json()

    expect(fetchedDataReturnValue).toEqual(mockData)
  })

  it('should render tableSdk', async () => {
    const showBoundary = jest.fn()
    useErrorBoundary.mockReturnValue({ showBoundary })

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => (mockData)
    })

    const fetchedData = await getData('data')

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3005/data')
    expect(window.fetch).toHaveReturnedTimes(1)

    const fetchedDataReturnValueObject = await window.fetch.mock.results[0].value
    const fetchedDataReturnValue = await fetchedDataReturnValueObject.json()

    expect(fetchedDataReturnValue).toEqual(mockData)

    act(() => {
      render(
        <TableSdk
          columns={fetchedData.data.tableHeaders}
          data={fetchedData.data.tableData}
          options={{
            filter: true,
            sort: true
          }}
          pageLimit={5}
        />
      )
    })

    const nameHeading = screen.getByText('Name')
    const salaryHeading = screen.getByText('Salary')

    expect(nameHeading).toBeInTheDocument()
    expect(salaryHeading).toBeInTheDocument()

    const name1 = screen.getByText('Jan')
    const name2 = screen.getByText('Ala')
    const salary1 = screen.getByText('2000')
    const salary2 = screen.getByText('3000')

    expect(name1).toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(salary1).toBeInTheDocument()
    expect(salary2).toBeInTheDocument()
  })
})
