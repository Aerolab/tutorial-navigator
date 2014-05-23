/**
 * Module dependencies.
 */

var TutorialView = require('tutorial-view');
var nativeapps = require('native-platforms');
var clientapps = require('client-platforms');
var serverapis = require('server-apis');
var serverapps = require('server-platforms');
var dom = require('dom');

var tutorial = {
  apptype: '',
  nativePlatform: '',
  clientPlatform: '',
  serverApi: '',
  serverPlatform: '',
  nativeapps: nativeapps,
  clientapps: clientapps,
  serverapis: serverapis,
  serverapps: serverapps
}

var view = new TutorialView(tutorial);

dom('section.content').append(view.render());
