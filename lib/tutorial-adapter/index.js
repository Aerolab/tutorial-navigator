module.exports = Adapter;

function Adapter(obj) {
  if (!(this instanceof Adapter)) {
    return new Adapter(obj);
  }

  var self = this;
  self.obj = obj;
};

/**
 * Default subscription method.
 * Subscribe to changes on the model.
 *
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} fn
 */

Adapter.prototype.subscribe = function(prop, fn) {
  // Hack: For sub-objects on `each` iterations
  if (!this.obj.on) return;
  this.obj.on('change ' + prop, fn);
};

/**
 * Default unsubscription method.
 * Unsubscribe from changes on the model.
 */

Adapter.prototype.unsubscribe = function(prop, fn) {
  // Hack: For sub-objects on `each` iterations
  if (!this.obj.off) return;
  this.obj.off('change ' + prop, fn);
};

/**
 * Remove all subscriptions on this adapter
 */

Adapter.prototype.unsubscribeAll = function() {
  // Hack: For sub-objects on `each` iterations
  if (!this.obj.off) return;
  this.obj.off();
};

/**
 * Default setter method.
 * Set a property on the model.
 *
 * @param {Object} obj
 * @param {String} prop
 * @param {Mixed} val
 */

Adapter.prototype.set = function(prop, val) {
  var obj = this.obj;
  if (!obj) return;
  if ('function' == typeof obj[prop]) {
    obj[prop](val);
  }
  else if ('function' == typeof obj.set) {
    obj.set(prop, val);
  }
  else {
    obj[prop] = val;
  }
};

/**
 * Default getter method.
 * Get a property from the model.
 *
 * @param {Object} obj
 * @param {String} prop
 * @return {Mixed}
 */

Adapter.prototype.get = function(prop) {
  var obj = this.obj;
  if (!obj) {
    return undefined;
  }

  // split property on '.' access
  // and dig into the object
  var parts = prop.split('.');
  var part = parts.shift();
  do {
    if (typeof obj[part] === 'function') {
      obj = obj[part].call(obj);
    }
    else {
      obj = obj[part];
    }

    if (!obj) {
      return undefined;
    }

    part = parts.shift();
  } while(part);

  return obj;
};


/**
 * Added keynav jQuery plugin here... for now :P
 */


/*
 * Keynav - jQuery Keyboard Navigation plugin
 *
 * Copyright (c) 2013 Nick Ostrovsky
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.firedev.com/jquery.keynav
 *
 * Version:  0.1
 *
 */

;(function($, window, document, undefined) {


  function Keynav(elements, options) {
  
    // Bind main plugin events
    this.bindEvents();

    // Initialize the keynav
    this.init(elements, options);
  }

  Keynav.prototype = {

    init: function(elements, options) {

      var defaults = {
        updateResizeInterval: 500, // Update every 500ms when window is resized
        autoSelectFirst: true,
        onSelect: function(el){}
      };

      // Set the options, merging any defaults
      this.options = $.extend({}, defaults, options);

      this.matrix = [],
      this.x = 0,
      this.y = 0;
      this.elements = elements;

      this.current = this.elements.filter('.selected');

      if (this.current.length == 0 && this.options.autoSelectFirst)
      {
        this.selectFirst();
      }

      // Update the matrix
      this.update();
    },

    bindEvents: function() {
      this.bindKeyboard();
      this.bindResize();
    },

    unbindEvents: function() {
      this.unbindKeyboard();
      this.unbindResize();
    },

    bindResize: function() {
      $(window).on('resize', $.proxy(this.onResize, this));
    },

    unbindResize: function() {
      $(window).off('resize', $.proxy(this.onResize, this));
    },

    bindKeyboard: function() {
      $(document).on('keydown', $.proxy(this.onKeydown, this));
    },

    unbindKeyboard: function() {
      $(document).off('keydown', $.proxy(this.onKeydown, this));
    },

    update: function() {

      var i = 0,
        row = [],
        j = -1,
        oldtop = false,
        m = [];

      this.elements.each(function() {
        if (!oldtop) oldtop = this.offsetTop;
        newtop = this.offsetTop;
        if (newtop != oldtop)
        {
          oldtop = newtop;
          m[i] = row;
          row = [];
          i++;
          j=0;
          row[j] = this;
        }
        else
        {
          j++;
          row[j] = this;
        }
      });
      m[i] = row;
      this.matrix = m;
      coordinates = this.findCurrent();
      this.x = coordinates[0];
      this.y = coordinates[1];
      return m;
    },

    findCurrent: function() {
      var i = 0, j = 0, found = false;
      try {
        for (i=0; i < this.matrix.length; i++)
        {
          row = this.matrix[i];
          for (j=0; j < row.length; j++)
          {
            if (this.current[0] == row[j])
            {
              return [i, j];
            }

          }
        }
      }
      catch (arr)
      {
        // found = [-1, -1]
      }

      return [-1, 0];
    },

    setCurrent: function(i,j) {

      var matrix = this.matrix;
      if (i < 0) i = (matrix.length - 1);
      if (i >= matrix.length) i = 0;
      if (j < 0) j = (matrix[i].length - 1);
      if (j >= matrix[i].length) j = 0;

      this.current.removeClass('selected');
      this.current.trigger('keyboardBlur');

      this.current = $(matrix[i][j]);
      this.current.addClass('selected');
      this.current.trigger('keyboardFocus');

      if( window.pageYOffset < this.current[0].offsetTop < window.pageYOffset+window.innerHeight  ) {
        $('html,body').animate({ scrollTop: this.current[0].offsetTop-50 }, 200);
      }
      this.x = i;
      this.y = j;
    },

    onResize: function() {


      if (this.resizeTimer)
      {
        clearTimeout(this.resizeTimer);
      }

      this.resizeTimer = setTimeout($.proxy(this.update, this), this.options.updateResizeInterval);
    },

    selectFirst: function() {
      this.current = this.elements.first();
      this.current.addClass('selected');
      this.update();
    },

    onKeydown: function(e) {

      var x = this.x, y = this.y;

      if ($.inArray(e.keyCode, [37, 38, 39, 40]) !== -1)
      {
        e.preventDefault();
      }

      switch (e.keyCode)
      {
        // left
        case 37:
          this.setCurrent(x,y-1);
          break;

        // up
        case 38:
          this.setCurrent(x-1,y);
          break;

        // right
        case 39:
          this.setCurrent(x,y+1);
          break;

        // down
        case 40:
          this.setCurrent(x+1,y);
          break;

        // case 13:
        //  if (this.current)
        //  {
        //    window.location = this.current.attr('href');
        //  }
        //  break;
      }
    },

    destroy: function() {
      this.unbindEvents();
      this.current.removeClass('selected');
    }

  };

  $.fn.keynav = function(options, value) {

    // Initialize keynav?
    var keynav = $.data(window, 'keynav');

    if (keynav === undefined)
    {
      keynav = new Keynav(this, options);
      $.data(window, 'keynav', keynav);
    }
    else
    {
      keynav.init(this, options);
    }

    // Handle method calls
    if (typeof options === 'string')
    {
      switch (options)
      {
        case 'update':
          keynav.update();
          break;

        case 'destroy':
          keynav.destroy();
          $.removeData(window, 'keynav');
          break;

      }

      return;
    }

    return this;
  }


})(jQuery, window, document);

    

    

