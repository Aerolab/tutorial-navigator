/**
 * Module dependencies.
 */

var modella = require('modella');
var defaults = require('modella-defaults');
var apptypes = require('apptypes');
var nativeapps = require('native-platforms');
var clientapps = require('client-platforms');
var serverapis = require('server-apis');
var serverapps = require('server-platforms');
var _ = require('to-function');

/**
 * Define model
 */

var Tutorial = module.exports = modella('Tutorial');

/**
 * Extend model with `defaults` plugin
 */

Tutorial.use(defaults);

/**
 * Define attributes
 */

Tutorial
  .attr('apptype', { default: '' })
  .attr('nativePlatform', { default: '' })
  .attr('hybridPlatform', { default: '' })
  .attr('clientPlatform', { default: '' })
  .attr('serverApi', { default: '' })
  .attr('serverPlatform', { default: '' })
  .attr('apptypes', { default: apptypes })
  .attr('nativeapps', { default: nativeapps })
  .attr('hybridapps', { default: nativeapps.filter(_('hybrid')) })
  .attr('clientapps', { default: clientapps })
  .attr('serverapis', { default: serverapis })
  .attr('serverapps', { default: serverapps })
  .attr('codevisible', { default: false })
  .attr('nativevisible', { default: false })
  .attr('hybridvisible', { default: false })
  .attr('clientvisible', { default: false })
  .attr('serverapivisible', { default: false })
