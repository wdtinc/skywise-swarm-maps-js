'use strict';
var tile_json = require('../../utils/tile-json');

function refreshLayer(opts) {
  var tilejson = tile_json(opts);
  opts.map.removeSource(opts.product_id + "-source");
  opts.map.addSource(opts.product_id + "-source", tilejson);
}

var MapboxGLRenderer = function(opts) {
  var options = opts;
  this.addTo = function addTo(map) {
    Object.assign(options, {
      map: map
    });
    var tilejson = tile_json(options);
    map.addSource(options.product_id + "-source", tilejson);
    map.addLayer({
      'id': options.product_id,
      "type": "raster",
      "source": options.product_id + "-source",
      "minzoom": 0,
      "maxzoom": 22
    }, 'barrier_line-land-line');
  };

  this.removeFrom = function removeFrom(map) {
    Object.assign(options, {
      map: null
    });
    map.removeLayer(options.product_id);
    map.removeSource(options.product_id + "-source");
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
};


module.exports = function(options) {
  if (!options || !options.product_id || !options.frame || !options.style) {
    console.error("product_id, frame, and style in options object are required");
    return null;
  }
  return new MapboxGLRenderer(options);
};
