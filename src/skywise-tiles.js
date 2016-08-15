'use strict';
require('es6-promise').polyfill();
require('es6-object-assign').polyfill();
require('array-find-polyfill');
var valid_frames = require('./utils/valid-frames');
var consts = require('./utils/consts');

/**
 * Object representing a layer that is registered with plugin
 * @typedef {Object} activeLayer
*/

function get_current_frame_index (frames) {
  return frames.length - 1;
}

/**
 * @module SkywiseTiles
 * @param  {[Object]} a the main map object
 * @param  {[String]} b 3scale app_id
 * @param  {[String]} c 3scale app_key
 * @param  {[type]} d the renderer to use, found in renderers directory
 */
module.exports = function SkywiseTiles(a, b, c, d) {
  var map = a;
  var app_id = b;
  var app_key = c;
  var renderer = d;
  var active_layers = {};

  function updateCurrentFrame(layer_id, frame_index) {
    var current_frame = active_layers[layer_id].frames[frame_index];
    active_layers[layer_id].current_frame = current_frame;
    active_layers[layer_id].tilelayer.setFrame(current_frame);
  }

  function refreshSingleProduct(layer_id) {
    return valid_frames(active_layers[layer_id].product, app_id, app_key).then(function(frames) {
      active_layers[layer_id].frames = frames;
      var current_frame_index = get_current_frame_index(frames);
      if (frames[current_frame_index].currentTime !== active_layers[layer_id].current_frame.currentTime) {
        updateCurrentFrame(layer_id, current_frame_index);
        return layer_id + ' refreshed';
      }
      return layer_id + ' refresh not needed';
    });
  }

  /**
   * [addTile description]
   * @memberof SkywiseTiles
   * @param {String} [layer_id]  identifier of the layer to be added. must be unique
   * @param {layerOption} options    [description]
   */
  this.add = function add(layer_id, options) {
    if (active_layers[layer_id]) {
        return Promise.reject(new Error('Product already added to map'));
    }
    var product = {
        layer_id: layer_id,
        style: (options && options.style) || 'default'
    };
    return valid_frames(product, app_id, app_key).then(function(frames) {
      var current_frame_index = get_current_frame_index(frames);
      var tilelayer = renderer({
        style: (options && options.style) || 'default',
        source_id: layer_id + '-' + frames[current_frame_index] + '-source',
        layer_id: layer_id,
        frame: frames[current_frame_index]
      });
      if (!tilelayer) {
        return Promise.reject(new Error('Error Initializing Skywise.TileLayer'));
      }
      active_layers[layer_id] = {
        frames: frames,
        current_frame: frames[current_frame_index],
        tilelayer: tilelayer
      };
      active_layers[layer_id].tilelayer.addTo(map);
      if (consts.refresh_interval) {
        active_layers[layer_id].refresh_interval_id = setInterval(function() {
          return refreshSingleProduct(layer_id);
        }, consts.refresh_interval);
      }
      return active_layers[layer_id];
    }).catch(function(err) {
      return Promise.reject(err);
    });
  };

  /**
   * [removeTile description]
   * @memberof SkywiseTiles
   * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
   * @returns {this}
   */
  this.remove = function remove(layer_id) {
    if (!layer_id) {
      for (var id in active_layers) {
        active_layers[id].tilelayer.removeFrom(map);
        delete active_layers[layer_id];
      }
    } else if (active_layers[layer_id]) {
      active_layers[layer_id].tilelayer.removeFrom(map);
      delete active_layers[layer_id];
    } else {
      console.warn('layer_id not found');
    }
    return this;
  };

  /**
   * [refresh description]
   * @memberof SkywiseTiles
   * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
   * @returns {this}
   */
  this.refresh = function refresh(layer_id) {
    if (!layer_id) {
      var refreshers = [];
      for (var id in active_layers) {
        refreshers.push(refreshSingleProduct(id));
      }
      Promise.all(refreshers);
    } else if (active_layers[layer_id]) {
      refreshSingleProduct(layer_id);
    } else {
      console.warn('layer_id not found');
    }
    return this;
  };

  /**
   * [goToNextFrame description]
   * @memberof SkywiseTiles
   * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
   * @returns {this}
   */
  this.next = function next(layer_id) {
    if (active_layers[layer_id]) {
      var current_frame_index = active_layers[layer_id].current_frame.index;
      var new_frame_index = current_frame_index + 1;
      new_frame_index = Math.min(active_layers[layer_id].frames.length - 1, new_frame_index);
      if (new_frame_index === current_frame_index) {
        new_frame_index = 0;
      }
      updateCurrentFrame(layer_id, new_frame_index);
    }
    return this;
  };

  /**
   * [goToPreviousFrame description]
   * @memberof SkywiseTiles
   * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
   * @returns {this}
   */
  this.previous = function previous(layer_id) {
    if (active_layers[layer_id]) {
      var current_frame_index = active_layers[layer_id].current_frame.index;
      var new_frame_index = current_frame_index - 1;
      new_frame_index = Math.max(0, new_frame_index);
      if (new_frame_index === current_frame_index) {
        new_frame_index = active_layers[layer_id].frames.length - 1;
      }
      updateCurrentFrame(layer_id, new_frame_index);
    }
    return this;
  };

  /**
   * return the layer
   * @memberof SkywiseTiles
   * @param {String} [layer_id=null]  identifier of the layer. If null, returns active_layer object
   * @returns {activeLayer|Object<activeLayer>} returns either one active
   */
  this.get = function get(layer_id) {
    if (!layer_id) {
      return active_layers;
    }
    if (active_layers[layer_id]) {
      return active_layers[layer_id];
    }
    return null;
  };

  /**
  * set the opacity to 0 of a given tile layer identified by layer_id
  *
  * this can be used in conjuction with {@link show}
  * @memberof SkywiseTiles
   * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
   * @returns {this}
   */
  this.hide = function hide(layer_id) {
    if (!layer_id) {
      for (var id in active_layers) {
        active_layers[id].tilelayer.hide();
      }
    } else if (active_layers[layer_id]) {
      active_layers[layer_id].tilelayer.hide();
    } else {
      console.warn('layer_id not found');
    }
    return this;
  };

/**
 * set the opacity to the layer opacity of a given tile layer identified by layer_id
 *
 * this can be used in conjuction with {@link hide}
 *
 * @memberof SkywiseTiles
 * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
 * @return {this}
 */
  this.show = function show(layer_id) {
    if (!layer_id) {
      for (var id in active_layers) {
        active_layers[id].tilelayer.show();
      }
    } else if (active_layers[layer_id]) {
      active_layers[layer_id].tilelayer.show();
    } else {
      console.warn('layer_id not found');
    }
    return this;
  };

  /**
   * set opacity of a given tile layer identified by layer_id
   *
   * @memberof SkywiseTiles
   * @param {Number} opacity    value between 0 and 1
   * @param {String} [layer_id=null]  identifier of the layer. If null, iterates through all layers
   * @returns {this}
   */
  this.opacity = function opacity(opacity, layer_id) {
    if (!layer_id) {
      for (var id in active_layers) {
        active_layers[id].tilelayer.setOpacity(opacity);
      }
    } else if (active_layers[layer_id]) {
      active_layers[layer_id].tilelayer.setOpacity(opacity);
    } else {
      console.warn('layer_id not found');
    }
    return this;
  };
};
