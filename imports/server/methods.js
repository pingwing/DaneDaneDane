import { Meteor } from 'meteor/meteor'
import { getXls } from '/imports/generateXls/getXls'
import { readXls } from '/imports/readXls/readXls'

if (Meteor.isServer) {
  Meteor.methods({
    'generateXls': () => getXls(),
    'readXls': data => readXls(data),
  })
}
