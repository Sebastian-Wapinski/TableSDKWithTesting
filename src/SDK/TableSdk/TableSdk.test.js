import React from 'react'
import { render, screen } from '@testing-library/react'
import TableHeadings from './SDKComponents/TableHeadings'
import TableData from './SDKComponents/TableData'
import PaginationNav from './SDKComponents/PaginationNav/PaginationNav'
import ButtonsChangingPages from './SDKComponents/ButtonsChangingPages/ButtonsChangingPages'
import userEvent from '@testing-library/user-event'
import TableSdk from './TableSdk'
import { columns, tableData } from './TableSdkTestDB'
import { act } from 'react-dom/test-utils'

const setUpRenderWithTwoNames = () => {
  render(
    <TableSdk
      columns={columns}
      data={tableData}
      options={{
        filter: true,
        sort: true
      }}
      pageLimit={5}
    />
  )

  const nameAla = screen.getByText('Ala')
  const nameJan = screen.getByText('Jan')

  return { nameAla, nameJan }
}

const setUpRender = (pageLimitNumber = 1) => {
  render(
    <TableSdk
      columns={columns}
      data={tableData}
      options={{
        filter: true,
        sort: true
      }}
      pageLimit={pageLimitNumber}
    />
  )
}

describe('TableSdk rendering basic pages', () => {
  it('should render headers', () => {
    render(
      <table>
        <thead>
          <TableHeadings
            columns={columns}
          />
        </thead>
      </table>
    )

    const header1 = screen.getByText(/Name/i)
    const header2 = screen.getByText(/Salary/i)
    const header3 = screen.queryByText(/Date Of Employment/i)

    expect(header1).toBeInTheDocument()
    expect(header2).toBeInTheDocument()
    expect(header3).toBeNull()
  })

  it('should render data', () => {
    render(
      <table>
        <TableData
          columns={columns}
          data={tableData}
          moderatedData={tableData}
          filter={false}
        />
      </table>
    )

    const data1 = screen.getByText(/Jan/i)
    const data2 = screen.getByText(/2000/i)

    expect(data1).toBeInTheDocument()
    expect(data2).toBeInTheDocument()
  })

  it('should render paginationNav', () => {
    const setCurrentPageNumber = jest.fn()
    const setAllPages = jest.fn()

    render(
      <PaginationNav
        data={tableData}
        currentPageNumber={1}
        setCurrentPageNumber={setCurrentPageNumber}
        setAllPages={setAllPages}
      />
    )

    const page1 = screen.getByTestId('1/pageNumber/test/true')

    expect(page1).toBeInTheDocument()
  })

  it('should render buttons changing pages', () => {
    const setCurrentPageNumber = jest.fn()

    render(
      <ButtonsChangingPages
        currentPageNumber={1}
        setCurrentPageNumber={setCurrentPageNumber}
        allPages={1}
      />
    )

    const text1 = screen.getByText('1/1')

    expect(text1).toBeInTheDocument()
  })
})

describe('TableSdk sorting', () => {
  it('TableSdk sorting by Name A-Z', () => {
    const { nameAla: name1, nameJan: name2 } = setUpRenderWithTwoNames()

    const nameTableData = screen.getAllByRole('name/TableData')

    expect(nameTableData[0] !== name1).toBeTruthy()
    expect(nameTableData[0] === name2).toBeTruthy()
    expect(nameTableData.length).toBe(5)

    act(() => {
      const sortByName = screen.getByText('Name')
      userEvent.click(sortByName)
    })

    const nameTableData2 = screen.getAllByRole('name/TableData')

    expect(nameTableData2[0] === name1).toBeTruthy()
    expect(nameTableData2[0] !== name2).toBeTruthy()
  })

  it('TableSdk sorting by Name Z-A', () => {
    setUpRender(5)

    const sortByName = screen.getByText('Name')

    act(() => {
      userEvent.click(sortByName)
    })

    act(() => {
      userEvent.click(sortByName)
    })

    const name3 = screen.getByText('Victor')
    const name4 = screen.getByText('Ula')

    const nameTableData = screen.getAllByRole('name/TableData')

    expect(nameTableData[0] === name3).toBeTruthy()
    expect(nameTableData[1] === name4).toBeTruthy()
  })
})

