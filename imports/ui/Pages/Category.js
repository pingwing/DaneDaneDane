import React, { Component } from "react";

export default class Category extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.category);
    return (
      <div>
        <h3>{this.props.category.name}</h3>
        <ul>
          {this.props.category.values.map(value => (
            <li>{value}</li>
          ))}
        </ul>
      </div>
    );
  }
}
