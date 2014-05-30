/**
 * Module dependencies.
 */

var dom = require('dom');
var _ = require('to-function');
var closest = require('closest');
var merge = require('merge-util');
var reactive = require('reactive');
var bindings = require('bindings');
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
    hybridPlatform: '',
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
    nativevisible: false,
    hybridvisible: false,
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
  this.showNative();
}

TutorialView.prototype.hybridplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setHybridPlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setHybridPlatform = function(url) {
  this.reactive.set('hybridPlatform', url);
  this.showHybrid();
}

TutorialView.prototype.clientplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setClientPlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setClientPlatform = function(url) {
  this.reactive.set('clientPlatform', url);
  this.showClient();
}

TutorialView.prototype.serverapiselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.setApiPlatform(el.getAttribute('data-url'));
}

TutorialView.prototype.setApiPlatform = function(url) {
  this.reactive.set('serverApi', url);
  this.showCode();
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
  this.reactive.set('hybridPlatform', '');
  this.reactive.set('clientPlatform', '');
  this.reactive.set('serverApi', '');
  this.reactive.set('serverPlatform', '');
  this.reactive.set('codevisible', false);
  this.resetTabs();
};

TutorialView.prototype.noop = function() {
  // noop, take a coffee
};

TutorialView.prototype.showCode = function() {
  this.reactive.set('codevisible', true);
};

TutorialView.prototype.showNative = function() {
  this.resetTabs();
  this.reactive.set('nativevisible', true);
};

TutorialView.prototype.showHybrid= function() {
  this.resetTabs();
  this.reactive.set('hybridvisible', true);
};

TutorialView.prototype.showClient = function() {
  this.resetTabs();
  this.reactive.set('clientvisible', true);
};

TutorialView.prototype.showServerApi = function() {
  this.resetTabs();
  this.reactive.set('serverapivisible', true);
};

TutorialView.prototype.resetTabs = function() {
  this.reactive.set('nativevisible', false);
  this.reactive.set('hybridvisible', false);
  this.reactive.set('clientvisible', false);
  this.reactive.set('serverapivisible', false);
};

TutorialView.prototype.apptypeTitle = function() {
  var apptypeQuery = 'name === "%"'.replace('%', this.reactive.get('apptype'));
  var apptypeFilter = _(apptypeQuery);
  var apptype = this.model.apptypes.filter(apptypeFilter);
  return apptype.length ? apptype[0].title : '';
};

TutorialView.prototype._platformTitle = function(type) {
  var platformQuery = 'url === "%"'.replace('%', this.reactive.get(type));
  var platformFilter = _(platformQuery);

  type = ~type.indexOf('Platform')
    ? type.slice(0, type.indexOf('Platform')) + 'app'
    : type;

  var platform = this.model[type.toLowerCase() + 's'].filter(platformFilter);
  return platform.length ? platform[0].title : '';
};

TutorialView.prototype.platformTitle = function() {
  if (this.model.nativePlatform) return this._platformTitle('nativePlatform');
  if (this.model.hybridPlatform) return this._platformTitle('hybridPlatform');
  if (this.model.clientPlatform) return this._platformTitle('clientPlatform');
  if (this.model.serverPlatform) return this._platformTitle('serverPlatform');
};

TutorialView.prototype.apiTitle = function() {
  return this._platformTitle('serverApi');
};

TutorialView.prototype.render = function(el) {
  if (!arguments.length) return this.el();

  if ('string' === typeof el) el = dom(el)[0];

  if (el !== this.el().parentNode) el.appendChild(this.el());

  return this;
}

TutorialView.prototype.el = function() {
  return this.reactive.el;
};