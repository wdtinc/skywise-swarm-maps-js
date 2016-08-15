/* global L */
'use strict';
var SkywiseMapboxTileLayer = L.mapbox.TileLayer.extend({
  initialize: function(_, options) {
    L.TileLayer.prototype.initialize.call(this, undefined, options);

    this._tilejson = {};
    this._setTileJSON(options.frame);
  },
  _setTileJSON: function(json) {
        L.extend(this.options, {
            tiles: json.tiles,
            attribution: this.options.sanitizer(json.attribution),
            minZoom: json.minzoom || 0,
            maxZoom: json.maxzoom || 18,
            bounds: L.latLngBounds([[json.bounds[1], json.bounds[0]], [json.bounds[3], json.bounds[2]]]),
            tms: false
        });

        this._tilejson = json;
        this.redraw();
        return this;
    },
    getTileUrl: function(tilePoint) {
       var tiles = this.options.tiles,
           index = Math.floor(Math.abs(tilePoint.x + tilePoint.y) % tiles.length),
           url = tiles[index];

       var templated = L.Util.template(url, tilePoint);
       return templated;
   },
  setStyle: function setStyle(style) {
    Object.assign(this.options, {
      style: style
    });
    this._setTileJSON(this.options.frame);
    this.redraw();
    return this;
  },
  setFrame: function setFrame(frame) {
    Object.assign(this.options, {
      frame: frame
    });
    this._setTileJSON(this.options.frame);
    this.redraw();
    return this;
  },
  setOptions: function setOptions(_opts) {
    Object.assign(this.options, _opts);
    this._setTileJSON(this.options.frame);
    this.redraw();
    return this;
  }
});

module.exports = function(options) {
  return new SkywiseMapboxTileLayer(null, options);
};
