/**
 * Module dependencies.
 */

var dom = require('dom');
var _ = require('to-function');
var closest = require('closest');
var merge = require('merge-util');
var reactive = require('reactive');
var bindings = require('./bindings');
var template = require('./tutorial.html');
var apptypes = require('apptypes');
var nativeapps = require('native-platforms');
var clientapps = require('client-platforms');
var serverapis = require('server-apis');
var serverapps = require('server-platforms');

module.exports = TutorialView;

function TutorialView(tutorial) {
  this.model = merge({
    stepOne: '',
    stepTwo: '',
    stepThree: '',
    apptype: '',
    nativePlatform: '',
    clientPlatform: '',
    serverApi: '',
    serverPlatform: '',
    apptypes: apptypes,
    nativeapps: nativeapps,
    clientapps: clientapps,
    serverapis: serverapis,
    serverapps: serverapps,
    hybridapps: nativeapps.filter(_('hybrid')),
    codevisible: false,
    clientvisible: false,
    serverapivisible: false
  }, tutorial || {}, true);

  this.reactive = reactive(template, this.model, {
    delegate: this,
    bindings: bindings
  });
}

TutorialView.prototype.apptypeselect = function(ev) {
  var el = closest(ev.target, '[data-type]', true);
  if (!el) return;
  this.clear();
  this.setApptype(el.getAttribute('data-type'));
}

TutorialView.prototype.setApptype = function(apptype) {
  this.reactive.set('apptype', apptype);
};

TutorialView.prototype.nativeplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setNativePlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setNativePlatform = function(url) {
  this.reactive.set('nativePlatform', url);
  this.reactive.set('codevisible', true);
}

TutorialView.prototype.clientplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setClientPlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setClientPlatform = function(url) {
  this.reactive.set('clientPlatform', url);
}

TutorialView.prototype.serverapiselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setApiPlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setApiPlatform = function(url) {
  this.reactive.set('serverApi', url);
  this.reactive.set('codevisible', true);
  // start with the client configuration
  this.reactive.set('clientvisible', true);
}

TutorialView.prototype.serverplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setServerPlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setServerPlatform = function(url) {
  this.reactive.set('serverPlatform', url);
  this.reactive.set('codevisible', true);
}


TutorialView.prototype.clear = function() {
  this.reactive.set('apptype', '');
  this.clearTwo();
};

TutorialView.prototype.clearTwo = function(ev) {
  this.reactive.set('nativePlatform', '');
  this.reactive.set('clientPlatform', '');
  this.reactive.set('serverApi', '');
  this.reactive.set('serverPlatform', '');
  this.reactive.set('codevisible', false);
  this.reactive.set('clientvisible', false);
  this.reactive.set('serverapivisible', false);
};

TutorialView.prototype.noop = function() {
  // noop, take a coffee
};

TutorialView.prototype.showClient = function() {
  this.reactive.set('clientvisible', true);
  this.reactive.set('serverapivisible', false);
};

TutorialView.prototype.showServerApi = function() {
  this.reactive.set('clientvisible', false);
  this.reactive.set('serverapivisible', true);
};

TutorialView.prototype.render = function() {
  return this.reactive.el;
}