import Excel from "exceljs";
import { Readable } from "readable-stream";
import dataForge from "data-forge";

export const readXls = async data => {
  const xlsData = new Buffer(data);
  const stream = new Readable();

  stream.push(xlsData);
  stream.push(null);

  const workbook = new Excel.Workbook();

  await workbook.xlsx.read(stream);

  const headerRows = [];
  const valuesRows = [];

  const dataErrors = [];

  const dataCategories = [];

  const firstSheet = workbook.getWorksheet(1);

  const noOfHeaderRows = firstSheet.views[0].ySplit;
  console.log("PINGWING: 23 noOfHeaderRows", noOfHeaderRows);

  firstSheet.eachRow(function(row, rowNumber) {
    if (rowNumber <= noOfHeaderRows) {
      const dataCategory = row.values[1];
      dataCategories.push(dataCategory);
      const categoryValues = row.values.splice(2);
      headerRows.push(categoryValues);
    } else {
      const rowCategoryValue = row.values[1];
      const rowValues = row.values.splice(2);
      valuesRows.push({ rowCategoryValue, rowValues });
    }
  });

  const dataCategoryInRows = dataCategories.pop();

  const rows = [];

  valuesRows.forEach(row => {
    let rowHeaderIndex = 0;
    row.rowValues.forEach(dataValue => {
      const ouputDataRow = [];
      let dataCategoryIndex = 0;
      dataCategories.forEach(dataCategory => {
        const currentHeaderRow = headerRows[dataCategoryIndex];
        const currentHeaderValue = currentHeaderRow[rowHeaderIndex];
        ouputDataRow.push(currentHeaderValue);
        dataCategoryIndex += 1;
      });
      ouputDataRow.push(row.rowCategoryValue);
      ouputDataRow.push(dataValue);
      rows.push(ouputDataRow);
      rowHeaderIndex += 1;
    });
  });

  dataCategories.push(dataCategoryInRows);
  dataCategories.push("Value");

  const dataFrameData = {
    columnNames: dataCategories,
    rows
  };

  // const parsedData = new dataForge.DataFrame(dataFrameData);
  //
  // const csv = parsedData.toCSV();
  // console.log("PINGWING: 80 csv", csv);
  //
  // const json = parsedData.toJSON();
  // console.log("PINGWING: 80 json", json);

  return { dataFrameData };
};
