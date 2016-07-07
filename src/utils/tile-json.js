var consts = require('./consts');
module.exports = function generateTileJSON(options) {
  var product_id = options.product_id;
  var frame = options.frame;
  var style = options.style;

  return {
	"attribution": "Weather Data &copy; <a href=\"http://wdtinc.com\" target=\"_blank\">WDT, Inc.</a>",
	"autoscale": true,
	"bounds": [-180, -85, 180, 85],
	"center": [0, 0, 3],
	"id": product_id,
	"maxzoom": 19,
	"minzoom": 0,
	"name": product_id,
	"private": false,
	"scheme": "xyz",
	"tilejson": "2.0.0",
	"tiles": [
    [consts.domain, '/', 'swarmweb', '/', 'tile', '/', product_id, '/', frame, '/', '{z}', '/', '{x}', '/', '{y}', '.png', '?style=', style].join('')
  ],
	"webpage": "http://wdtinc.com/product-service/skywise-tiles/"
}
};
