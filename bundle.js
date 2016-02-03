(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hasClass = require('amp-has-class');
var isString = require('amp-is-string');
var isArray = require('amp-is-array');
var trim = require('amp-trim');
var slice = Array.prototype.slice;
var cleanup = /\s{2,}/g;
var ws = /\s+/;


module.exports = function addClass(el, cls) {
    if (arguments.length === 2 && isString(cls)) {
        cls = trim(cls).split(ws);
    } else {
        cls = isArray(cls) ? cls : slice.call(arguments, 1);    
    }
    // optimize for best, most common case
    if (cls.length === 1 && el.classList) {
        if (cls[0]) el.classList.add(cls[0]);
        return el;
    }
    var toAdd = [];
    var i = 0;
    var l = cls.length;
    var item;
    var clsName = el.className;
    // see if we have anything to add
    for (; i < l; i++) {
        item = cls[i];
        if (item && !hasClass(clsName, item)) {
            toAdd.push(item);
        }
    }
    if (toAdd.length) {
        el.className = trim((clsName + ' ' + toAdd.join(' ')).replace(cleanup, ' '));
    }
    return el;
};

},{"amp-has-class":2,"amp-is-array":3,"amp-is-string":4,"amp-trim":6}],2:[function(require,module,exports){
var isString = require('amp-is-string');
var whitespaceRE = /[\t\r\n\f]/g;


// note: this is jQuery's approach
module.exports = function hasClass(el, cls) {
    var cName = (isString(el) ? el : el.className).replace(whitespaceRE, ' ');
    return (' ' + cName + ' ').indexOf(' ' + cls + ' ') !== -1;
};

},{"amp-is-string":4}],3:[function(require,module,exports){
var toString = Object.prototype.toString;
var nativeIsArray = Array.isArray;


module.exports = nativeIsArray || function isArray(obj) {
    return toString.call(obj) === '[object Array]';
};

},{}],4:[function(require,module,exports){
var toString = Object.prototype.toString;


module.exports = function isString(obj) {
    return toString.call(obj) === '[object String]';
};

},{}],5:[function(require,module,exports){
var isString = require('amp-is-string');
var isArray = require('amp-is-array');
var trim = require('amp-trim');
var slice = Array.prototype.slice;
var cleanup = /\s{2,}/g;
var ws = /\s+/;


module.exports = function removeClass(el, cls) {
    if (arguments.length === 2 && isString(cls)) {
        cls = trim(cls).split(ws);
    } else {
        cls = isArray(cls) ? cls : slice.call(arguments, 1);    
    }
    // optimize for best, most common case
    if (cls.length === 1 && el.classList) {
        if (cls[0]) el.classList.remove(cls[0]);
        return el;
    }
    // store two copies
    var clsName = ' ' + el.className + ' ';
    var result = clsName;
    var current;
    var start;
    for (var i = 0, l = cls.length; i < l; i++) {
        current = cls[i];
        start = current ? result.indexOf(' ' + current + ' ') : -1;
        if (start !== -1) {
            start += 1;
            result = result.slice(0, start) + result.slice(start + current.length);
        }
    }
    // only write if modified
    if (clsName !== result) {
        el.className = trim(result.replace(cleanup, ' '));
    }
    return el;
};

},{"amp-is-array":3,"amp-is-string":4,"amp-trim":6}],6:[function(require,module,exports){
var trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;


module.exports = function trim(string) {
    return string.replace(trimRE, '');
};

},{}],7:[function(require,module,exports){
var closest = require('closest');
var assign = require('object-assign');
var scrollTo = require('scroll-to-element');

var eventHandler;

function destroy() {
  document.removeEventListener('click', eventHandler, false);
}

function init(options) {

  destroy();

  options = assign({
    updateUrl: true
  }, options);

  eventHandler = function(ev) {
    var link = closest(ev.target, options.selector || "a[href*='#']", true);
    if (link) {
      ev.preventDefault();
      if (history.pushState && options.updateUrl) {
        history.pushState(null, null, link.hash || '#');
      }
      scrollTo(link.hash || 'html', options);
    }
  };

  document.addEventListener('click', eventHandler, false);
}

module.exports = {
  init: init,
  destroy: destroy
};

},{"closest":9,"object-assign":8,"scroll-to-element":20}],8:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],9:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":18}],10:[function(require,module,exports){
/**
 * Module dependencies.
 */

var type;
try {
  type = require('component-type');
} catch (_) {
  type = require('type');
}

/**
 * Module exports.
 */

module.exports = clone;

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

