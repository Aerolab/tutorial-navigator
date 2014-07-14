/**
 * Module dependencies.
 */

var _ = require('to-function');
var modella = require('modella');
var defaults = require('modella-defaults');
var apptypes = require('application-types');
var nativeplatforms = require('native-platforms');
var hybridplatforms = nativeplatforms.filter(_('hybrid'));
var clientplatforms = require('client-platforms');
var serverplatforms = require('server-platforms');
var serverapis = require('server-apis');

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
  .attr('clientId', { default: '' })
  .attr('docsDomain', { default: 'https://docs.auth0.com' })
  .attr('apptype', { default: '' })
  .attr('nativePlatform', { default: '' })
  .attr('hybridPlatform', { default: '' })
  .attr('clientPlatform', { default: '' })
  .attr('serverApi', { default: '' })
  .attr('serverPlatform', { default: '' })
  .attr('apptypes', { default: apptypes })
  .attr('nativeplatforms', { default: nativeplatforms })
  .attr('hybridplatforms', { default: hybridplatforms })
  .attr('clientplatforms', { default: clientplatforms })
  .attr('serverplatforms', { default: serverplatforms })
  .attr('serverapis', { default: serverapis })
  .attr('codevisible', { default: false })
  .attr('nativevisible', { default: false })
  .attr('hybridvisible', { default: false })
  .attr('clientvisible', { default: false })
  .attr('serverapivisible', { default: false })
