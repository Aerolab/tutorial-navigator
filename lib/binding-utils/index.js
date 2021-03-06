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

/*! jqueryanimatesprite - v1.3.5 - 2014-10-17
* http://blaiprat.github.io/jquery.animateSprite/
* Copyright (c) 2014 blai Pratdesaba; Licensed MIT */
(function(t,i,n){"use strict";var e=function(i){return this.each(function(){var e=t(this),a=e.data("animateSprite"),r=function(t){var i=e.css("background-image").replace(/url\((['"])?(.*?)\1\)/gi,"$2"),n=new Image;n.onload=function(){var i=n.width,e=n.height;t(i,e)},n.src=i};a||(e.data("animateSprite",{settings:t.extend({width:e.width(),height:e.height(),totalFrames:!1,columns:!1,fps:12,complete:function(){},loop:!1,autoplay:!0},i),currentFrame:0,controlAnimation:function(){var t=function(t,i){return t++,t>=i?this.settings.loop===!0?(t=0,a.controlTimer()):this.settings.complete():a.controlTimer(),t};if(this.settings.animations===n)e.animateSprite("frame",this.currentFrame),this.currentFrame=t.call(this,this.currentFrame,this.settings.totalFrames);else{if(this.currentAnimation===n)for(var i in this.settings.animations){this.currentAnimation=this.settings.animations[i];break}var r=this.currentAnimation[this.currentFrame];e.animateSprite("frame",r),this.currentFrame=t.call(this,this.currentFrame,this.currentAnimation.length)}},controlTimer:function(){var t=1e3/a.settings.fps;a.settings.duration!==n&&(t=a.settings.duration/a.settings.totalFrames),a.interval=setTimeout(function(){a.controlAnimation()},t)}}),a=e.data("animateSprite"),a.settings.columns?a.settings.autoplay&&a.controlTimer():r(function(t,i){if(a.settings.columns=Math.round(t/a.settings.width),!a.settings.totalFrames){var n=Math.round(i/a.settings.height);a.settings.totalFrames=a.settings.columns*n}a.settings.autoplay&&a.controlTimer()}))})},a=function(i){return this.each(function(){if(t(this).data("animateSprite")!==n){var e=t(this),a=e.data("animateSprite"),r=Math.floor(i/a.settings.columns),s=i%a.settings.columns;e.css("background-position",-a.settings.width*s+"px "+-a.settings.height*r+"px")}})},r=function(){return this.each(function(){var i=t(this),n=i.data("animateSprite");clearTimeout(n.interval)})},s=function(){return this.each(function(){var i=t(this),n=i.data("animateSprite");i.animateSprite("stopAnimation"),n.controlTimer()})},o=function(){return this.each(function(){var i=t(this),n=i.data("animateSprite");i.animateSprite("stopAnimation"),n.currentFrame=0,n.controlTimer()})},m=function(i){return this.each(function(){var n=t(this),e=n.data("animateSprite");"string"==typeof i?(n.animateSprite("stopAnimation"),e.settings.animations[i]!==e.currentAnimation&&(e.currentFrame=0,e.currentAnimation=e.settings.animations[i]),e.controlTimer()):(n.animateSprite("stopAnimation"),e.controlTimer())})},c=function(i){return this.each(function(){var n=t(this),e=n.data("animateSprite");e.settings.fps=i})},u={init:e,frame:a,stop:r,resume:s,restart:o,play:m,stopAnimation:r,resumeAnimation:s,restartAnimation:o,fps:c};t.fn.animateSprite=function(i){return u[i]?u[i].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof i&&i?(t.error("Method "+i+" does not exist on jQuery.animateSprite"),n):u.init.apply(this,arguments)}})(jQuery,window);