/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;
var jquery = require('jquery');
var loading = require('./loading.html')
/**
 * Export `emptyIf` binding
 */

module.exports = emptyIf;

/**
 * Define `emtpyIf` component/reacrive binding
 */

function emptyIf(el, property) {
  var binding = this;
  var get = getValue.bind(this);

  binding.change(onchange);

  function onchange() {
    get(property, onvalue);
  }

  function onvalue(val) {
    if (val) jquery(el).html(loading);
  }
}
