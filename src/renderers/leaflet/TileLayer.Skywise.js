/* global L */
'use strict';
require('whatwg-fetch');
var SkywiseTileLayer = L.TileLayer.extend({
  initialize: function initialize(__, options) {
    L.TileLayer.prototype.initialize.call(this, null, options);
  },
  setStyle: function setStyle(style) {
    Object.assign(this.options, {
      style: style
    });
    this.redraw();
    return this;
  },
  getTileUrl: function (tilePoint) {
    var tiles = this.options.frame.tiles;
    var index = Math.floor(Math.abs(tilePoint.x + tilePoint.y) % tiles.length);
    var tile_url = tiles[index];
    var zoom = this._getZoomForUrl();
    return tile_url.split('{x}').join(tilePoint.x).split('{y}').join(tilePoint.y).split('{z}').join(zoom);
  },
  setFrame: function setFrame(frame) {
    Object.assign(this.options, {
      frame: frame
    });
    this.redraw();
    return this;
  },
  setOptions: function setOptions(_opts) {
    Object.assign(this.options, _opts);
    this.redraw();
    return this;
  }
});

module.exports = function(options) {
  return new SkywiseTileLayer(null, options);
};
