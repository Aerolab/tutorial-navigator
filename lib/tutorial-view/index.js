/**
 * Module dependencies.
 */

var dom = require('dom');
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
    serverapps: serverapps
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
  dom(el).addClass('selected');
  var next = dom('.step.visible', this.reactive.el);
}

TutorialView.prototype.setApptype = function(apptype) {
  this.reactive.set('apptype', apptype);
};

TutorialView.prototype.nativeplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setNativePlatform(el.getAttribute('data-url'));
  var next = dom('.code-snippets', this.reactive.el);
}

TutorialView.prototype.setNativePlatform = function(url) {
  this.reactive.set('nativePlatform', url);
  this.reactive.set('showCode', true);
}

TutorialView.prototype.clientplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setClientPlatform(el.getAttribute('data-url'));
  var next = dom('.select-platform-api', this.reactive.el);
}

TutorialView.prototype.setClientPlatform = function(url) {
  this.reactive.set('clientPlatform', url);
}

TutorialView.prototype.serverapiselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setApiPlatform(el.getAttribute('data-url'));
  var next = dom('.code-snippets', this.reactive.el);
}

TutorialView.prototype.setApiPlatform = function(url) {
  this.reactive.set('serverApi', url);
  this.reactive.set('showCode', true);
}

TutorialView.prototype.serverplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setServerPlatform(el.getAttribute('data-url'));
  var next = dom('.code-snippets', this.reactive.el);
}

TutorialView.prototype.setServerPlatform = function(url) {
  this.reactive.set('serverPlatform', url);
  this.reactive.set('showCode', true);
}


TutorialView.prototype.clear = function() {
  dom('.snippet', this.reactive.el)
    .empty();
  this.reactive.set('apptype', '');
  this.reactive.set('nativePlatform', '');
  this.reactive.set('clientPlatform', '');
  this.reactive.set('serverApi', '');
  this.reactive.set('serverPlatform', '');
  this.reactive.set('showCode', false);
};

TutorialView.prototype.render = function() {
  return this.reactive.el;
}