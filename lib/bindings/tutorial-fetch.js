/**
 * Module dependencies.
 */

var jsonp = require('jsonp');
var jquery = require('jquery');
var utils = require('binding-utils');
var getValue = utils.getValue;
var jsonpOpts = {
  prefix: '__a0tn'
}

/**
 * Export `tutorialFetch` binding
 */

module.exports = tutorialFetch;

/**
 * component/reative binding definition
 */

function tutorialFetch(el, property) {
  var binding = this;
  var get = getValue.bind(binding);
  var view = binding.view;
  var model = binding.model;
  var clientId = model.clientId() || '';
  var baseUrl = model.docsDomain() || base;

  binding.change(onchange);

  function onchange() {
    get(property, fetch);
  }

  function fetch(name) {
    if (!name) return;
    var platform = view.findPlatform(name);
    var api = view.findApi(name);
    var uri = platform
      ? platform.url
      : (api ? api.url : '/');

    var docUrl = baseUrl;
    docUrl += uri;
    docUrl += '?e=1';
    docUrl += (clientId ? '&a=' + clientId : '');
    docUrl += model.get('clientPlatform')
      ? '&frontend=' + view.findPlatform(model.get('clientPlatform')).name
      : '';
    docUrl += model.get('nativePlatform')
      ? '&mobile=' + view.findPlatform(model.get('nativePlatform')).name
      : '';
    docUrl += model.get('hybridPlatform')
      ? '&mobile=' + view.findPlatform(model.get('hybridPlatform')).name
      : '';
    docUrl += model.get('serverPlatform')
      ? '&backend=' + view.findPlatform(model.get('serverPlatform')).name
      : '';
    docUrl += model.get('serverApi')
      ? '&api=' + view.findApi(model.get('serverApi')).name
      : '';
    docUrl += model.get('hybridPlatform')
      ? '&hybrid=true'
      : '';
    docUrl += model.get('serverApi') && view.findApi(model.get('serverApi')).thirdParty
      ? '&3rd=true'
      : '';

    var cancel = jsonp(docUrl, jsonpOpts, ontutorial);

    function ontutorial(err, data) {
      if (err) return;
      if (!data.html) return;
      // jquery executes inline <script> tags
      // which are required to load the
      // tutorial interactive demos
      // XXX: This should be handled differently!
      var docs = jquery(data.html);
      docs.filter('pre').addClass('prettyprint');
      jquery(el).html(docs);
      // invoke pretty print right after insertion
      // on tutorial element container
      view.pretty();
    };

  }

}

