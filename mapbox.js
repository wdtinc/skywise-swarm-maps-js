var SkywiseRasterTiles = require('./src/skywise-raster-tiles');
var mapbox_renderer = require('./src/renderers/mapbox');
var WDT = {
	version: require('./package').version,
  skywise_tiles_mapbox: function (map, app_id, app_key) {
    'use strict';

    return new SkywiseRasterTiles(map, app_id, app_key, mapbox_renderer);
  }
};

function expose() {
	var oldWDT = window.WDT;

	WDT.noConflict = function () {
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
