var tile_json = require('../../utils/tile-json');
SkywiseMapboxTileLayer = L.mapbox.TileLayer.extend({
  initialize: function(_, options) {
    L.TileLayer.prototype.initialize.call(this, undefined, options);

    this._tilejson = {};

    this._setTileJSON(tile_json(options));
  }
});

module.exports = function (options) {
  return new SkywiseMapboxTileLayer(null, options);
}
