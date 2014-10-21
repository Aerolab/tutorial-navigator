/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;
var jquery = require('jquery');

module.exports = disabledIf;

function disabledIf(el, property) {
  var binding = this;
  var get = getValue.bind(binding);
  binding.change(onchange);

  function onchange() {
    get(property, onvalue)
  }

  function onvalue(value) {
    if(!value) return enable(el);

    return disable(el);
  }
}

function enable(el) {
  return jquery(el)
    .removeClass('disabled')
    .find('.disabled-cover')
    .remove();
}

function disable(el) {
  if (!jquery('.disabled-cover', el).length) {
    jquery(el).append(jquery('<div class="disabled-cover">'));
  }

  return jquery(el).addClass('disabled');

}
