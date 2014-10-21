/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;

module.exports = removeIf;

function removeIf(el, property){
  var binding = this;
  var get = getValue.bind(this);

  binding.change(onchange);

  function onchange() {
    get(property, onvalue);
  }

  function onvalue(val) {
    if (val) el.parentNode.removeChild(el);
  }
};
