var skywise_tilelayer = require('./Mapbox.TileLayer.Skywise');

var MapboxJSRenderer = function (opts) {
  'use strict';
  var options = opts;
  var tilelayer = skywise_tilelayer(options);
   this.addTo = function addTo (map) {
      map.addLayer(tilelayer);
   };
   this.removeFrom = function removeFrom (map) {
     map.removeLayer(tilelayer);
   }
}


module.exports = function (options) {
  if(!options || !options.product_id || !options.frame) {
    console.error("product_id and frame in options object is required");
    return null;
  }
  options.style = options.style || 'default';
  return new MapboxJSRenderer(options);
}
