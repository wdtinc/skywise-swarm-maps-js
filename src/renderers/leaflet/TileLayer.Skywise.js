require('es6-object-assign').polyfill();
var consts = require('../../utils/consts');

var SkywiseTileLayer = L.TileLayer.extend({
  initialize: function initialize(options) {
    'use strict';
    L.TileLayer.prototype.initialize.call(this, '', options);
  },
  getTileUrl: function getTileUrl(tile_point) {
        'use strict';
        var product_id = this.options.product_id;
        var frame = this.options.frame;
        var style = this.options.style;
        var zoom = this._getZoomForUrl();
        var tile_url = [consts.domain, '/', 'swarmweb', '/', 'tile', '/', product_id, '/', frame, '/', zoom, '/', tile_point.x, '/', tile_point.y, '.png', '?style=', style].join('');
        return tile_url;
    },
    setStyle: function setStyle(style) {
        'use strict';
        this.options.assign({
          style: style
        });
        this.redraw();
        return this;
    },
    setFrame: function setFrame(frame) {
        'use strict';
        this.options.assign({
          frame: frame
        });
        this.redraw();
        return this;
    },
    setOptions: function setOptions(_opts) {
        'use strict';
        this.options.assign(_opts);
        this.redraw();
        return this;
    }
});

module.exports = function (options) {
  return new SkywiseTileLayer(options);
}
