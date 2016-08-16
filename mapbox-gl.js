var SkywiseRasterTiles = require('./src/skywise-tiles');
var mapboxgl_renderer = require('./src/renderers/mapbox-gl');
var WDT = {
  version: "2.0.0",
  skywise_tiles_mapboxgl: function(map, app_id, app_key) {
    'use strict';

    return new SkywiseRasterTiles(map, app_id, app_key, mapboxgl_renderer);
  }
};

function expose() {
  var oldWDT = window.WDT;

  WDT.noConflict = function() {
    window.WDT = oldWDT;
    return this;
  };

  window.WDT = WDT;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = WDT;

} else if (typeof define === 'function' && define.amd) {
  define(WDT);
}

if (typeof window !== 'undefined') {
  expose();
}
