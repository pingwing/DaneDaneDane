import React, { Component } from "react";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

export default class DataType extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div>
          <h2>Określ wartość w tabeli</h2>
        </div>
        <div>
          <TextField
            id="outlined-name"
            label="Nazwa"
            value={this.props.value.name}
            onChange={this.props.setValueName}
            variant="outlined"
          />
          <RadioGroup
            value={this.props.value.dataType}
            onChange={this.props.setValueType}
          >
            <FormControlLabel
              value="number"
              control={<Radio />}
              label="Liczba"
            />
            <FormControlLabel
              value="string"
              control={<Radio />}
              label="Tekst"
            />
          </RadioGroup>
        </div>
      </>
    );
  }
}
