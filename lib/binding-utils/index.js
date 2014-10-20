/**
 * Module dependencies.
 */

var hasInterpolation = require('reactive/lib/utils').hasInterpolation;
var interpolate = require('reactive/lib/utils').interpolate;

/**
 * Export binding utils for component/reactive
 */

module.exports = {
  getValue: getValue
};

/**
 * Get value for property and invoke callback after it
 *
 * @param {String} property
 * @param {Function} cb
 * @public
 */

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
