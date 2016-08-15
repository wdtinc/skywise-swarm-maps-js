'use strict';
var consts = require('./consts');
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
