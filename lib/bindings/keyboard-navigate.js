/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;
var jquery = require('jquery');
var k = require('k')
var bindings = [];

module.exports = navigate;

function navigate(el, property) {
  var binding = this;
  var get = getValue.bind(binding);
  binding.change(onchange);

  function onchange() {
    get(property, onvalue)
  }

  function onvalue(value) {
    if(!!value) return enable(el);
    return disable(el);
  }
}

function enable(el) {
  var keyboard = k(window);
  keyboard.__el = el;
  bindings.push(keyboard);
  
  keyboard('space', onEnter);
  keyboard('enter', onEnter);

  jquery("[keynav-item]", el).removeClass("selected")
  jquery("[keynav-item]", el).first().addClass("selected")
  function onEnter (ev) {
    ev.preventDefault();
    jquery(".selected", el).click();
  }

  if ( 'undefined' !== typeof jQuery && 'undefined' !== typeof $.fn.keynav)
  {
    $('[keynav-item] a', el).on("click", function(ev) {ev.preventDefault()})
    $('[keynav-item]', el).keynav()
  }
}

function disable(el) {
  jquery("[keynav-item]", el).removeClass("selected")

  bindings.filter(function(keyboard) {
    return keyboard.__el === el;
  }).forEach(function (keyboard) {
    keyboard.unbind();
  });

}
