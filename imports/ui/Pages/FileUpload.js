import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Meteor } from 'meteor/meteor'

function uint8ToBase64 (buffer) {
  var binary = ''
  var len = buffer.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i])
  }
  return window.btoa(binary)
}

export default class FileUpload extends Component {
  render () {
    return (
      <div>
        <Dropzone
          ref={el => (this.dropzone = el)}
          onDropAccepted={this.onDropAccepted}
          multiple={false}
        />
        <button onClick={this.onButtonClick}>Załącz plik</button>
      </div>
    )
  }

  onDropAccepted = files => {
    const file = files[0]


    const reader = new FileReader()
    reader.onload = () => {
      var buffer = new Uint8Array(reader.result) // convert to binary
      Meteor.call('readXls', buffer)



    }
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')

    reader.readAsArrayBuffer(file)
  }

  onButtonClick = () => {
    this.dropzone.open()
  }
}

