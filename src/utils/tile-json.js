'use strict';
var consts = require('./consts');
/**
 * [exports description]
 * @private
 * @param  {[ProductObject]} product
 * @param  {[String]} frame   string representation of time YYYY-MM-DDTHH:MM:SS
 * @return {[Object]}         a TileJSON object adhering to the specification found at https://github.com/mapbox/tilejson-spec/tree/master/2.0.0
 */
module.exports = function generateTileJSON(product, frame) {
  var layer_id = product.layer_id;
  var style = product.style;

  return {
    "attribution": "Weather Data &copy; <a href=\"http://wdtinc.com\" target=\"_blank\">WDT, Inc.</a>",
    "autoscale": true,
    "bounds": [-180, -85, 180, 85],
    "center": [0, 0, 3],
    "id": layer_id,
    "maxzoom": 18,
    "minzoom": 0,
    "type": "raster",
    "currentTime": frame,
    "tileSize": 256,
    "name": layer_id,
    "private": false,
    "scheme": "xyz",
    "tilejson": "2.0.0",
    "tiles": [
      [consts.domain, '/', 'swarmweb', '/', 'tile', '/', layer_id, '/', frame, '/', '{z}', '/', '{x}', '/', '{y}', '.png', '?style=', style].join('')
    ],
    "webpage": "http://wdtinc.com/product-service/skywise-tiles/"
  };
};

/**
 * object defining a given layer
 * @private
* @typedef {Object} ProductObject
* @property {String} layer_id swarm product name
* @property {String} style a custom style name for the given layer
*/
