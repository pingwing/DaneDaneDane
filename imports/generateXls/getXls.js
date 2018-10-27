import Excel from 'exceljs'
import Stream from 'stream'

const getCellPos = (startRow, row, col) => {
  return true
}

const toColumnName = (num) => {
  for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret
  }
  return ret
}

const generateWorkbook = (categories) => {
  const workbook = new Excel.Workbook()

  const dataWS = workbook.addWorksheet('Dane')

  let numberOfHeaderRows = 1

  const startRow = numberOfHeaderRows + 1

  const lastLevelHeaders = ['osobowe', 'ciężarowe']

  // generate headers
  // let currentRow = 0
  // let currentCol = 0
  // lastLevelHeaders.forEach(header => {
  //   const cellPos = getCellPos(startRow, currentRow, currentCol)
  //   dataWS.getCell(cellPos).value = header
  //   currentCol += 1
  // })

  dataWS.addRow(lastLevelHeaders)

  //generate rows categories
  // let currentRow = 0
  // let currentCol = 0
  // lastLevelHeaders.forEach(header => {
  //   const cellPos = getCellPos(startRow, currentRow, currentCol)
  //   dataWS.getCell(cellPos).value = header
  //   currentCol += 1
  // })

  return workbook
}

export const getXls = async () => {
  const workbook = generateWorkbook([])

  const stream = new Stream.PassThrough()
  await workbook.xlsx.write(stream)

  const base64 = stream.read().toString('base64')

  return base64
}
