"use strict";

/**
 * creates mapbox-gl styles based on a style within the tilelayer options object
 * @private
 * @param  {[tilelayerOptions]} options tilelayer options object with style properties
 * @return {[Array]}         Array of mapbox-gl layers
 */
module.exports = function gl_layer(options) {
  var source_id = options.source_id;
  return [{
    "id": source_id + '-layer',
    "type": "raster",
    "source": source_id,
    "minzoom": options.frame.minzoom,
    "maxzoom": options.frame.maxzoom,
    "paint": {
      "raster-opacity": options.hidden ? 0 : 1
    }
  }];
};
