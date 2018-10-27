import React, { Component } from "react";
import { Page } from "../Layout/Page";
import DataType from "./DataType";
import Value from "./Value";

import StepZilla from "react-stepzilla";
import "./StepZilla.css";
import "react-sortable-tree/style.css";

// const categories = [{ name: "", values: [] }];

// const values = [{ name: "", dataType: "" }];

export default class Creator extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      categories: [],
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
      // { name: "Kategorie", component: <Categories /> },
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
