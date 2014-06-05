/**
 * Module dependencies.
 */

var jsonp = require('jsonp');
var jquery = require('jquery');
var scrollTo = require('scroll-to');
var offset = require('offset');
var base = "https://docs.auth0.com";
var hasInterpolation = require('reactive/lib/utils').hasInterpolation;
var interpolate = require('reactive/lib/utils').interpolate;

exports['tutorial-fetch'] = tutorialFetch;
exports['empty-if'] = emptyIf;
exports['remove-if'] = removeIf;
exports['disabled-if'] = disabledIf;
exports['scroll-on'] = scrollOn;

function tutorialFetch(el, property) {
  var binding = this;
  binding.change(function(url) {
    if (!url) return;

    jsonp(base+url+'?e=1', ontutorial);

    function ontutorial(err, data) {
      if (err) return;
      if (!data.html) return;
      // jquery executes inline <script> tags
      // which are required to load the
      // tutorial interactive demos
      // XXX: This should be handled differently!
      jquery(el).html(data.html);
    };
  });
}

function emptyIf(el, property) {
  var binding = this;
  binding.change(function() {
    var val = binding.value(property);

    if (!hasInterpolation(property)) {
      return val && jquery(el).empty();
    }

    interpolate(property, function(prop, fn) {
      val = fn ? fn(binding.reactive) : binding.reactive.get(prop);
      return val && jquery(el).empty();
    });
  })
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

function getValue(property, cb) {
  var binding = this;

  if (!hasInterpolation(property)) return cb(binding.value(property));

  interpolate(property, function(prop, fn) {
    var val = fn
      ? fn(binding.reactive)
      : binding.reactive.get(prop);

    cb(val);
  });
}