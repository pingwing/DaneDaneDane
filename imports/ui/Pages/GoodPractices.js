import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { downloadPdf } from "/imports/utils";
import { prepareCategoriesForTable } from "/imports/utils";

const categories = [
  {
    name: "Agencja ratingowa",
    values: ["Fitch", "Moody's", "S&P"]
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

export default class GoodPractices extends Component {
  getXls = () => {
    const categoriesToUse = prepareCategoriesForTable(categories);

    console.log("PINGWING: 51 dataStructure", categories);

    Meteor.call("getXls", { categories: categoriesToUse, valuesTypes }, (err, resp) => {
      if (err) {
        console.log("PINGWING: 8 err", err);
      } else {
        downloadPdf(resp, "test.xlsx");
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Dobre praktyki</h1>

        <button onClick={this.getXls}>Pobierz XLS</button>
        <button onClick={prepareCategoriesForTable}>Test</button>
      </div>
    );
  }
}
