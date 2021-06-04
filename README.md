![screen of app](/assets/img/tableSDK.png)

# TableSDKWithTesting

The project presents an SDK enabling convenient creation of data in tabular form.

**Main features**:

- Utilizing React Testing Library for testing
- Utilizing localStorage for simulating the fetching of tabular data
- Implementing filtering for individual columns
- Enabling sorting for individual columns
- Implementing pagination

&nbsp;

## ⚙️ Technologies

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

&nbsp;

## ✈️ Application Tour

- Pagination, sorting and filtering:

![](/assets/gif/TableSDKPresentation.gif)

&nbsp;

## 💿 Installation

1. Clone the repository:

```
git clone [repository_url]
```

2. Navigate to the project directory:

```
cd [YOUR-REPO-NAME]
```

3. The project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Having them installed, type into the terminal:

```
npm i
```

4. Install globally JSON Server:

```
npm install -g json-server
```

5. In first terminal start JSON server using command:

```
npm run json
```

6. In second terminal start application using command:

```
npm start
```

7. If you want to start tests, type the following command in the third terminal:

```
npm run test
```

then press 'a' and enter

&nbsp;

## 💡 Solutions Provided In The Project

- Simple way to create new table:

```
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
```

- Function sorting data:

```
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
```

- Function filtering data:

```
  const filterFn = React.useCallback((newFilterParams) => {
    const newFilteredData = data.filter((oneRow) => {
      const conditions = Object.entries(newFilterParams).map((param) => {
        const [key, value] = param
        return oneRow[key].toLowerCase().startsWith(value.toLowerCase())
      })

      return conditions.every((condition) => condition)
    })

    setModeratedData(newFilteredData)
  }, [data, setModeratedData])
```

&nbsp;

## ⏳ Future Ideas To Develop

- Changing amount of data at one page

&nbsp;

## 🙋‍♂️ Feel free to contact me

Thank you for investing your time. I hope you enjoyed exploring my project and have a pleasant experience testing it. For any inquiries, feel free to reach out to me via email at sebastian.pawel.wapinski@gmail.com.

&nbsp;

## 👏 Thanks

I am truly grateful for the guidance and support provided by my mentors. A heartfelt thank you to each of them for their invaluable contributions.

#### [Akademia Samouka](https://akademiasamouka.pl/) - Mateusz Bogolubow i Mateusz Choma

#### Mateusz Choma - [coderoad](https://coderoad.pl/)

#### Mateusz Bogolubow - [devmentor](https://devmentor.pl/)
