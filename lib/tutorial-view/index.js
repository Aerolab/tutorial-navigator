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
var scrollTo = require('scroll-to');
var offset = require('offset');

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
  scrollTo(window.pageXOffset, offset(next[0]).top);
}

TutorialView.prototype.setApptype = function(apptype) {
  this.reactive.set('apptype', apptype);
  // XXX: Hack to make it work till fix on component/reactive
  this.reactive.emit('change nativeSelected');
  this.reactive.emit('change spaSelected');
  this.reactive.emit('change webSelected');
};

TutorialView.prototype.nativeplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  dom('.selected', closest(el, '.step'))
    .removeClass('selected');
  dom(el).addClass('selected');
  this.setNativePlatform(el.getAttribute('data-url'));
  var next = dom('.code-snippets', this.reactive.el);
  scrollTo(window.pageXOffset, offset(next[0]).top);
}

TutorialView.prototype.setNativePlatform = function(url) {
  this.reactive.set('nativePlatform', url);
  this.reactive.set('showCode', true);
  this.reactive.emit('change nativeSelected');
}

TutorialView.prototype.clientplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  dom('.selected', closest(el, '.step'))
    .removeClass('selected');
  dom(el).addClass('selected');
  this.setClientPlatform(el.getAttribute('data-url'));
  var next = dom('.select-platform-api', this.reactive.el);
  scrollTo(window.pageXOffset, offset(next[0]).top);
}

TutorialView.prototype.setClientPlatform = function(url) {
  this.reactive.set('clientPlatform', url);
}

TutorialView.prototype.serverapiselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  dom('.selected', closest(el, '.step'))
    .removeClass('selected');
  dom(el).addClass('selected');
  this.setApiPlatform(el.getAttribute('data-url'));
  var next = dom('.code-snippets', this.reactive.el);
  scrollTo(window.pageXOffset, offset(next[0]).top);
}

TutorialView.prototype.setApiPlatform = function(url) {
  this.reactive.set('serverApi', url);
  this.reactive.set('showCode', true);
  this.reactive.emit('change spaSelected');
}

TutorialView.prototype.serverplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  dom('.selected', closest(el, '.step'))
    .removeClass('selected');
  dom(el).addClass('selected');
  this.setServerPlatform(el.getAttribute('data-url'));
  var next = dom('.code-snippets', this.reactive.el);
  scrollTo(window.pageXOffset, offset(next[0]).top);
}

TutorialView.prototype.setServerPlatform = function(url) {
  this.reactive.set('serverPlatform', url);
  this.reactive.set('showCode', true);
  this.reactive.emit('change webSelected');
}


TutorialView.prototype.clear = function() {
  dom('.selected', this.reactive.el)
    .removeClass('selected');
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

TutorialView.prototype.nativeSelected = function (asd) {
  return 'native-mobile' === this.model.apptype;
};

TutorialView.prototype.webSelected = function() {
  return 'web' === this.model.apptype;
}

TutorialView.prototype.spaSelected= function() {
  return 'spa-api' === this.model.apptype;
}