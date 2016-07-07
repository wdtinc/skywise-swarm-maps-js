var consts = require('../../utils/consts');
SkywiseImageMapType = function (options) {
  'use strict';
  var product_id = options.product_id;
  var frame = options.frame;
  var style = options.style;

  // Normalizes the coords that tiles repeat across the x axis (horizontally)
  // like the standard Google map tiles.
  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
  }
  return new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
	    var normalized_coord = getNormalizedCoord(coord, zoom);
      return [consts.domain, '/', 'swarmweb', '/', 'tile', '/', product_id, '/', frame, '/', zoom, '/', normalized_coord.x, '/', normalized_coord.y, '.png', '?style=', style].join('');
    },
    tileSize: new google.maps.Size(256, 256),
    name: product_id
  });
};

module.exports = function (options) {
  return new SkywiseImageMapType(options);
}
