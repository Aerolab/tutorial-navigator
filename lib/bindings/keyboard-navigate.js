/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;
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

  keyboard('backspace', goBack);

  jQuery("[keynav-item]", el).removeClass("selected")
  jQuery("[keynav-item]", el).first().addClass("selected")
  function onEnter (ev) {
    ev.preventDefault();
    jQuery(".selected", el).click();
  }

  function goBack (ev) {
    ev.stopPropagation();
    ev.preventDefault();
    jQuery('.tutorial-header .step-circle.active a').last()[0].click()
  }


  if ( 'undefined' !== typeof jQuery && 'undefined' !== typeof $.fn.keynav) {
    // Just bind if it's visible
    // console.log("Call keynav on " + jQuery(el).attr('class'));
    jQuery('[keynav-item] a', el).on("click", function(ev) {ev.preventDefault()});
    setTimeout(function () {
      
      // if (jQuery(el).hasClass('select-platform-api')) {
      //   elements = jQuery('[keynav-item].visible');
      // }else{
        elements = jQuery('[keynav-item]:visible');
      // }
      
      if (elements.length > 1 ) {
        elements.keynav();
      }else{
        jQuery('[keynav-item]').keynav('destroy');
      };
    },700)
  }
}

function disable(el) {
  // console.log("Destroy keynav on " + jQuery(el).attr('class'));
  // console.log(jQuery('[keynav-item]', el).keynav());
  // jQuery("[keynav-item]", el).removeClass("selected");
  // jQuery('[keynav-item]', el).keynav('destroy');

  bindings.filter(function(keyboard) {
    return keyboard.__el === el;
  }).forEach(function (keyboard) {
    keyboard.unbind();
  });

}