function clone(obj){
  switch (type(obj)) {
    case 'object':
      var copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = clone(obj[key]);
        }
      }
      return copy;

    case 'array':
      var copy = new Array(obj.length);
      for (var i = 0, l = obj.length; i < l; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = '';
      flags += obj.multiline ? 'm' : '';
      flags += obj.global ? 'g' : '';
      flags += obj.ignoreCase ? 'i' : '';
      return new RegExp(obj.source, flags);

    case 'date':
      return new Date(obj.getTime());

    default: // string, number, boolean, …
      return obj;
  }
}

},{"component-type":14,"type":14}],11:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],12:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],13:[function(require,module,exports){

/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var clone = require('clone');
var type = require('type');
var ease = require('ease');

/**
 * Expose `Tween`.
 */

module.exports = Tween;

/**
 * Initialize a new `Tween` with `obj`.
 *
 * @param {Object|Array} obj
 * @api public
 */

function Tween(obj) {
  if (!(this instanceof Tween)) return new Tween(obj);
  this._from = obj;
  this.ease('linear');
  this.duration(500);
}

/**
 * Mixin emitter.
 */

Emitter(Tween.prototype);

/**
 * Reset the tween.
 *
 * @api public
 */

Tween.prototype.reset = function(){
  this.isArray = 'array' === type(this._from);
  this._curr = clone(this._from);
  this._done = false;
  this._start = Date.now();
  return this;
};

/**
 * Tween to `obj` and reset internal state.
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {Tween} self
 * @api public
 */

Tween.prototype.to = function(obj){
  this.reset();
  this._to = obj;
  return this;
};

/**
 * Set duration to `ms` [500].
 *
 * @param {Number} ms
 * @return {Tween} self
 * @api public
 */

Tween.prototype.duration = function(ms){
  this._duration = ms;
  return this;
};

/**
 * Set easing function to `fn`.
 *
 *    tween.ease('in-out-sine')
 *
 * @param {String|Function} fn
 * @return {Tween}
 * @api public
 */

Tween.prototype.ease = function(fn){
  fn = 'function' == typeof fn ? fn : ease[fn];
  if (!fn) throw new TypeError('invalid easing function');
  this._ease = fn;
  return this;
};

/**
 * Stop the tween and immediately emit "stop" and "end".
 *
 * @return {Tween}
 * @api public
 */

Tween.prototype.stop = function(){
  this.stopped = true;
  this._done = true;
  this.emit('stop');
  this.emit('end');
  return this;
};

/**
 * Perform a step.
 *
 * @return {Tween} self
 * @api private
 */

Tween.prototype.step = function(){
  if (this._done) return;

  // duration
  var duration = this._duration;
  var now = Date.now();
  var delta = now - this._start;
  var done = delta >= duration;

  // complete
  if (done) {
    this._from = this._to;
    this._update(this._to);
    this._done = true;
    this.emit('end');
    return this;
  }

  // tween
  var from = this._from;
  var to = this._to;
  var curr = this._curr;
  var fn = this._ease;
  var p = (now - this._start) / duration;
  var n = fn(p);

  // array
  if (this.isArray) {
    for (var i = 0; i < from.length; ++i) {
      curr[i] = from[i] + (to[i] - from[i]) * n;
    }

    this._update(curr);
    return this;
  }

  // objech
  for (var k in from) {
    curr[k] = from[k] + (to[k] - from[k]) * n;
  }

  this._update(curr);
  return this;
};

/**
 * Set update function to `fn` or
 * when no argument is given this performs
 * a "step".
 *
 * @param {Function} fn
 * @return {Tween} self
 * @api public
 */

Tween.prototype.update = function(fn){
  if (0 == arguments.length) return this.step();
  this._update = fn;
  return this;
};
},{"clone":10,"ease":16,"emitter":11,"type":14}],14:[function(require,module,exports){
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};

},{}],15:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],16:[function(require,module,exports){

// easing functions from "Tween.js"

exports.linear = function(n){
  return n;
};

exports.inQuad = function(n){
  return n * n;
};

exports.outQuad = function(n){
  return n * (2 - n);
};

exports.inOutQuad = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n;
  return - 0.5 * (--n * (n - 2) - 1);
};

exports.inCube = function(n){
  return n * n * n;
};

exports.outCube = function(n){
  return --n * n * n + 1;
};

exports.inOutCube = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n;
  return 0.5 * ((n -= 2 ) * n * n + 2);
};

exports.inQuart = function(n){
  return n * n * n * n;
};

exports.outQuart = function(n){
  return 1 - (--n * n * n * n);
};

exports.inOutQuart = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};

exports.inQuint = function(n){
  return n * n * n * n * n;
}

exports.outQuint = function(n){
  return --n * n * n * n * n + 1;
}

exports.inOutQuint = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

exports.inSine = function(n){
  return 1 - Math.cos(n * Math.PI / 2 );
};

exports.outSine = function(n){
  return Math.sin(n * Math.PI / 2);
};

exports.inOutSine = function(n){
  return .5 * (1 - Math.cos(Math.PI * n));
};

exports.inExpo = function(n){
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};

exports.outExpo = function(n){
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};

