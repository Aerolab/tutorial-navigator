/**
 * Module dependencies.
 */

var jsonp = require('jsonp');
var jquery = require('jquery');
var base = "https://docs.auth0.com";

exports['tutorial-fetch'] = tutorialFetch;

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