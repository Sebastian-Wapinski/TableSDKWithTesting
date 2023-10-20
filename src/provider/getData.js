const url = 'http://localhost:3005'

export const getData = async (dataName) => {
  try {
    const rowData = await fetch(`${url}/${dataName}`)

    if (rowData.ok) {
      return await rowData.json()
    }

    throw new Error(`${rowData.statusText} / status: ${rowData.status}`)
  } catch (error) {
    error.message = `${error.message} - open json-server using terminal => type: npm run json`
    throw error
  }
}