exports.inOutExpo = function(n){
  if (0 == n) return 0;
  if (1 == n) return 1;
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

exports.inCirc = function(n){
  return 1 - Math.sqrt(1 - n * n);
};

exports.outCirc = function(n){
  return Math.sqrt(1 - (--n * n));
};

exports.inOutCirc = function(n){
  n *= 2
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};

exports.inBack = function(n){
  var s = 1.70158;
  return n * n * (( s + 1 ) * n - s);
};

exports.outBack = function(n){
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};

exports.inOutBack = function(n){
  var s = 1.70158 * 1.525;
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
};

exports.inBounce = function(n){
  return 1 - exports.outBounce(1 - n);
};

exports.outBounce = function(n){
  if ( n < ( 1 / 2.75 ) ) {
    return 7.5625 * n * n;
  } else if ( n < ( 2 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
  } else if ( n < ( 2.5 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
  } else {
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
  }
};

exports.inOutBounce = function(n){
  if (n < .5) return exports.inBounce(n * 2) * .5;
  return exports.outBounce(n * 2 - 1) * .5 + .5;
};

// aliases

exports['in-quad'] = exports.inQuad;
exports['out-quad'] = exports.outQuad;
exports['in-out-quad'] = exports.inOutQuad;
exports['in-cube'] = exports.inCube;
exports['out-cube'] = exports.outCube;
exports['in-out-cube'] = exports.inOutCube;
exports['in-quart'] = exports.inQuart;
exports['out-quart'] = exports.outQuart;
exports['in-out-quart'] = exports.inOutQuart;
exports['in-quint'] = exports.inQuint;
exports['out-quint'] = exports.outQuint;
exports['in-out-quint'] = exports.inOutQuint;
exports['in-sine'] = exports.inSine;
exports['out-sine'] = exports.outSine;
exports['in-out-sine'] = exports.inOutSine;
exports['in-expo'] = exports.inExpo;
exports['out-expo'] = exports.outExpo;
exports['in-out-expo'] = exports.inOutExpo;
exports['in-circ'] = exports.inCirc;
exports['out-circ'] = exports.outCirc;
exports['in-out-circ'] = exports.inOutCirc;
exports['in-back'] = exports.inBack;
exports['out-back'] = exports.outBack;
exports['in-out-back'] = exports.inOutBack;
exports['in-bounce'] = exports.inBounce;
exports['out-bounce'] = exports.outBounce;
exports['in-out-bounce'] = exports.inOutBounce;

},{}],17:[function(require,module,exports){
/**
 * Module dependencies.
 */

var prefixed = require('prefixed');

/**
 * Expose `fade`.
 */

module.exports = fade;

/**
 * Fade `el` to `opacity` in `duration` seconds.
 *
 * @param {Element} el
 * @param {Number} opacity
 * @param {Number=} duration
 * @param {Function=} callback
 *
 * @todo Add other vendor prefixes
 * @todo Properly clear transition
 */

function fade (el, opacity, duration, callback) {
  if (typeof duration === 'undefined') duration = 1000;
  else if (typeof duration === 'function') {
    callback = duration;
    duration = 1000;
  }

  var oldTransition = prefixed.get(el.style, 'transition') || '';
  prefixed(el.style, 'transition', 'opacity ' + (duration/1000) + 's');
  el.style.opacity = opacity;

  setTimeout(function () {
    prefixed(el.style, 'transition', oldTransition);
    if (callback) callback();
  }, duration);
}

/**
 * Fade in `el`.
 *
 * @param {Element} el
 * @param {Number=} duration
 * @param {Function=} callback
 */

fade.out = function (el, duration, callback) {
  fade(el, 0, duration, callback);
};

/**
 * Fade out `el`.
 *
 * @param {Element} el
 * @param {Number=} duration
 * @param {Function=} callback
 */

fade['in'] = function (el, duration, callback) {
  fade(el, 1, duration, callback);
};

},{"prefixed":19}],18:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],19:[function(require,module,exports){
/**
 * Supported prefixes.
 */

var prefixes = [
  '-webkit-', '-moz-', '-o-', '-ms-', ''
];

/**
 * Expose `prefixed`.
 */

module.exports = prefixed;

/**
 * Set a style with all the vendor prefixes.
 *
 * @param {Object} style
 * @param {String} attribute
 * @param {String} value
 */

function prefixed (style, attribute, value) {
  for (var i = 0; i < prefixes.length; i++) {
    style[prefixes[i] + attribute] = value;
  }
};

/**
 * Get a (possibly prefixed) value.
 *
 * @param {Object} style
 * @param {String} attribute
 * @return {String}
 */

prefixed.get = function (style, attribute) {
  for (var i = 0; i < prefixes.length; i++) {
    var value = style[prefixes[i] + attribute];
    if (value && value != '') return value;
  }
  return '';
};


},{}],20:[function(require,module,exports){
var scroll = require('scroll-to');

function calculateScrollOffset(elem, additionalOffset, alignment) {
  var elemRect = elem.getBoundingClientRect();
  var clientHeight = document.documentElement.clientHeight;

  additionalOffset = additionalOffset || 0;

  var scrollPosition;
  if (alignment === 'bottom') {
    scrollPosition = elemRect.bottom - clientHeight;
  } else if (alignment === 'middle') {
    scrollPosition = elemRect.bottom - clientHeight / 2 - elemRect.height / 2;
  } else { // top and default
    scrollPosition = elemRect.top;
  }

  return scrollPosition + additionalOffset + window.pageYOffset;
}

module.exports = function (elem, options) {
  options = options || {};
  if (typeof elem === 'string') elem = document.querySelector(elem);
  if (elem) return scroll(0, calculateScrollOffset(elem, options.offset, options.align), options);
};

},{"scroll-to":21}],21:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Tween = require('tween');
var raf = require('raf');

