/**
 * Module dependencies.
 */

var jquery = require('jquery');
var scrollTo = require('scroll-to');
var offset = require('offset');
var utils = require('binding-utils');
var getValue = utils.getValue;

exports['tutorial-fetch'] = require('./tutorial-fetch');
exports['empty-if'] = emptyIf;
exports['remove-if'] = removeIf;
exports['disabled-if'] = disabledIf;
exports['scroll-on'] = scrollOn;


function emptyIf(el, property) {
  var binding = this;
  var get = getValue.bind(this);

  binding.change(onchange);

  function onchange() {
    get(property, onvalue);
  }

  function onvalue(val) {
    if (val) jquery(el).empty();
  }
}

function removeIf(el, property){
  var binding = this;
  binding.change(function() {
    if (binding.value(property)) {
      el.parentNode.removeChild(el);
    }
  });
};

function disabledIf(el, property) {
  var binding = this;
  var get = getValue.bind(binding);
  binding.change(onchange);

  function onchange() {
    get(property, onvalue)
  }

  function onvalue(value) {
    if(!value) {
      return jquery(el)
        .removeClass('disabled')
        .find('.disabled-cover')
        .remove();
    }

    if (!jquery('.disabled-cover', el).length) {
      jquery(el)
      .append(jquery('<div class="disabled-cover">'));
    }
    return jquery(el).addClass('disabled');
  }
}

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
