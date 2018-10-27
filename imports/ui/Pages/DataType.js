import React, { Component } from "react";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export default class DataType extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div>
          <h2>Nazwij zbiór danych i wybierz rodzaj</h2>
          <p>
            Aby prawidłowo rozpocząć pracę nad szablonem wybierz rodzaj danych.
          </p>
        </div>
        <div>
          <RadioGroup
            value={this.props.value}
            onChange={this.props.setCategory}
          >
            <FormControlLabel
              value="dataSeries"
              control={<Radio />}
              label="Seria czasowa"
            />
            <FormControlLabel
              value="list"
              control={<Radio />}
              label="Ewidencja"
            />
          </RadioGroup>
        </div>
      </>
    );
  }
}
