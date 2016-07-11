/* global Promise */
'use strict';
require('es6-promise').polyfill();
require('es6-object-assign').polyfill();
var validFrames = require('./utils/valid-frames');
var products = require('./utils/products');

module.exports = function SkywiseRasterTiles(a, b, c, d, e) {
  var map = a;
  var app_id = b;
  var app_key = c;
  var renderer = d;
  var active_products = {};

  function refreshSingleProduct(product_id) {
    return validFrames(product_id, app_id, app_key).then(function(frames) {
      frames = frames[product_id];
      if (frames[frames.length - 1] !== active_products[product_id].current_frame) {
        active_products[product_id].current_frame = frames[frames.length - 1];
        active_products[product_id].frames = frames;
        active_products[product_id].tilelayer.setFrame(frames[frames.length - 1]);
        return product_id + ' refreshed';
      }
      return product_id + ' refresh not needed';
    });
  }


  this.addTile = function addTile(product_id, options) {
    var style = options && options.style ? options.style : 'default';
    if (products.hasOwnProperty(product_id) && !active_products[product_id]) {
      return validFrames(product_id, app_id, app_key).then(function(frames) {
        frames = frames[product_id];
        var tilelayer = renderer({
          product_id: products[product_id].id,
          frame: frames[frames.length - 1],
          style: style
        });
        if (!tilelayer) {
          return Promise.reject(new Error('Error Initializing Skywise.TileLayer'));
        }
        active_products[product_id] = {
          frames: frames,
          current_frame: frames[frames.length - 1],
          refresh_interval: products[product_id].refresh * 1000,
          tilelayer: tilelayer
        };
        active_products[product_id].tilelayer.addTo(map);
        if (active_products[product_id].refresh_interval) {
          active_products[product_id].refresh_interval_id = setInterval(function() {
            return refreshSingleProduct(product_id);
          }, active_products[product_id].refresh_interval);
        }
        return active_products[product_id];
      }).catch(function(err) {
        return Promise.reject(err);
      });
    } else if (!products.hasOwnProperty(product_id)) {
      return Promise.reject(new Error('Invalid product_id provided'));
    } else {
      return Promise.reject(new Error('Product already added to map'));
    }
  };

  this.removeTile = function removeTile(product_id) {
    active_products[product_id].tilelayer.removeFrom(map);
    delete active_products[product_id];
  };

  this.refresh = function refresh(product_id) {
    if (!product_id) {
      var refreshers = [];
      for (var id in active_products) {
        refreshers.push(refreshSingleProduct(id));
      }
      return Promise.all(refreshers);
    } else if (active_products[product_id]) {
      return refreshSingleProduct(product_id);
    } else {
      return Promise.reject(new Error('product_id not active'));
    }
  };

  this.setStyle = function setStyle(style, product_id) {
    if (active_products[product_id]) {
      return active_products[product_id].tilelayer.setStyle(style);
    } else {
      return 'product_id not active';
    }
  };

  this.getTileList = function getTileList() {
    console.log(active_products);
    return Object.keys(active_products);
  };

  this.getTileObject = function getTileObject(product_id) {
    if (active_products[product_id]) {
      return active_products[product_id];
    } else {
      return 'product_id not active';
    }
  };
};
