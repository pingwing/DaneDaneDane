export const downloadPdf = (dataStream, fileName) => {
  const hrefData = URL.createObjectURL(createBlobFromData(dataStream));
  const link = document.createElement("a");
  link.download = fileName;
  link.href = hrefData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function createBlobFromData(dataStream) {
  const byteCharacters = atob(dataStream);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], {
    type: " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
}

export const compareCategoriesByNoOfElements = (cat1, cat2) => {
  if (cat1.values.length < cat2.values.length) {
    return -1;
  }
  if (cat1.values.length > cat2.values.length) {
    return 1;
  }
  return 0;
};

export const prepareCategoriesForTable = categories => {
  const copyOfCategories = [...categories];
  copyOfCategories.sort(compareCategoriesByNoOfElements);

  const categoryInRows = copyOfCategories.pop();
  const categoriesInCols = [...copyOfCategories].reverse();

  return { categoryInRows, categoriesInCols };
};
