/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;
var offset = require('offset');
var scrollTo = require('scroll-to');

module.exports = scrollOn;

function scrollOn(el, property) {
  var binding = this;
  var get = getValue.bind(binding);
  binding.change(onchange);

  function onchange() {
    get(property, onvalue);
  }

  function onvalue(value) {
    if (!value) return;
    var left = window.pageXOffset;
    var top = offset(el) ? offset(el).top : 0;
    scrollTo(left, top, { duration: 500, ease: 'linear' });
  }
}
