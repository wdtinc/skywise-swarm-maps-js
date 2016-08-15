/* global google, Uint8Array */
"use strict";

var SkywiseImageMapType = function(a) {
    this.options = a;
    this.opacity_ = this.options.opacity;
    this.divs = [];
    this.name = this.options.layer_id;
    this.tileSize = new google.maps.Size(this.options.frame.tileSize, this.options.frame.tileSize);
};

SkywiseImageMapType.prototype.getTileUrl = function getTileUrl(coord, zoom) {
  var tilejson = this.options.frame;
  var normalized_coord = this.getNormalizedCoord(coord, zoom);
  var tile_url = tilejson.tiles[(normalized_coord.x + normalized_coord.y) % tilejson.tiles.length];
  return tile_url.split('{x}').join(normalized_coord.x).split('{y}').join(normalized_coord.y).split('{z}').join(zoom);
};

SkywiseImageMapType.prototype.getNormalizedCoord = function getNormalizedCoord(coord, zoom) {
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
};

SkywiseImageMapType.prototype.setFrame = function setFrame(frame) {
  Object.assign(this.options, {
    frame: frame
  });
  return this;
};
SkywiseImageMapType.prototype.setStyle = function setStyle(style) {
  Object.assign(this.options, {
    style: style
  });
  return this;
};
SkywiseImageMapType.prototype.setOptions = function setOptions(_opts) {
  Object.assign(this.options, _opts);
  return this;
};
SkywiseImageMapType.prototype.setOpacity = function setOpacity(opacity) {
  if (this.opacity_ === opacity) {
    return;
  }

    this.opacity_ = opacity;

    this.divs.forEach(function(div) {
      if (window.getComputedStyle(div).opacity === this.opacity_) {
        return;
      }

      div.style.opacity = this.opacity_;
    }.bind(this));
};

SkywiseImageMapType.prototype.createTileContainer = function(ownerDocument) {
    var div = ownerDocument.createElement('div');

    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    div.style.opacity = this.opacity_;

    return div;
  };
SkywiseImageMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
  var tileContainer = this.createTileContainer(ownerDocument);
  var tile = ownerDocument.createElement('img');
  tile.style.width = this.tileSize.width + 'px';
  tile.style.height = this.tileSize.height + 'px';

  var tile_url = this.getTileUrl(coord, zoom);

  tile.src = tile_url;
  tileContainer.appendChild(tile);

  this.divs.push(tileContainer);
  return tileContainer;
};
SkywiseImageMapType.prototype.releaseTile = function(div) {
    var divIndex = this.divs.indexOf(div);
    this.divs.splice(divIndex, 1);
  };
module.exports = function(options) {
  return new SkywiseImageMapType(options);
};
