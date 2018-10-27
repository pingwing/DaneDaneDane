import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

export default class GoodPractices extends Component {
  getXls = () => {
    Meteor.call('getXls', {dataStructure}, (err, resp) => {
      if (err) {
        console.log('PINGWING: 8 err', err);
      } else {
        downloadPdf(resp, 'test.xlsx')
      }
    })
  }

  render () {
    return <div>
      <h1>Dobre praktyki</h1>

      <button onClick={this.getXls}>Pobierz XLS</button>
    </div>
  }
}

export const downloadPdf = (dataStream, fileName) => {
  const hrefData = URL.createObjectURL(createBlobFromData(dataStream))
  const link = document.createElement('a')
  link.download = fileName
  link.href = hrefData
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function createBlobFromData (dataStream) {
  const byteCharacters = atob(dataStream)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: ' application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
}
