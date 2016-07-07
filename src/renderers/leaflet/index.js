var skywise_tilelayer = require('./TileLayer.Skywise');

var LeafletRenderer = function (opts) {
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
  options.attribution = "Weather Data &copy; <a href=\"http://wdtinc.com\" target=\"_blank\">WDT, Inc.</a>";
  return new LeafletRenderer(options);
}
