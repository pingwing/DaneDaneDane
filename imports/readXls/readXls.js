import Excel from 'exceljs'
import { Readable } from 'readable-stream'

export const readXls = async data => {
  const xlsData = new Buffer(data)
  const stream = new Readable()

  stream.push(xlsData)
  stream.push(null)

  const workbook = new Excel.Workbook()

  await workbook.xlsx.read(stream)

  const headerRows = []
  const valuesRows = []

  const dataErrors = []

  const firstSheet = workbook.getWorksheet(1)
  firstSheet.eachRow(function (row, rowNumber) {
    console.log('PINGWING: 19 row.values', row.values);

    if (rowNumber < 10 && typeof row.values[0] === 'undefined' && typeof row.values[1] === 'undefined') {
      const categoryValues = row.values.splice(2)
      headerRows.push(categoryValues)
    } else {
      console.log('PINGWING: 26 row.values', row.values);
      const rowCategoryValue = row.values[1]
      const rowValues = row.values.splice(2)
      console.log('PINGWING: 29 rowValues', rowValues);
      valuesRows.push({rowCategoryValue, rowValues})
    }

  })

  const dataTable =

  console.log('PINGWING: 31 valuesRows', valuesRows);
  console.log('PINGWING: 25 headerRows', headerRows);
}
