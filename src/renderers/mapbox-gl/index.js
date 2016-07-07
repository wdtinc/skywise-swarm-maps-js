var tile_json = require('../../utils/tile-json');

var MapboxGLRenderer = function (opts) {
  'use strict';
  var options = opts;
  var tilejson = tile_json(options);
   this.addTo = function addTo (map) {
     tilejson.type = "raster";
     map.addSource(options.product_id + "-source", tilejson);
      map.addLayer({
        'id': options.product_id,
        "type": "raster",
        "source": options.product_id + "-source",
        "minzoom": 0,
        "maxzoom": 22
      }, 'barrier_line-land-line');
   };
   this.removeFrom = function removeFrom (map) {
     map.removeLayer(options.product_id);
     map.removeSource(options.product_id + "-source");
   }
}


module.exports = function (options) {
  if(!options || !options.product_id || !options.frame) {
    console.error("product_id and frame in options object is required");
    return null;
  }
  options.style = options.style || 'default';
  return new MapboxGLRenderer(options);
}
