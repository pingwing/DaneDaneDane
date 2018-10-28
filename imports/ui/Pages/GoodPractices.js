import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

const categories = [
  {
    name: "Agencja ratingowa",
    values: ["Fitch", "Moody's", "S&P"],
  },
  { name: "Waluta", values: ["Waluta zagraniczna", "Waluta krajowa"] },
  { name: "Rodzaj terminu", values: ["Długoterminowa", "Krótkoterminowa"] },
  {
    name: "Rok",
    values: [
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
      "2009",
      "2008",
      "2007",
      "2006",
      "2005",
      "2004",
      "2003",
      "2002",
      "2001",
      "2000",
      "1999",
      "1998",
      "1997",
      "1996",
      "1995"
    ]
  }
];

const valuesTypes = [{ name: "Rating", dataType: "Tekst" }];

const compareCategoriesByNoOfElements = (cat1, cat2) => {
  if (cat1.values.length < cat2.values.length) {
    return -1;
  }
  if (cat1.values.length > cat2.values.length) {
    return 1;
  }
  return 0;
};

export default class GoodPractices extends Component {
  getXls = () => {
    const categories = this.prepareCategoriesForTable();

    console.log("PINGWING: 51 dataStructure", categories);

    Meteor.call("getXls", {categories, valuesTypes}, (err, resp) => {
      if (err) {
        console.log("PINGWING: 8 err", err);
      } else {
        downloadPdf(resp, "test.xlsx");
      }
    });
  };

  prepareCategoriesForTable = () => {
    const copyOfCategories = [...categories];
    copyOfCategories.sort(compareCategoriesByNoOfElements);

    const categoryInRows = copyOfCategories.pop();
    const categoriesInCols = [...copyOfCategories].reverse();

    return { categoryInRows, categoriesInCols };
  };

  render() {
    return (
      <div>
        <h1>Dobre praktyki</h1>

        <button onClick={this.getXls}>Pobierz XLS</button>
        <button onClick={this.prepareCategoriesForTable}>Test</button>
      </div>
    );
  }
}

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