describe('TableSdk filtering', () => {
  it('should filter by name', () => {
    const { nameAla: name2, nameJan: name1 } = setUpRenderWithTwoNames()

    const inputName = screen.getByTestId('name/Input/testid')

    act(() => {
      userEvent.type(inputName, 'j')
    })

    const allDataRows = screen.getAllByRole('dataRow')

    expect(name1).toBeInTheDocument()
    expect(name2).not.toBeInTheDocument()
    expect(allDataRows.length).toBe(1)
  })

  it('should filter by name and not find anything', () => {
    const { nameAla: name2, nameJan: name1 } = setUpRenderWithTwoNames()

    const inputName = screen.getByTestId('name/Input/testid')

    act(() => {
      userEvent.type(inputName, 'jana')
    })

    const noData = screen.getByText(/no data/i)

    expect(noData).toBeInTheDocument()
    expect(name1).not.toBeInTheDocument()
    expect(name2).not.toBeInTheDocument()
  })

  it('should filter by name and salary', () => {
    const { nameAla: name2, nameJan: name1 } = setUpRenderWithTwoNames()

    const inputName = screen.getByTestId('name/Input/testid')

    act(() => {
      userEvent.type(inputName, 'al')
    })

    const name3 = screen.getByText('Alex')
    const allDataRows = screen.getAllByRole('dataRow')

    expect(name1).not.toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(name3).toBeInTheDocument()
    expect(allDataRows.length).toBe(2)

    const inputSalary = screen.getByTestId('salary/Input/testid')

    act(() => {
      userEvent.type(inputSalary, '3')
    })

    const allDataRows2 = screen.getAllByRole('dataRow')

    expect(name2).toBeInTheDocument()
    expect(name3).not.toBeInTheDocument()
    expect(allDataRows2.length).toBe(1)
  })

  it('should filter and reset after clearing name and salary', () => {
    const { nameAla: name2, nameJan: name1 } = setUpRenderWithTwoNames()

    const inputName = screen.getByTestId('name/Input/testid')

    act(() => {
      userEvent.type(inputName, 'al')
    })

    const inputSalary = screen.getByTestId('salary/Input/testid')

    act(() => {
      userEvent.type(inputSalary, '3')
    })

    act(() => {
      inputSalary.setSelectionRange(0, 1)
      userEvent.type(inputSalary, '{backspace}')
    })

    const allDataRows = screen.getAllByRole('dataRow')

    const name3 = screen.getByText('Alex')

    expect(name1).not.toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(name3).toBeInTheDocument()
    expect(allDataRows.length).toBe(2)

    act(() => {
      inputName.setSelectionRange(0, 2)
      userEvent.type(inputName, '{backspace}')
    })

    const allDataRows2 = screen.getAllByRole('dataRow')

    const name4 = screen.getByText('Jan')

    expect(name2).toBeInTheDocument()
    expect(name4).toBeInTheDocument()
    expect(allDataRows2.length).toBe(5)
  })
})

describe('TableSdk filtering/sorting together', () => {
  it('sorting and next filtering', () => {
    const { nameAla: name1, nameJan: name2 } = setUpRenderWithTwoNames()

    const nameTableData = screen.getAllByRole('name/TableData')

    expect(nameTableData[0] !== name1).toBeTruthy()
    expect(nameTableData[0] === name2).toBeTruthy()
    expect(nameTableData.length).toBe(5)

    act(() => {
      const sortByName = screen.getByText('Name')
      userEvent.click(sortByName)
    })

    const nameTableData2 = screen.getAllByRole('name/TableData')

    expect(nameTableData2[0] === name1).toBeTruthy()
    expect(nameTableData2[0] !== name2).toBeTruthy()

    const inputName = screen.getByTestId('name/Input/testid')

    act(() => {
      userEvent.type(inputName, 'al')
    })

    const name3 = screen.getByText('Alex')

    const nameTableData3 = screen.getAllByRole('name/TableData')

    expect(nameTableData3[0] === name1).toBeTruthy()
    expect(nameTableData3[1] === name3).toBeTruthy()
    expect(nameTableData3[2]).toBeUndefined()
  })

  it('filtering and next sorting', () => {
    const { nameAla: name2, nameJan: name1 } = setUpRenderWithTwoNames()

    const nameTableData = screen.getAllByRole('name/TableData')

    expect(name1).toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(nameTableData.length).toBe(5)

    const inputName = screen.getByTestId('name/Input/testid')

    act(() => {
      userEvent.type(inputName, 'al')
    })

    const nameTableData2 = screen.getAllByRole('name/TableData')
    const name3 = screen.getByText('Alex')

    expect(name1).not.toBeInTheDocument()
    expect(nameTableData2[0] === name2).toBeTruthy()
    expect(nameTableData2[1] === name3).toBeTruthy()
    expect(nameTableData2[2]).toBeUndefined()
    expect(nameTableData2.length).toBe(2)

    const sortByName = screen.getByText('Name')

    act(() => {
      userEvent.click(sortByName)
    })

    act(() => {
      userEvent.click(sortByName)
    })

    const nameTableData3 = screen.getAllByRole('name/TableData')

    expect(nameTableData3[0] === name3).toBeTruthy()
    expect(nameTableData3[1] === name2).toBeTruthy()
    expect(nameTableData3[2]).toBeUndefined()
    expect(nameTableData3.length).toBe(2)
  })
})

