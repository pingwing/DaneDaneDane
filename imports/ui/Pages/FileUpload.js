import React, { Component } from "react";
import Dropzone from "react-dropzone";

import { Meteor } from "meteor/meteor";

export default class FileUpload extends Component {
  render() {
    return (
      <div>
        <Dropzone
          ref={el => (this.dropzone = el)}
          onDropAccepted={this.onDropAccepted}
          multiple={false}
        />
        <button onClick={this.onButtonClick}>Załącz plik</button>
      </div>
    );
  }

  onDropAccepted = files => {
    console.log(files);
  };

  onButtonClick = () => {
    this.dropzone.open();
  };
}
