import React, { Component } from "react";

export default class CategoryInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <input
        label="Dodaj enum"
        onChange={event => {
          this.props.newValueChange(this.props.dataCategoryName, event);
        }}
        value={this.props.value}
      />
    );
  }
}
