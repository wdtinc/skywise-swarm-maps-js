/* global L */
'use strict';
var consts = require('../../utils/consts');

var SkywiseTileLayer = L.TileLayer.extend({
  initialize: function initialize(options) {
    L.TileLayer.prototype.initialize.call(this, '', options);
  },
  getTileUrl: function getTileUrl(tile_point) {
    var product_id = this.options.product_id;
    var frame = this.options.frame;
    var style = this.options.style;
    var zoom = this._getZoomForUrl();
    var tile_url = [consts.domain, '/', 'swarmweb', '/', 'tile', '/', product_id, '/', frame, '/', zoom, '/', tile_point.x, '/', tile_point.y, '.png', '?style=', style].join('');
    return tile_url;
  },
  setStyle: function setStyle(style) {
    Object.assign(this.options, {
      style: style
    });
    this.redraw();
    return this;
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
  return new SkywiseTileLayer(options);
};
