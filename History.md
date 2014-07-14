
0.8.2 / 2014-07-14
==================

  * Fix typo on server platforms collection
  * Clean History.md

0.8.1 / 2014-07-10
==================

 * Added bump
 * Fixed NodeJS path to the new documentation
 * Added jQuery name
 * Added jQuery

0.8.0 / 2014-07-07
==================

 * Update tutorial navigator to send query parameters for new-docs on jsonp request
 * Revert: Update to save platform object instead of name as tutorial states...
 * Update purgeCache task for CDN
 * Update to save platform object instead of name as tutorial states, making it easier to manipulate
 * Update disabled-if == Boolean

0.7.6 / 2014-07-04
==================

 * Add symfony tutorial
 * Fix routing example
 * Update tutorial.html to save name state on element
 * Update TutorialView to expect unique names instead of urls
 * Update binding fetch-tutorial to expect unique names instead of urls
 * Update quickstart tutorial to reflect tutorial-model updates
 * Update tutorial-model
 * Add data-name to platforms
 * Add name fields to apptypes and platforms dictionaries as unique keys

0.7.5 / 2014-07-01
==================

 * Update Gruntfile.js to publish latest on cdn
 * Add minor styles updates
 * Fix bug when using plugins to build minified releases
 * Update Readme.md
 * Update to fully stylus styles

0.7.4 / 2014-06-25
==================

 * Update Readme.md
 * Update styles to fix standalone version

0.7.3 / 2014-06-25
==================

 * Update standalone styles and example
 * Update Readme.md
 * Update Makefile
 * Update to use component-stylus on build

0.7.2 / 2014-06-24
==================

 * UI enhancement
 * Update gruntfile dev task

0.7.1 / 2014-06-24
==================

 * Update readme.md
 * Update to use `clientId` and `docsDomain` to alter tutorial doc request url
 * Add `clientId` and `docsDomain` options to tutorial-model
 * Update styles
 * example: Add standalone example. Still requires bootstrap loaded in page
 * release: Add minification and standalone to release deployment
 * docs: Added Java, Ruby on rails and ruby
 * example: fix routing example

0.7.0 / 2014-06-10
==================

 * Add prettyprint to routing example
 * Add class prettyprint on `pre` returned docs, to allow pretty printing
 * Remove auth0/styleguide as a main dependency

0.6.3 / 2014-06-10
==================

 * Fix minor css bug

0.6.2 / 2014-06-09
==================

 * Fix error when global function handler name matches docs.auth0.com
 * Fix odd indentation on h3 title
 * Fix routing example

0.6.1 / 2014-06-05
==================

 * Improve routing and fix pushState
 * Update emit with old values as 2nd parameter

0.6.0 / 2014-06-05
==================

 * Use grunt-connect to help simulate pushState on routing example
 * Move examples to example/ folder
 * Add fallback on scroll when tutorial is not yet on DOM
 * Add emit for `codevisible` state change
 * Update all change event emits
 * Add Tutorial model and adapter for reactive with `modella/modella`
 * Remove unused title from template
 * Remove unused tutorial props

0.5.1 / 2014-06-03
==================

 * Add cdn scripts with Gruntfile.js

0.5.0 / 2014-06-03
==================

 * Update css
 * Add ability to change tutorial state from outter apps
 * Add events to communicate tutorial state to outter apps

0.4.0 / 2014-06-02
==================

 * Update to make platform selection to display both sub-steps when server API optional. Close #3
 * Update to show platform titles at tabs text instead of plain 'Client, Native, ...'
 * Add `scroll-on` binding directive
 * Add `disable-if` reactive binding directive and styles

0.3.0 / 2014-05-30
==================

 * Move demo to example.html and update README.md
 * Move tutorial as main thing on the repo
 * Apply a third version for tutorial navigation.
 * Update new docs. Not yet implemented.


0.2.0 / 2014-05-28
==================

* Implement new design for displaying auth0 tutorial docs


0.1.0 / 2014-05-26
==================

* Initial release
