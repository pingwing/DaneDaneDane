import React, { Component } from "react";

export default class Download extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Pobierz plik</h2>
        <button onClick={this.props.download}>pobierz</button>
      </div>
    );
  }
}
