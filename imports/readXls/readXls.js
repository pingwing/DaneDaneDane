import Excel from 'exceljs'
import { Readable } from 'readable-stream'

export const readXls = async data => {
  const xlsData = new Buffer(data)
  const stream = new Readable()

  stream.push(xlsData)
  stream.push(null)

  const workbook = new Excel.Workbook()

  await workbook.xlsx.read(stream)

  const firstSheet = workbook.getWorksheet(1)
  firstSheet.eachRow(function (row, rowNumber) {
    console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
  })
}
