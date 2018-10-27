import React, { Component } from "react";
import { Page } from "../Layout/Page";
import DataType from "./DataType";
import Levels from "./Levels";

import StepZilla from "react-stepzilla";
import "./StepZilla.css";
import "react-sortable-tree/style.css";

export default class Creator extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      category: "",
      dataType: "",
      levelsNumber: undefined
    };
  }

  render() {
    const steps = [
      {
        name: "Nazwa i rodzaj",
        component: (
          <DataType
            value={this.state.category}
            setCategory={this.onSetCategory}
          />
        )
      },
      { name: "Poziomy", component: <Levels /> },
      { name: "Values", component: <DataType /> },
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

  onSetCategory = event => {
    this.setState({
      ...this.state,
      category: event.target.value
    });
  };
}
