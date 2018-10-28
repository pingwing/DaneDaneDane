import React, { Component } from "react";
import { Page } from "../Layout/Page";
import DataType from "./DataType";
import Value from "./Value";
import Categories from "./Categories";

import StepZilla from "react-stepzilla";
import "./StepZilla.css";
import "react-sortable-tree/style.css";

// const categories = [{ name: "", values: [] }];

// const values = [{ name: "", dataType: "" }];

export default class Creator extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      newCategoryName: "",
      categories: [
        {
          name: "Płeć",
          values: ["Mężczyzna", "Kobieta"],
          newValue: ""
        }
      ],
      value: {
        type: "",
        value: ""
      },
      dataType: "",
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
          />
        )
      },
      { name: "Podgląd", component: <DataType /> },
      { name: "Typ podkategorii", component: <DataType /> },
      { name: "Pobierz plik", component: <DataType /> }
    ];

    return (
      <Page>
        <div className="step-progress">
          <StepZilla steps={steps} />
        </div>
      </Page>
    );
  }

  onCategoryNewValueChange = (categoryName, event) => {
    console.log(categoryName);
    console.log(event);
    // this.setState({
    //   ...this.state,
    //   categories: this.state.categories.
    // })
  };

  onNewCategoryAdd = () => {
    this.setState({
      ...this.state,
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
      ...this.state,
      newCategoryName: event.target.value
    });
  };

  onSetValueType = event => {
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        type: event.target.value
      }
    });
  };

  onSetValueName = event => {
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        name: event.target.value
      }
    });
  };
}
