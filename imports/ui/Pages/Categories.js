import React, { Component } from "react";
import Category from "./Category";

export default class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <h2>Określ kategorie</h2>
        </div>
        <input
          label="Dodaj kategorię"
          value={this.props.newCategoryName}
          onChange={this.props.changeNewCategory}
        />
        <button onClick={this.props.addNewCategory}>
          Dodaj nową kategorię
        </button>
        <div>
          {this.props.categories.map(category => {
            return (
              <Category
                key={category.name}
                category={category}
                newValueChange={this.props.categoryNewValueChange}
              />
            );
          })}
        </div>
      </>
    );
  }
}
