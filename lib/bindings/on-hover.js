/**
 * Module dependencies.
 */

var utils = require('binding-utils');
var getValue = utils.getValue;

module.exports = animation;

function animation(el, property) {
  var binding = this;
  var get = getValue.bind(binding);
  binding.change(onchange);

  function onchange() {
    get(property, onvalue)
  }

  function onvalue(value) {
    if(!!value) return active(el);
    return false;
  }
}

function to(start,end) {
  var arr = [];
  while(start <= end){ arr.push(start++); }
  return arr;
}
function hassprite (el,selector) {
  return jQuery(el).find('i').hasClass(selector)?true:false;
}
function whichis(el,classes) {
  var is;
  for (var i = 0; i < classes.length; i++) {
    hassprite(el, classes[i])?is=i:'';
  };
  return is;
}

function active(el) {
  var classes = ["sprite-native-mobile","sprite-spa","sprite-webapp","sprite-hybrid"];
  var frames  = [20,11,28,20];

  if ( 'undefined' !== typeof jQuery && 'undefined' !== typeof $.fn.animateSprite) {
    
    function play (el) { 
      var is = whichis( el, classes );
      jQuery(el).find('i').animateSprite({ 
        fps: 12,
        animations: {
            animate: to(0,frames[is])
        },
        loop: true,
        autoplay: false
      });
      jQuery(el).find('i').animateSprite('play');
    }
    function stop (el) {
      jQuery(el).find('i').animateSprite('frame', 0);
      jQuery(el).find('i').animateSprite('stop');
    }

    // Bug selected animate
    // play( jQuery('.app-type.selected').find('.app-type-item') );
    // jQuery('.app-type').on('keyboardFocus keyboardBlur', function() {
    //   if ( jQuery(this).hasClass('selected') ) {
    //     play( jQuery(this).find('.app-type-item') );
    //   }else{
    //     stop( jQuery(this).find('.app-type-item') );
    //   }
    // });

    jQuery('.app-type-item').hover(function() {
      // Deselected and Stop All
      jQuery('.app-type.selected').removeClass('selected');
      // stop(jQuery('.app-type.selected').find('.app-type-item'));
      // Play to Hover
      play(jQuery(this));
    }, function() {
      stop(jQuery(this));
    });
  
  }
}

