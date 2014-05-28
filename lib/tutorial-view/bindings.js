/**
 * Module dependencies.
 */

var jsonp = require('jsonp');
var jquery = require('jquery');
var base = "https://docs.auth0.com";
var hasInterpolation = require('reactive/lib/utils').hasInterpolation;
var interpolate = require('reactive/lib/utils').interpolate;

exports['tutorial-fetch'] = tutorialFetch;
exports['empty-if'] = emptyIf;

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