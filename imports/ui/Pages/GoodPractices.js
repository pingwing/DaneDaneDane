import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

export default class GoodPractices extends Component {
  getXls = () => {
    Meteor.call('generateXls', (err, resp) => {
      if (err) {
        console.log('PINGWING: 8 err', err);
        console.log('PINGWING: 8 ERROR');
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

export const downloadPdf = (printMaterials, fileName) => {
  const hrefData = URL.createObjectURL(createBlobFromPrintMaterials(printMaterials))
  const link = document.createElement('a')
  link.download = fileName
  link.href = hrefData
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function createBlobFromPrintMaterials (printMaterials) {
  const byteCharacters = atob(printMaterials)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: ' application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
}
