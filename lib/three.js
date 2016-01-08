/**
 * Module dependencies.
 */

var fs = require('fs')
  , Canvas = require('canvas')
  , Image = Canvas.Image
  , jsdom = require('jsdom')
  , document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>')
  , window = document.defaultView
  , src = fs.readFileSync(__dirname + '/../include/three.min.js')
  , src2 = fs.readFileSync(__dirname + '/../include/CanvasRenderer.js')
  , src3 = fs.readFileSync(__dirname + '/../include/Projector.js')
  , self = global;

/**
 * Monkey patch for Image#addEventListener.
 *
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} useCapture (will ignore)
 */

Image.prototype.addEventListener = function(type, listener, useCapture) {
  this['on' + type] = listener;
};

/**
 * Evaluate Three.js source code.
 */

eval('(function(window, document) {'
  + src.toString('utf-8').replace('var THREE', 'var THREE = window.THREE')
  + '})(window, document);'
);
eval('(function(window, document) {'
  + ' var THREE = window.THREE; '
  + src2.toString('utf-8')
  + '})(window, document);'
);
eval('(function(window, document) {'
  + ' var THREE = window.THREE; '
  + src3.toString('utf-8')
  + '})(window, document);'
);

window.THREE.Image = Image;
window.THREE.Canvas = Canvas;

/**
 * Expose `THREE`
 */

module.exports = window.THREE;
