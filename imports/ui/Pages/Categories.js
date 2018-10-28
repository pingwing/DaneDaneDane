import React, { Component } from "react";
import Category from "./Category";

// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
// import TextField from "@material-ui/core/TextField";

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
          {this.props.categories.map(category => (
            <Category
              category={category}
              newValueChange={this.props.categoryNewValueChange}
            />
          ))}
        </div>
      </>
    );
  }
}
