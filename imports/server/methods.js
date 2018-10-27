import { Meteor } from 'meteor/meteor'
import { getXls } from '/imports/generateXls/getXls'

if (Meteor.isServer) {
  Meteor.methods({
    'generateXls': function () {
      return getXls()
    }
  })
}