describe('TableSdk pagination', () => {
  it('should show pagination pages', () => {
    setUpRender()

    const allPaginationPages = screen.getAllByTestId(/pageNumber/i)
    const endDots = screen.getByTestId(/endDots/i)

    expect(allPaginationPages.length).toBe(5)
    expect(endDots).toBeInTheDocument()
  })

  it('should show pagination end dots', () => {
    setUpRender()

    const endDots = screen.getByTestId(/endDots/i)

    expect(endDots).toBeInTheDocument()

    const forthPage = screen.getByTestId('4/pageNumber/test/false')
    act(() => {
      userEvent.click(forthPage)
    })

    const startDots = screen.getByTestId(/startDots/i)

    expect(startDots).toBeInTheDocument()
    expect(endDots).toBeInTheDocument()

    const lastPage = screen.getByTestId('10/pageNumber/test/false')
    act(() => {
      userEvent.click(lastPage)
    })

    expect(startDots).toBeInTheDocument()
    expect(endDots).not.toBeInTheDocument()
  })

  it('changing page and then showing next page\'s content', () => {
    setUpRender()

    const name1 = screen.getByText('Jan')

    expect(name1).toBeInTheDocument()

    const secondPage = screen.getByTestId('2/pageNumber/test/false')
    act(() => {
      userEvent.click(secondPage)
    })

    const name2 = screen.getByText('Ala')

    expect(name1).not.toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(screen.getByTestId('2/pageNumber/test/true')).toBeInTheDocument()
  })

  it('filter changes page to 1', () => {
    setUpRender()

    const secondPage = screen.getByTestId('2/pageNumber/test/false')
    act(() => {
      userEvent.click(secondPage)
    })

    const name2 = screen.getByText('Ala')
    expect(name2).toBeInTheDocument()

    const inputName = screen.getByTestId('name/Input/testid')
    act(() => {
      userEvent.type(inputName, 'j')
    })

    const firstPage = screen.getByTestId('1/pageNumber/test/true')

    expect(firstPage).toBeInTheDocument()
    expect(screen.queryByTestId('2/pageNumber/test/true')).toBeNull()
    expect(screen.queryByTestId('2/pageNumber/test/false')).toBeNull()
  })
})

describe('TableSdk buttonsChangingPages', () => {
  it('should not let click prev btn when you are on first side', () => {
    setUpRender()

    const name1 = screen.getByText('Jan')
    const pageInfo = screen.getByText('1/10')
    expect(name1).toBeInTheDocument()
    expect(pageInfo).toBeInTheDocument()

    const prevBtn = screen.getByTestId('prevButton/ButtonsChangingPages')
    act(() => {
      userEvent.click(prevBtn)
    })

    expect(name1).toBeInTheDocument()
    expect(pageInfo).toBeInTheDocument()
  })

  it('should not let click next btn when you are on last side', () => {
    setUpRender()

    const lastPage = screen.getByTestId('10/pageNumber/test/false')
    act(() => {
      userEvent.click(lastPage)
    })

    const name1 = screen.getByText('Ula')
    const pageInfo = screen.getByText('10/10')
    expect(name1).toBeInTheDocument()
    expect(pageInfo).toBeInTheDocument()

    const nextBtn = screen.getByTestId('nextButton/ButtonsChangingPages')
    act(() => {
      userEvent.click(nextBtn)
    })

    expect(name1).toBeInTheDocument()
    expect(pageInfo).toBeInTheDocument()
  })

  it('should change side when clicking next btn', () => {
    setUpRender()

    const name1 = screen.getByText('Jan')

    expect(name1).toBeInTheDocument()

    const nextBtn = screen.getByTestId('nextButton/ButtonsChangingPages')
    act(() => {
      userEvent.click(nextBtn)
    })

    const name2 = screen.getByText('Ala')
    const pageInfo = screen.getByText('2/10')
    const activePageTwo = screen.getByTestId(/true/i)
    expect(name1).not.toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(pageInfo).toBeInTheDocument()
    expect(activePageTwo).toBeInTheDocument()
  })

  it('should change side when clicking prev btn', () => {
    setUpRender()

    const lastPage = screen.getByTestId('10/pageNumber/test/false')
    act(() => {
      userEvent.click(lastPage)
    })

    const name1 = screen.getByText('Ula')
    expect(name1).toBeInTheDocument()

    const prevBtn = screen.getByTestId('prevButton/ButtonsChangingPages')
    act(() => {
      userEvent.click(prevBtn)
    })

    const name2 = screen.getByText('Alex')
    const pageInfo = screen.getByText('9/10')
    const activePageNine = screen.getByTestId(/true/i)
    expect(name1).not.toBeInTheDocument()
    expect(name2).toBeInTheDocument()
    expect(pageInfo).toBeInTheDocument()
    expect(activePageNine).toBeInTheDocument()
  })
})
