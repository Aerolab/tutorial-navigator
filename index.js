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
  this.model.on('change clientPlatform', function(value, old) {
    _self.emit('clientPlatform', value, old);
    _self.set('clientvisible', !!value);
  });
  this.model.on('change nativePlatform', function(value, old) {
    _self.emit('nativePlatform', value, old);
    _self.set('nativevisible', !!value);
  });
  this.model.on('change hybridPlatform', function(value, old) {
    _self.emit('hybridPlatform', value, old);
    _self.set('hybridvisible', !!value);
  });
  this.model.on('change serverPlatform', function(value, old) {
    _self.emit('serverPlatform', value, old);
    _self.set('codevisible', !!value);
  });
  this.model.on('change serverApi', function(value, old) {
    _self.emit('serverApi', value, old);
    _self.set('codevisible', !!value);
  });
  this.model.on('change apptype', function(value, old) {
    _self.clearTwo();
    _self.emit('apptype', value, old);
  });
  this.model.on('change codevisible', function(value, old) {
    _self.emit('codevisible', !!value, !!old);
  });
  this.model.on('change nativevisible', function(value, old) {
    _self.emit('nativevisible', !!value, !!old);
  });
  this.model.on('change hybridvisible', function(value, old) {
    _self.emit('hybridvisible', !!value, !!old);
  });
  this.model.on('change clientvisible', function(value, old) {
    _self.emit('clientvisible', !!value, !!old);
  });
  this.model.on('change serverapivisible', function(value, old) {
    _self.emit('serverapivisible', !!value, !!old);
  });
};

TutorialView.prototype.apptypeselect = function(ev) {
  var el = closest(ev.target, '[data-type]', true);
  if (!el) return;
  this.clear();
  this.set('apptype', el.getAttribute('data-type'));
}

TutorialView.prototype.nativeplatformselect = function(ev) {
  var el = closest(ev.target, '[data-name]', true);
  if (!el) return;
  var name = el.getAttribute('data-name');
  this.set('nativePlatform', name);
}

TutorialView.prototype.hybridplatformselect = function(ev) {
  var el = closest(ev.target, '[data-name]', true);
  if (!el) return;
  var name = el.getAttribute('data-name');
  this.set('hybridPlatform', name);
}

TutorialView.prototype.clientplatformselect = function(ev) {
  var el = closest(ev.target, '[data-name]', true);
  if (!el) return;
  var name = el.getAttribute('data-name');
  this.set('clientPlatform', name);
}

TutorialView.prototype.serverapiselect = function(ev) {
  var el = closest(ev.target, '[data-name]', true);
  if (!el) return;
  var name = el.getAttribute('data-name');
  this.set('serverApi', name);
}

TutorialView.prototype.serverplatformselect = function(ev) {
  var el = closest(ev.target, '[data-name]', true);
  if (!el) return;
  var name = el.getAttribute('data-name');
  this.set('serverPlatform', name);
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

TutorialView.prototype.find = function(collection, name) {
  var query = 'name === "%"'.replace('%', name);
  var filter = _(query);
  var platform = collection.filter(filter);
  return platform.length ? platform[0] : null;
};

TutorialView.prototype.findPlatform = function(name) {
  var model = this.model;
  var find = this.find;
  if (model.get('nativePlatform')) return find(model.get('nativeplatforms'), name);
  if (model.get('hybridPlatform')) return find(model.get('hybridplatforms'), name);
  if (model.get('clientPlatform')) return find(model.get('clientplatforms'), name);
  if (model.get('serverPlatform')) return find(model.get('serverPlatform'), name);
  return null;
};

TutorialView.prototype.findApi = function(name) {
  var model = this.model;
  var find = this.find;
  return find(model.get('serverapis'), name);
};

TutorialView.prototype.platformTitle = function() {
  var model = this.model;
  var name = model.get('nativePlatform')
    || model.get('hybridPlatform')
    || model.get('clientPlatform')
    || model.get('serverPlatform');
  var platform = this.findPlatform(name);
  return platform ? platform.title : '';
};

TutorialView.prototype.apiTitle = function() {
  var name = this.model.get('serverApi');
  var api = this.findApi(name);
  return api ? api.title : '';
};

TutorialView.prototype.apptypeTitle = function() {
  var apptypeQuery = 'name === "%"'.replace('%', this.get('apptype'));
  var apptypeFilter = _(apptypeQuery);
  var apptype = this.model.get('apptypes').filter(apptypeFilter);
  return apptype.length ? apptype[0].title : '';
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
