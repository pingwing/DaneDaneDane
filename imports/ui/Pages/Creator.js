import { Meteor } from "meteor/meteor"
import React, { Component } from "react";
import { Page } from "../Layout/Page";
import Preview from "./Preview";
import Download from "./Download";
import Value from "./Value";
import Categories from "./Categories";

import StepZilla from "react-stepzilla";
import "./StepZilla.css";
import "react-sortable-tree/style.css";

import { downloadPdf, prepareCategoriesForTable } from "/imports/utils";



export default class Creator extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      newCategoryName: "",
      categories: [],
      value: {
        dataType: "",
        name: ""
      },
      levelsNumber: undefined
    };
  }

  render() {
    const steps = [
      {
        name: "Wartości",
        component: (
          <Value
            value={this.state.value}
            setValueType={this.onSetValueType}
            setValueName={this.onSetValueName}
          />
        )
      },
      {
        name: "Kategorie",
        component: (
          <Categories
            categories={this.state.categories}
            newCategoryName={this.state.newCategoryName}
            changeNewCategory={this.onNewCategoryChange}
            addNewCategory={this.onNewCategoryAdd}
            categoryNewValueChange={this.onCategoryNewValueChange}
            categoryAddNewValue={this.onCategoryAddNewValue}
          />
        )
      },
      { name: "Podgląd", component: <Preview /> },
      {
        name: "Pobierz plik",
        component: <Download download={this.onDownload} />
      }
    ];

    return (
      <Page>
        <div className="step-progress">
          <StepZilla steps={steps} />
        </div>
      </Page>
    );
  }

  onDownload = () => {
    // console.log("Dane dla Przemka", this.serializeData());
    const {categories, valuesTypes} = this.serializeData()
    // console.log('PINGWING: 75 this.serializeData()', this.serializeData());

    const categoriesToUse = prepareCategoriesForTable(categories);

    // console.log('PINGWING: 79 categoriesToUse', categoriesToUse);

    // console.log("PINGWING: 51 dataStructure", categories);

    Meteor.call("getXls", {categories: categoriesToUse, valuesTypes}, (err, resp) => {
      if (err) {
        console.log("PINGWING: 8 err", err);
      } else {
        downloadPdf(resp, "test.xlsx");
      }
    });

  };

  serializeData = () => ({
    categories: this.state.categories,
    valuesTypes: [this.state.value]
  });

  onCategoryAddNewValue = categoryName => {
    this.setState({
      categories: this.state.categories.map(category => {
        if (category.name === categoryName) {
          return {
            ...category,
            values: [...category.values, category.newValue],
            newValue: ""
          };
        } else {
          return category;
        }
      })
    });
  };

  onCategoryNewValueChange = (categoryName, event) => {
    this.setState({
      categories: this.state.categories.map(category => {
        if (category.name === categoryName) {
          return {
            ...category,
            newValue: event.target.value
          };
        } else {
          return category;
        }
      })
    });
  };

  onNewCategoryAdd = () => {
    this.setState({
      categories: [
        ...this.state.categories,
        {
          name: this.state.newCategoryName,
          values: [],
          newValue: ""
        }
      ],
      newCategoryName: ""
    });
  };

  onNewCategoryChange = event => {
    this.setState({
      newCategoryName: event.target.value
    });
  };

  onSetValueType = event => {
    this.setState({
      value: {
        ...this.state.value,
        dataType: event.target.value
      }
    });
  };

  onSetValueName = event => {
    this.setState({
      value: {
        ...this.state.value,
        name: event.target.value
      }
    });
  };
}


