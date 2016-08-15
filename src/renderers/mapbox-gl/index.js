'use strict';
var gl_layer = require('../../utils/gl-layer');

function refreshLayer(opts) {
  var tilejson = opts.frame;
  opts.map.removeSource(opts.source_id);
  opts.map.addSource(opts.source_id, Object.assign(tilejson, {
    "type": opts.type,
    "tileSize": opts.tilesize,
    "headers": {
      "Accept": opts.contentType + '; version=1'
    }
  }));
}

var MapboxGLRenderer = function(opts) {
  var options = opts;
  options.opacity = options.opacity || 1;
  this.addTo = function addTo(map) {
    Object.assign(options, {
      map: map
    });
    var tilejson = options.frame;
    console.log(options.source_id);
    map.addSource(options.source_id, Object.assign(tilejson, {
      "type": "raster",
      "tileSize": options.frame.tileSize,
      "headers": {
        "Accept": options.contentType + '; version=1'
      }
    }));

    options.gl_layers = gl_layer(options);
    options.gl_layers.forEach(function (layer) {
      map.addLayer(layer, 'barrier_line-land-line');
    });
  };

  this.removeFrom = function removeFrom(map) {
    Object.assign(options, {
      map: null
    });
    options.gl_layers.forEach(function (layer) {
      map.removeLayer(layer);
    });
    map.removeSource(options.source_id);
  };

  this.setFrame = function setFrame(frame) {
    Object.assign(options, {
      frame: frame
    });
    refreshLayer(options);
  };

  this.setStyle = function setStyle(style) {
    Object.assign(options, {
      style: style
    });
    refreshLayer(options);
  };

  this.setOpacity = function (opacity) {
    options.gl_layers.forEach(function (layer) {
      options.map.setPaintProperty(layer.id, options.paint_property + '-opacity', opacity);
    });
  };

  this.hide = function () {
    options.gl_layers.forEach(function (layer) {
      options.map.setPaintProperty(layer.id, options.paint_property + '-opacity', 0);
    });
  };

  this.show = function () {
    options.gl_layers.forEach(function (layer) {
      options.map.setPaintProperty(layer.id, options.paint_property + '-opacity', options.opacity);
    });
  };
};


module.exports = function(options) {
  if (!options || !options.layer_id || !options.frame) {
    console.error("layer_id, frame in options object are required");
    return null;
  }
  options.type = options.type || "raster";
  return new MapboxGLRenderer(options);
};
