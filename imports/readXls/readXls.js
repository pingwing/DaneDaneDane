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
    if (rowNumber < 10 && typeof row.values[0] === 'undefined' && typeof row.values[1] === 'undefined') {
      const categoryValues = row.values.splice(2)
      headerRows.push(categoryValues)
    } else {
      const rowCategoryValue = row.values[1]
      const rowValues = row.values.splice(2)
      valuesRows.push({rowCategoryValue, rowValues})
    }

  })

  const dataTypes = headerRows.pop()



  console.log('PINGWING: 31 valuesRows', valuesRows);
  console.log('PINGWING: 25 headerRows', headerRows);
  console.log('PINGWING: 41 dataTypes', dataTypes);

  // var df = new dataForge.DataFrame({
  //   columnNames: ["Col1", "Col2", "Col3"],
  //   rows: [
  //     [1, 'hello', new Date(...)],
  //     [5, 'computer', new Date(...)],
  //     [10, 'good day', new Date(...)]
  //   ]
  // });
}
