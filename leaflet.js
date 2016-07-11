var SkywiseRasterTiles = require('./src/skywise-raster-tiles');
var leaflet_renderer = require('./src/renderers/leaflet');
var WDT = {
  version: require('./package').version,
  skywise_tiles_leaflet: function(map, app_id, app_key) {
    'use strict';

    return new SkywiseRasterTiles(map, app_id, app_key, leaflet_renderer);
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
