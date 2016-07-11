'use strict';
var skywise_tilelayer = require('./TileLayer.Skywise');

var LeafletRenderer = function(opts) {
  var options = opts;
  var tilelayer = skywise_tilelayer(options);
  this.addTo = function addTo(map) {
    Object.assign(options, {
      map: map
    });
    map.addLayer(tilelayer);
  };
  this.removeFrom = function removeFrom(map) {
    Object.assign(options, {
      map: null
    });
    map.removeLayer(tilelayer);
  };
  this.setFrame = function setFrame(frame) {
    Object.assign(options, {
      frame: frame
    });
    tilelayer.setFrame(frame);
  };
  this.setStyle = function setStyle(style) {
    Object.assign(options, {
      style: style
    });
    tilelayer.setStyle(style);
  };
};


module.exports = function(options) {
  if (!options || !options.product_id || !options.frame || !options.style) {
    console.error("product_id, frame, and style in options object are required");
    return null;
  }
  options.attribution = "Weather Data &copy; <a href=\"http://wdtinc.com\" target=\"_blank\">WDT, Inc.</a>";
  return new LeafletRenderer(options);
};
