'use strict';
var skywise_tilelayer = require('./Mapbox.TileLayer.Skywise');

var MapboxJSRenderer = function(opts) {
  var options = opts;
  options.opacity = options.opacity || 1;
  options.maxzoom = 22;
  var tilelayer = skywise_tilelayer(Object.assign(options, {
    opacity: options.hidden ? 0 : options.opacity
  }));
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
  this.setOpacity = function setOpacity(opacity) {
    options.opacity = opacity;
    tilelayer.setOpacity(opacity);
  };
  this.hide = function hide() {
    tilelayer.setOpacity(0);
  };
  this.show = function show() {
    tilelayer.setOpacity(options.opacity);
  };
};


module.exports = function(options) {
  if (!options || !options.layer_id || !options.frame || !options.style) {
    console.error("layer_id, frame, and style in options object are required");
    return null;
  }
  return new MapboxJSRenderer(options);
};
