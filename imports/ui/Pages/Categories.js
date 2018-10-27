import React, { Component } from "react";
import Category from "./Category";

// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
// import TextField from "@material-ui/core/TextField";

export default class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: {
        name: "",
        values: []
      }
    };
  }
  render() {
    console.log(this.props.categories);
    return (
      <>
        <div>
          <h2>Określ kategorie</h2>
        </div>
        <div>
          {this.props.categories.map(category => (
            <Category category={category} />
          ))}
        </div>
        <input
          label="Nowa kategoria"
          onChange={onChange}
          value={state.newCategory.name}
        />
        <button onClick={props.onAdd}>Dodaj nową kategorię</button>
      </>
    );
  }
}

onChange = event => {
  this.setState({
    newCategory: {
      name: event.target.value,
      values: []
    }
  });
};
