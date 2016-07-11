/* global L */
'use strict';
var tile_json = require('../../utils/tile-json');
var SkywiseMapboxTileLayer = L.mapbox.TileLayer.extend({
  initialize: function(_, options) {
    L.TileLayer.prototype.initialize.call(this, undefined, options);

    this._tilejson = {};

    this._setTileJSON(tile_json(options));
  },
  setStyle: function setStyle(style) {
    Object.assign(this.options, {
      style: style
    });
    this._setTileJSON(tile_json(this.options));
    this.redraw();
    return this;
  },
  setFrame: function setFrame(frame) {
    Object.assign(this.options, {
      frame: frame
    });
    this._setTileJSON(tile_json(this.options));
    this.redraw();
    return this;
  },
  setOptions: function setOptions(_opts) {
    Object.assign(this.options, _opts);
    this._setTileJSON(tile_json(this.options));
    this.redraw();
    return this;
  }
});

module.exports = function(options) {
  return new SkywiseMapboxTileLayer(null, options);
};
