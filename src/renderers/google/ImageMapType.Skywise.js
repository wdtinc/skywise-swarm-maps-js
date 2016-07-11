/* global google */
"use strict";
var consts = require('../../utils/consts');
var SkywiseImageMapType = function(a) {
  var options = a;

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

    return {
      x: x,
      y: y
    };
  }
  var imt = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var normalized_coord = getNormalizedCoord(coord, zoom);
      return [consts.domain, '/', 'swarmweb', '/', 'tile', '/', options.product_id, '/', options.frame, '/', zoom, '/', normalized_coord.x, '/', normalized_coord.y, '.png', '?style=', options.style].join('');
    },
    tileSize: new google.maps.Size(256, 256),
    name: options.product_id
  });
  imt.setFrame = function setFrame(frame) {
    Object.assign(options, {
      frame: frame
    });
    return this;
  };
  imt.setStyle = function setStyle(style) {
    Object.assign(options, {
      style: style
    });
    return this;
  };
  imt.setOptions = function setOptions(_opts) {
    Object.assign(options, _opts);
    return this;
  };
  return imt;
};

module.exports = function(options) {
  return new SkywiseImageMapType(options);
};
