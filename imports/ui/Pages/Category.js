import React, { Component } from "react";
import CategoryInput from "./CategoryInput";

export default class Category extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>{this.props.category.name}</h3>
        <ul>
          {this.props.category.values.map(value => (
            <li key={value}>{value}</li>
          ))}
          <li>
            <CategoryInput
              dataCategoryName={this.props.category.name}
              label="Dodaj enum"
              newValueChange={this.props.newValueChange}
              value={this.props.category.newValue}
            />
            <button>Dodaj</button>
          </li>
        </ul>
      </div>
    );
  }
}
