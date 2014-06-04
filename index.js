/**
 * Module dependencies.
 */

var dom = require('dom');
var _ = require('to-function');
var Emitter = require('emitter');
var closest = require('closest');
var reactive = require('reactive');
var bindings = require('bindings');
var template = require('./tutorial.html');
var Tutorial = require('tutorial-model');
var TutorialAdapter = require('tutorial-adapter');

module.exports = TutorialView;

function TutorialView(tutorial) {
  this.model = new Tutorial(tutorial || {});

  this.reactive = reactive(template, this.model, {
    adapter: TutorialAdapter,
    delegate: this,
    bindings: bindings
  });

  this.bindAll();
}

Emitter(TutorialView.prototype);

TutorialView.prototype.set = function(prop, val) {
  this.reactive.set(prop, val);
};

TutorialView.prototype.get = function(prop) {
  return this.reactive.get(prop);
};

TutorialView.prototype.bindAll = function() {
  var _self = this;
  this.reactive.on('change clientPlatform', function(value) {
    _self.set('clientvisible', !!value);
  });
  this.reactive.on('change nativePlatform', function(value) {
    _self.set('nativevisible', !!value);
  });
  this.reactive.on('change hybridPlatform', function(value) {
    _self.set('hybridvisible', !!value);
  });
  this.reactive.on('change serverPlatform', function(value) {
    _self.set('codevisible', !!value);
  });
  this.reactive.on('change serverApi', function(value) {
    _self.set('codevisible', !!value);
  });
  this.reactive.on('change apptype', function(value) {
    _self.clearTwo();
  });
};

TutorialView.prototype.apptypeselect = function(ev) {
  var el = closest(ev.target, '[data-type]', true);
  if (!el) return;
  this.clear();
  this.set('apptype', el.getAttribute('data-type'));
  this.emit('apptype', el.getAttribute('data-type'));
}

TutorialView.prototype.nativeplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.set('nativePlatform', el.getAttribute('data-url'));
  this.emit('nativePlatform', el.getAttribute('data-url'))
}

TutorialView.prototype.hybridplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.set('hybridPlatform', el.getAttribute('data-url'));
  this.emit('hybridPlatform', el.getAttribute('data-url'))
}

TutorialView.prototype.clientplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.set('clientPlatform', el.getAttribute('data-url'));
  this.emit('clientPlatform', el.getAttribute('data-url'))
}

TutorialView.prototype.serverapiselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.set('serverApi', el.getAttribute('data-url'));
  this.emit('serverApi', el.getAttribute('data-url'))
}

TutorialView.prototype.serverplatformselect = function(ev) {
  var el = closest(ev.target, '[data-url]', true);
  if (!el) return;
  this.set('serverPlatform', el.getAttribute('data-url'));
  this.emit('serverPlatform', el.getAttribute('data-url'))
}

TutorialView.prototype.clear = function() {
  this.set('apptype', '');
};

TutorialView.prototype.clearTwo = function(ev) {
  this.set('nativePlatform', '');
  this.set('hybridPlatform', '');
  this.set('clientPlatform', '');
  this.set('serverApi', '');
  this.set('serverPlatform', '');
  this.set('codevisible', false);
  this.resetTabs();
};

TutorialView.prototype.noop = function() {
  // noop, take a coffee
};

TutorialView.prototype.showCode = function() {
  this.set('codevisible', true);
};

TutorialView.prototype.showNative = function() {
  this.resetTabs();
  this.set('nativevisible', true);
};

TutorialView.prototype.showHybrid= function() {
  this.resetTabs();
  this.set('hybridvisible', true);
};

TutorialView.prototype.showClient = function() {
  this.resetTabs();
  this.set('clientvisible', true);
};

TutorialView.prototype.showServerApi = function() {
  this.resetTabs();
  this.set('serverapivisible', true);
};

TutorialView.prototype.resetTabs = function() {
  this.set('nativevisible', false);
  this.set('hybridvisible', false);
  this.set('clientvisible', false);
  this.set('serverapivisible', false);
};

TutorialView.prototype.apptypeTitle = function() {
  var apptypeQuery = 'name === "%"'.replace('%', this.get('apptype'));
  var apptypeFilter = _(apptypeQuery);
  var apptype = this.model.get('apptypes').filter(apptypeFilter);
  return apptype.length ? apptype[0].title : '';
};

TutorialView.prototype._platformTitle = function(type) {
  var platformQuery = 'url === "%"'.replace('%', this.get(type));
  var platformFilter = _(platformQuery);

  type = ~type.indexOf('Platform')
    ? type.slice(0, type.indexOf('Platform')) + 'app'
    : type;

  var platform = this.model.get(type.toLowerCase() + 's').filter(platformFilter);
  return platform.length ? platform[0].title : '';
};

TutorialView.prototype.platformTitle = function() {
  if (this.model.get('nativePlatform')) return this._platformTitle('nativePlatform');
  if (this.model.get('hybridPlatform')) return this._platformTitle('hybridPlatform');
  if (this.model.get('clientPlatform')) return this._platformTitle('clientPlatform');
  if (this.model.get('serverPlatform')) return this._platformTitle('serverPlatform');
  return '';
};

TutorialView.prototype.apiTitle = function() {
  if (this.model.get('serverApi')) return this._platformTitle('serverApi');
  return '';
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