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
 * @param  {[String]} b Skywise app_id
 * @param  {[String]} c Skywise app_key
 * @param  {[Class]} d the renderer to use, found in renderers directory
 */
module.exports = function SkywiseTiles(a, b, c, d) {
  var map = a;
  var skywise_app_id = b;
  var skywise_app_key = c;
  var renderer = d;
  var active_layers = {};

  function updateCurrentFrame(layer_id, frame_index) {
    var current_frame = active_layers[layer_id].frames[frame_index];
    active_layers[layer_id].current_frame = current_frame;
    active_layers[layer_id].tilelayer.setFrame(current_frame);
  }

  function refreshSingleProduct(layer_id) {
    return valid_frames(active_layers[layer_id].product, skywise_app_id, skywise_app_key).then(function(frames) {
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
   * add a layer to the map. layer_id. Product list can be found at https://skywise.wdtinc.com/root/swarm-docs.html#product_list
   * @memberof SkywiseTiles
   * @param {String} [layer_id]  identifier of the layer to be added. must be unique
   * @param {layerOption} options    object defining options for rendering the layer
   */
  this.add = function add(layer_id, options) {
    if (active_layers[layer_id]) {
        return Promise.reject(new Error('Product already added to map'));
    }
    var layer_style = (options && options.style) || 'default';
    var product = {
        layer_id: layer_id,
        style: layer_style
    };
    return valid_frames(product, skywise_app_id, skywise_app_key).then(function(frames) {
      var current_frame_index = get_current_frame_index(frames);
      var tilelayer = renderer({
        style: layer_style,
        source_id: layer_id + '-' + frames[current_frame_index] + '-source',
        layer_id: layer_id,
        frame: frames[current_frame_index]
      });
      if (!tilelayer) {
        return Promise.reject(new Error('Error Initializing Skywise.TileLayer'));
      }
      active_layers[layer_id] = {
        product: product,
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
   * remove a layer from the map
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
   * call valid frames and check if the current frame is current. If not, update layer to most recent frame.
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
   * For a given layer_id, update the current frame to the next available timestep.
   * If at the last timestep, will loop to the first
   *
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
   * For a given layer_id, update the current frame to the previous available timestep.
   * If at the first timestep, will loop to the last
   *
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
  this.opacity = function opacity(_op, layer_id) {
    if (!layer_id) {
      for (var id in active_layers) {
        active_layers[id].tilelayer.setOpacity(_op);
      }
    } else if (active_layers[layer_id]) {
      active_layers[layer_id].tilelayer.setOpacity(_op);
    } else {
      console.warn('layer_id not found');
    }
    return this;
  };
};
