import Excel from "exceljs";
import Stream from "stream";

const getCellPos = (startRow, row, col) => {
  return true;
};

const toColumnName = num => {
  for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
  }
  return ret;
};

const toCellAddress = ({ row, col }) => {
  return `${toColumnName(col + 1)}${row + 1}`;
};

const multiplyAllElements = arr => arr.reduce((a, b) => a * b);

const generateWorkbook = dataStructure => {
  const { categories, valuesTypes } = dataStructure;
  const { categoryInRows, categoriesInCols } = categories;

  const noOfHeaderRows = categoriesInCols.length + 1;

  const workbook = new Excel.Workbook();

  const lockHeadersRows = {
    views: [{ state: "frozen", xSplit: 1, ySplit: noOfHeaderRows }]
  };
  const dataWS = workbook.addWorksheet("Dane", lockHeadersRows);

  const noOfColumnsInCategories = categoriesInCols.map(
    category => category.values.length
  );

  const copyOfNoOfColumnsInCategories = [...noOfColumnsInCategories];
  const reversedCopyOfNoOfColumnsInCategories = [
    ...noOfColumnsInCategories
  ].reverse();
  const colsDesc = [];
  const numberOfAllCols = multiplyAllElements(copyOfNoOfColumnsInCategories);
  let level = 0;
  [...categoriesInCols].reverse().forEach(row => {
    const mergeColsNo =
      numberOfAllCols /
      multiplyAllElements(reversedCopyOfNoOfColumnsInCategories);
    let headerValues = [];
    const multiplyBy = numberOfAllCols / (mergeColsNo * row.values.length);
    for (let i = 0; i < multiplyBy; i += 1) {
      headerValues = [...headerValues, ...row.values];
    }
    reversedCopyOfNoOfColumnsInCategories.shift();

    colsDesc.push({ headerValues, mergeColsNo });
    level += 1;
  });
  colsDesc.reverse();

  const dataCategories = categoriesInCols.map(category => category.name);
  dataCategories.push(categoryInRows.name);

  const startRow = 0;
  let currentRow = startRow;
  const startCol = 1;
  let currentCol = 0;
  let currentHeaderLevel = 0;
  // write data categories

  dataCategories.forEach(categoryName => {
    const cellAddrToFill = toCellAddress({ row: currentRow, col: currentCol });
    dataWS.getCell(cellAddrToFill).value = categoryName;
    currentRow += 1;
  });

  // generate headers
  currentRow = startRow;
  currentCol = startCol;
  currentHeaderLevel = 0;

  colsDesc.forEach(row => {
    const noOfColumnsToMerge = row.mergeColsNo;
    row.headerValues.forEach(value => {
      const leftCell = toCellAddress({ row: currentRow, col: currentCol });
      if (noOfColumnsToMerge - 1 > 0) {
        const rightCell = toCellAddress({
          row: currentRow,
          col: currentCol + noOfColumnsToMerge - 1
        });
        dataWS.mergeCells(`${leftCell}:${rightCell}`);
      }

      dataWS.getCell(leftCell).value = value;
      currentCol += noOfColumnsToMerge;
    });
    currentRow += 1;
    currentHeaderLevel = 1;
    currentCol = startCol;
  });

  // generate header for data types
  const valueTypeLabel = valuesTypes[0].dataType;
  for (let i = 0; i < numberOfAllCols; i += 1) {
    const cellAddrToFill = toCellAddress({ row: currentRow, col: currentCol });
    dataWS.getCell(cellAddrToFill).value = valueTypeLabel;
    currentCol += 1;
  }
  currentRow += 1;
  currentCol = startCol;

  // generate rows
  currentCol = 0;
  categoryInRows.values.forEach(value => {
    const cellAddrToFill = toCellAddress({ row: currentRow, col: currentCol });
    dataWS.getCell(cellAddrToFill).value = value;
    currentRow += 1;
  });

  return workbook;
};

export const getXls = async dataStructure => {
  const workbook = generateWorkbook(dataStructure);

  const stream = new Stream.PassThrough();
  await workbook.xlsx.write(stream);

  const base64 = stream.read().toString("base64");

  return base64;
};
