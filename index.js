/**
 * Module dependencies.
 */

var TutorialView = require('tutorial-view');
var dom = require('dom');


var view = new TutorialView();

dom('section.content').append(view.render());