/**
 * Expose `scrollTo`.
 */

module.exports = scrollTo;

/**
 * Scroll to `(x, y)`.
 *
 * @param {Number} x
 * @param {Number} y
 * @api public
 */

function scrollTo(x, y, options) {
  options = options || {};

  // start position
  var start = scroll();

  // setup tween
  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: x })
    .duration(options.duration || 1000);

  // scroll
  tween.update(function(o){
    window.scrollTo(o.left | 0, o.top | 0);
  });

  // handle end
  tween.on('end', function(){
    animate = function(){};
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();
  
  return tween;
}

/**
 * Return scroll position.
 *
 * @return {Object}
 * @api private
 */

function scroll() {
  var y = window.pageYOffset || document.documentElement.scrollTop;
  var x = window.pageXOffset || document.documentElement.scrollLeft;
  return { top: y, left: x };
}

},{"raf":12,"tween":13}],22:[function(require,module,exports){

/**
 * get the window's scrolltop.
 * 
 * @return {Number}
 */

module.exports = function(){
  if (window.pageYOffset) return window.pageYOffset;
  return document.documentElement.clientHeight
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
};

},{}],23:[function(require,module,exports){
/**
 * Transition-end mapping
 */

var map = {
  'WebkitTransition' : 'webkitTransitionEnd',
  'MozTransition' : 'transitionend',
  'OTransition' : 'oTransitionEnd',
  'msTransition' : 'MSTransitionEnd',
  'transition' : 'transitionend'
};

/**
 * Expose `transitionend`
 */

var el = document.createElement('p');

for (var transition in map) {
  if (null != el.style[transition]) {
    module.exports = map[transition];
    break;
  }
}

},{}],24:[function(require,module,exports){
module.exports={
  "breaks": {
    "small": "400px",
    "medium": "600px",
    "large": "800px",
    "xlarge": "1000px"
  },
  "title": {
    "text": "Hi, I'm Ranjani",
    "image": "img/title.png"
  },
  "subtitle": {
    "text": "Check out my work",
    "image": "img/subtitle.png"
  },
  "hero": {
    "mp4": "video/hero-reel.mp4",
    "webm": "video/hero-reel.webm",
    "fallback": "img/hero-fallback.jpg"
  },
  "heroSub": {
    "text": "Check out my work",
    "image": "img/hero-sub.png"
  },
  "sections": [
    {
      "id": "film",
      "banner": {
        "text": "moving pictures",
        "image": "img/banner/film.png"
      },
      "title": {
        "text": "moving",
        "image": "img/film-title.png"
      },
      "sub": {
        "text": "pictures",
        "image": "img/film-sub.png"
      },
      "nav": {
        "text": "a selection of videos I produced",
        "title": "videos",
        "image": "img/film-nav-title.png",
        "icon": "img/film-nav-icon.png",
        "hover": "img/film-nav-hover.png"
      }
    },
    {
      "id": "writing",
      "banner": {
        "text": "words on the internet",
        "image": "img/banner/writing.png"
      },
      "title": {
        "text": "internet",
        "image": "img/writing-title.png"
      },
      "sub": {
        "text": "words",
        "image": "img/writing-sub.png"
      },
      "nav": {
        "text": "shockingly true stories I wrote",
        "title": "writing",
        "image": "img/writing-nav-title.png",
        "icon": "img/writing-nav-icon.png",
        "hover": "img/writing-nav-hover.png"
      }
    },
    {
      "id": "about",
      "banner": {
        "text": "about me",
        "image": "img/banner/about.png"
      },
      "title": {
        "text": "about",
        "image": "img/about-title.png"
      },
      "sub": {
        "text": "me",
        "image": "img/about-sub.png"
      },
      "nav": {
        "text": "hopefully relevant facts about me",
        "title": "about me",
        "image": "img/about-nav-title.png",
        "icon": "img/about-nav-icon.png",
        "hover": "img/about-nav-hover.png"
      }
    }
  ],
  "sectionContent": {
    "film": {
      "videos": [
        {
          "name": "Million Dollar Blocks",
          "thumbnail": "img/video-thumb/million-dollar-blocks.jpg",
          "vimeoId": "147783798"
        },
        {
          "name": "Transition At Twelve",
          "thumbnail": "img/video-thumb/transition-at-twelve.jpg",
          "vimeoId": "140197201"
        },
        {
          "name": "Behind the Screen",
          "thumbnail": "img/video-thumb/behind-the-screen.jpg",
          "vimeoId": "151824169"
        },
        {
          "name": "The Cost of a Gunshot",
          "thumbnail": "img/video-thumb/cost-of-a-gunshot.jpg",
          "vimeoId": "125630343"
        },
        {
          "name": "Nuclear Graveyard",
          "thumbnail": "img/video-thumb/nuclear-graveyard.jpg",
          "vimeoId": "125630254"
        },
        {
          "name": "False Confessions",
          "thumbnail": "img/video-thumb/false-confessions.jpg",
          "vimeoId": "125630456"
        },
        {
          "name": "Stop Telling Women to Smile",
          "thumbnail": "img/video-thumb/stop-telling-women-to-smile.jpg",
          "vimeoId": "125628085"
        },
        {
          "name": "Dirty Coal",
          "thumbnail": "img/video-thumb/dirty-coal.jpg",
          "vimeoId": "125629931"
        },
        {
          "name": "Locked Up For Life",
          "thumbnail": "img/video-thumb/locked-up-for-life.jpg",
          "vimeoId": "125630149"
        },
        {
          "name": "Bank Deserts",
          "thumbnail": "img/video-thumb/bank-deserts.jpg",
          "vimeoId": "125630007"
        },
        {
          "name": "Lobster Economics",
          "thumbnail": "img/video-thumb/lobsters.jpg",
          "vimeoId": "125628740"
        },
        {
          "name": "Driven",
          "thumbnail": "img/video-thumb/driven.jpg",
          "vimeoId": "125628151"
        }
      ]
    },
    "writing": {
      "articles": [
        {
          "name": "For families of the incarcerated, conviction comes with a cost",
          "blurb": "On some blocks, states pay $1 million a year to incarcerate residents, and the cost to families can also be crippling",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/12/7/for-families-of-the-incarcerated-conviction-comes-with-a-cost.html",
          "image": "img/story-thumb/million-dollar-blocks.jpg"
        },
        {
          "name": "Transition at 12: Growing up transgender in Texas",
          "blurb": "Dozens of children and teens have been treated through a trailblazing Dallas clinic",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/9/20/transition-at-12-transgender-texas.html",
          "image": "img/story-thumb/transition-at-twelve.jpg"
        },
        {
          "name": "The ignored injuries of Reynosa's factory workers",
          "blurb": "In Reynosa, a Mexican border city, there are hundreds of assembly plants that feed global demand; but at what price?",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/multimedia/2015/9/the-increasingly-serious-injuries-of-mexican-factory-workers.html",
          "image": "img/story-thumb/reynosa-workers.jpg"
        },
        {
          "name": "What it means to be a bullied transgender kid in Texas",
          "blurb": "How does the trans community move on after Houston’s rejection of ‘bathroom bill’?",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/11/10/bullied-transgender-kid-in-texas-bathroom-bill-lgbt.html",
          "image": "img/story-thumb/trans-bullying.jpg"
        },
        {
          "name": "In Texas, trailer park fights mobile-home moguls for affordable housing",
          "blurb": "Trailer park residents in the Austin area fight to keep one of its last strongholds of affordable housing",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/10/28/trailer-parks-price-gouging-texas.html",
          "image": "img/story-thumb/trailer-park.jpg"
        },
        {
          "name": "How calling 911 can punish a domestic violence victim",
          "blurb": "In some cities, nuisance laws force domestic violence victims to decide between calling police and staying in their home",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/7/20/how-calling-911-can-punish-a-domestic-violence-victim.html",
          "image": "img/story-thumb/domestic-violence.png"
        },
        {
          "name": "Parents with disabilities fight to keep their kids",
          "blurb": "Despite all the rights Americans with disabilities have gained in the last 25 years, the right to parent remains elusive",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/5/29/parents-disabilities-discrimination.html",
          "image": "img/story-thumb/parents-with-disabilities.jpg"
        },
        {
          "name": "Imprisoned at 14, Illinois inmate gets resentenced to life without parole",
          "blurb": "After the U.S. Supreme Court struck down life without parole for child convicts, Adolfo Davis hoped for a second chance",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/5/4/adolfo-davis-life-parole.html",
          "image": "img/story-thumb/adolfo-davis.jpg"
        },
        {
          "name": "Race and Ferguson’s City Council",
          "blurb": "Two candidates – one black, one white – in the country’s ‘biggest local election’ on the issues facing Ferguson",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/4/3/the-ferguson-swing-seat.html",
          "image": "img/story-thumb/ferguson.jpg"
        },
        {
          "name": "Timeline: Pennsylvania 'junkyard dog' pushes to rid town of nuclear waste",
          "blurb": "Self-described \"mad junkyard dog\" Patty Ameno has been on a mission to clean up her hometown's nuclear waste",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/2/10/timeline-pennsylvania-junkyard-dog-pushes-to-rid-town-of-nuclear-waste.html",
          "image": "img/story-thumb/pennsylvania-nukes.jpg"
        },
        {
          "name": "Black, young and unarmed: The case of Cameron Tillman",
          "blurb": "Six weeks after Michael Brown's death, a police officer killed a black teen in Louisiana with no explanation",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/12/6/black-young-and-unarmedthecaseofcamerontillman.html",
          "image": "img/story-thumb/cameron-tillman.jpg"
        },
        {
          "name": "Take back the streets: Fighting harassment with feminist street art",
          "blurb": "One woman is battling street harassment by showing the world the faces of its victims",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/10/30/stop-telling-womentosmiletakingonharassmentwithfeministstreetart.html",
          "image": "img/story-thumb/stop-telling-women-to-smile.jpg"
        },
        {
          "name": "To save rural hospitals, a Republican mayor marches on Washington",
          "blurb": "On health care, N.C. Mayor Adam O'Neal went a different direction from most other Republicans – for about 275 miles",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/7/29/to-save-rural-hospitalsarepublicanmayormarchesonwashington.html",
          "image": "img/story-thumb/mayor-march.jpg"
        },
        {
          "name": "Making a withdrawal: Banks shut branches in poorer communities",
          "blurb": "Across the US, bank branches are closing in low-income communities, leaving residents with few financial options",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/6/24/banking-withdrawalfinancialinstitutionsclosebranchesinpoorerarea.html",
          "image": "img/story-thumb/bank-deserts.jpg"
        },
        {
          "name": "Why would someone confess to a crime he didn’t commit?",
          "blurb": "Sundhe Moses spent 18 years in prison for a murder he confessed to but says he wasn’t guilty of",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/5/21/why-would-someoneconfesstoacrimehedidntcommit.html",
          "image": "img/story-thumb/false-confessions.jpg"
        },
        {
          "name": "Elite NYC schools wrestle with drop in black, Hispanic students",
          "blurb": "With black and Hispanic enrollment at record lows, New York City considers changing its exam-based admissions",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/11/24/nyc-schools-blackhispanicasian.html",
          "image": "img/story-thumb/elite-schools.jpg"
        },
        {
          "name": "Is the University of Montana the ‘blueprint’ for sexual assault response?",
          "blurb": "Rape reports involving Montana football players led to a Justice Department overhaul of sexual assault policies",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/4/17/is-the-university-of-montana-the-blueprint-for-sexual-assault-response.html",
          "image": "img/story-thumb/montana.jpg"
        },
        {
          "name": "Exclusive: My grandfather runs an Amish cult from prison",
          "blurb": "The son of two Bergholz Barbers speaks out for the first time about the insular Ohio community he says he escaped",
          "link": "http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/10/28/ohio-amish-beardcuttingcult.html",
          "image": "img/story-thumb/amish-beard-cutting.jpg"
        }
      ]
    },
    "about": {
      "figure": {
        "areas": [
          {
            "box": [0.18, 0.22, 0.43, 0.38],
            "id": "feminist"
          },
          {
            "box": [0.62, 0.22, 0.92, 0.34],
            "id": "doodler"
          },
          {
            "box": [0.62, 0.34, 0.92, 0.46],
            "id": "wine enthusiast"
          },
          {
            "box": [0.62, 0.46, 0.92, 0.80],
            "id": "indian"
          },
          {
            "box": [0.18, 0.46, 0.43, 0.70],
            "id": "texan"
          }
        ],
        "header": {
          "image": "img/figure/header.png",
          "text": "I'm a"
        },
        "default": "journalist",
        "journalist": "img/figure/journalist.png",
        "feminist": "img/figure/feminist.png",
        "doodler": "img/figure/doodler.png",
        "indian": "img/figure/indian.png",
        "wine enthusiast": "img/figure/wine.png",
        "texan": "img/figure/texan.png"
      },
      "blurb": [
        "When I’m not busy drawing ridiculous cartoons of myself with six hands, I’m a Brooklyn based multimedia storyteller producing long form content for America Tonight on Al Jazeera America. I love a good story, and I’ll do nearly anything to tell it beautifully. My work has taken me everywhere from Chicago prisons, to Mexican border factories, to (probably still radioactive) nuclear sites in Pennsylvania.",
        "Prior to my time at AJAM, I was an associate producer with the NBC News Associates program in New York, where I contributed to Dateline, The Today Show, and Nightly News. During my time at 30 Rock, it’s important to note that Tina Fey once shook my hand.",
        "I joined NBC after graduating from the Medill School of Journalism at Northwestern University - where I completed independent grant projects and international reporting in Johannesburg, South Africa; Pune, India; and Marrakesh, Morocco.",
        "Want to get in touch? Choose your favorite contact method from the list of icons above. And for a more in-depth breakdown of the things I love, please observe the below diagram."
      ],
      "diagram": "img/loves.png"
    }
  },
  "socials": [
    {
      "name": "instagram",
      "icon": "img/social/instagram.png",
      "link": "https://www.instagram.com/ranjchak/"
    },
    {
      "name": "facebook",
      "icon": "img/social/facebook.png",
      "link": "https://www.facebook.com/ranjani.chakraborty"
    },
    {
      "name": "twitter",
      "icon": "img/social/twitter.png",
      "link": "https://twitter.com/ranjchak"
    },
    {
      "name": "vimeo",
      "icon": "img/social/vimeo.png",
      "link": "https://vimeo.com/ranjanichakraborty"
    },
    {
      "name": "linkedin",
      "icon": "img/social/linkedin.png",
      "link": "https://www.linkedin.com/in/ranjchak"
    },
    {
      "name": "email",
      "icon": "img/social/email.png",
      "link": "mailto:hello@ranjchak.com"
    },
    {
      "name": "resume",
      "icon": "img/social/resume.png",
      "link": "ranj-chak-resume.pdf"
    }
  ]
}

},{}],25:[function(require,module,exports){
// css fading in and out
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var FADE_IN_CLASSNAME = 'is-faded-in'
var FADE_OUT_CLASSNAME = 'is-faded-out'

var root
var endEvent

module.exports = {
  init: function(event) {
    endEvent = event
  },

  in: function(element, done) {
    element.addEventListener(endEvent, function() {
      if (done) {
        done()
      }
    })

    removeClass(element, FADE_OUT_CLASSNAME)
    addClass(element, FADE_IN_CLASSNAME)
  },

  out: function(element, done) {
    element.addEventListener(endEvent, function() {
      if (done) {
        done()
      }
    })

    removeClass(element, FADE_IN_CLASSNAME)
    addClass(element, FADE_OUT_CLASSNAME)
  }
}

},{"amp-add-class":1,"amp-remove-class":5}],26:[function(require,module,exports){
// do cool things with the about me figure on hover
'use strict'

var content = require('../content.json').sectionContent.about.figure

var figure

var checkMousePosition = function(x, y) {
  var imageBox = figure.getBoundingClientRect()

  var x = (x - imageBox.left) / imageBox.width
  var y = (y - imageBox.top) / imageBox.height
  var box = this.box

  if ((x > box[0]) && (y > box[1]) && (x < box[2]) && (y < box[3])) {
    return this.id
  }

  return content.default
}

module.exports = {
  init: function(root) {
    var document = root.document
    figure = document.getElementById('about-figure-image')
    // var figureContainer = document.getElementById('about-figure-image-container')
    // grab the boxes
    var boxes = content.areas.map(function(area) {
      // DEBUG
      // var boxDiv = document.createElement('div')
      // boxDiv.style.position = 'absolute'
      // boxDiv.style.left = area.box[0] * 100 + '%'
      // boxDiv.style.top = area.box[1] * 100 + '%'
      // boxDiv.style.width = (area.box[2] - area.box[0]) * 100 + '%'
      // boxDiv.style.height = (area.box[3] - area.box[1]) * 100 + '%'
      // figureContainer.appendChild(boxDiv)

      return checkMousePosition.bind(area)
    })

    figure.addEventListener('mousemove', function(event) {
      var imageName = content.default
      var index = 0

      while ((imageName === content.default) && (index < boxes.length)) {
        var check = boxes[index++]
        imageName = check(event.clientX, event.clientY)
      }

      var newSrc = content[imageName]
      if (figure.src !== newSrc) {
        figure.src = newSrc
        figure.alt = imageName
      }
    })

    figure.addEventListener('mouseout', function() {
      figure.src = content[content.default]
      figure.alt = content.default
    })
  }
}

},{"../content.json":24}],27:[function(require,module,exports){
// entry point for ranjchak dot com application
'use strict'

var anchorScroll = require('anchor-scroll')
var scrollTop = require('scrolltop')
var fade = require('fade')
var domready = require('domready')
var transitionEndEvent = require('transitionend-property')

var rafScroll = require('./raf-scroll')
var cssFade = require('./css-fade')
var nav = require('./nav')
var stories = require('./stories')
var videos = require('./videos')
var figure = require('./figure')

domready(function() {
  anchorScroll.init({
    updateUrl: true,
    offset: -100,
    ease: 'linear',
    duration: 300,
    selector: "a[href*='#']"
  })

  cssFade.init(transitionEndEvent)

  rafScroll.init(window, scrollTop)

  nav.init(window, rafScroll, cssFade)

  stories.init(window, cssFade)

  videos.init(window)

  figure.init(window)
})

},{"./css-fade":25,"./figure":26,"./nav":28,"./raf-scroll":29,"./stories":30,"./videos":31,"anchor-scroll":7,"domready":15,"fade":17,"scrolltop":22,"transitionend-property":23}],28:[function(require,module,exports){
// navigation bar
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var initNavLink = function(element) {
  var icon = element.querySelector('.nav-link-icon')
  var source = icon.getAttribute('src')
  var hoverSource = icon.getAttribute('data-hover-src')

  element.addEventListener('mouseover', function() {
    icon.setAttribute('src', hoverSource)
  })

  element.addEventListener('mouseout', function() {
    icon.setAttribute('src', source)
  })
}

var initNavScroll = function(container, scroll, fade) {
  var nav = container.querySelector('#nav')
  var isInView = true
  var isTransitioning = false

  scroll.add(function onNavScroll(scrollTop) {
    if (isTransitioning) {
      return
    }

    var rect = container.getBoundingClientRect()
    var top = rect.top
    var height = rect.height
    var middle = height / 2

    if ((top < -middle) && (isInView === true)) {
      isInView = false
      isTransitioning = true

      fade.out(nav, function() {
        container.style.height = height + 'px'
        addClass(nav, 'is-top-nav')
        fade.in(nav, function() {
          isTransitioning = false
        })
      })
    }

    else if ((top > -middle) && (isInView === false)) {
      isInView = true
      fade.out(nav, function() {
        container.style.height = 'auto'
        removeClass(nav, 'is-top-nav')
        fade.in(nav, function() {
          isTransitioning = false
        })
      })
    }
  })
}

module.exports = {
  init: function(root, scroll, fade) {
    var document = root.document
    var container = document.getElementById('nav-container')
    var navLinks = container.querySelectorAll('.nav-link')

    // change position on scroll
    initNavScroll(container, scroll, fade)

    // change icon on hover
    for (var i = 0; i < navLinks.length; i++) {
      initNavLink(navLinks[i])
    }
  }
}

},{"amp-add-class":1,"amp-remove-class":5}],29:[function(require,module,exports){
// scroll event handler using raf
// inspired by https://developer.mozilla.org/en-US/docs/Web/Events/scroll
'use strict'

var handlers = []

var trigger = function(event) {
  handlers.forEach(function(handler) {
    handler(event)
  })
}

module.exports = {
  init: function(root, scrollTop) {
    var running = false
    var top = scrollTop()

    root.addEventListener('scroll', function() {
      if (running) {
        return
      }

      running = true
      root.requestAnimationFrame(function() {
        trigger(scrollTop())
        running = false
      })
    })
  },

  add: function(handler) {
    handlers.push(handler)
  },

  remove: function(handler) {
    var index = handlers.indexOf(handler)
    if (index === -1) {
      return false
    }

    handlers.splice(index, 1)
    return true
  }
}

},{}],30:[function(require,module,exports){
// add background images to stories
'use strict'

var initArticle = function(article, blurb, fade) {
  fade.out(blurb)

  article.addEventListener('mouseover', function() {
    fade.in(blurb)
  })

  article.addEventListener('mouseout', function() {
    fade.out(blurb)
  })
}

module.exports = {
  init: function(root, fade) {
    var document = root.document

    // get all articles
    var articles = document.querySelectorAll('.story-list-item')

    var article
    var bg
    var blurb
    for (var i = 0; i < articles.length; i++) {
      article = articles[i]
      blurb = article.querySelector('.story-blurb')

      // give them the proper backgrounds
      bg = article.getAttribute('data-bg')
      article.style['background-image'] = 'url(' + bg + ')'

      // initialize the fading behavior
      if (blurb) {
        initArticle(article, blurb, fade)
      }
    }
  }
}

},{}],31:[function(require,module,exports){
// video list link hijacking and modal insertion
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var EMBED_ID = 'film-modal-embed'

var modal
var container
var embed

var closeModal = function(event) {
  event.stopPropagation()
  event.preventDefault()

  addClass(modal, 'is-hidden')
  embed.src = ''
}

var changeVideoEmbed = function(vimeoId) {
  embed.src = '//player.vimeo.com/video/' + vimeoId
}

var handleVideoClick = function(element) {
  var vimeoId = element.getAttribute('data-vimeo')

  removeClass(modal, 'is-hidden')
  changeVideoEmbed(vimeoId)
}

var initVideoLink = function(element) {
  element.addEventListener('click', function(event) {
    event.stopPropagation()
    event.preventDefault()

    handleVideoClick(element)
  })
}

var initVideoModal = function(document) {
  var closeButton = document.createElement('button')
  modal = document.createElement('div')
  container = document.createElement('div')
  embed = document.createElement('iframe')

  modal.id = 'film-modal'
  closeButton.id = 'film-modal-close-button'
  container.id = 'film-modal-container'
  embed.id = 'film-modal-embed'

  addClass(modal, 'is-hidden')
  embed.webkitallowfullscreen = true
  embed.mozallowfullscreen = true
  embed.allowfullscreen = true

  container.appendChild(closeButton)
  container.appendChild(embed)
  modal.appendChild(container)
  document.body.appendChild(modal)

  closeButton.addEventListener('click', closeModal)
  document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode === 27) {
      closeModal(event)
    }
  })
}

module.exports = {
  init: function(root) {
    var document = root.document
    var filmSection = document.getElementById('film')
    var videoLinks = filmSection.querySelectorAll('.story-list-item-link')

    initVideoModal(document)

    var link
    for (var i = 0; i < videoLinks.length; i++) {
      initVideoLink(videoLinks[i])
    }
  }
}

},{"amp-add-class":1,"amp-remove-class":5}]},{},[27]);
