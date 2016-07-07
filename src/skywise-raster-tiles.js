var validFrames = require('./utils/valid-frames');
var products = require('./utils/products');

module.exports  = function SkywiseRasterTiles(a, b, c, d) {
  'use strict';
  var map = a
  var app_id = b;
  var app_key = c;
  var renderer = d;
  var active_products = {};

  this.addTile = function addTile(product_id) {
    if(products.hasOwnProperty(product_id) && !active_products[product_id]) {
      return validFrames(product_id, app_id, app_key).then(function (frames) {
        var tilelayer = renderer({
          product_id: product_id,
          frame: frames[product_id][0]
        });
        if (!tilelayer) {
          return Promise.reject(new Error('Error Initializing Skywise.TileLayer'));
        }
        active_products[product_id] = {
          frames: frames,
          current_frame: frames[0],
          refresh_interval: products[product_id],
          tilelayer: tilelayer
        };
        active_products[product_id].tilelayer.addTo(map);
      }).catch(function (err) {
        return Promise.reject(err);
      });
    } else if (!products.hasOwnProperty(product_id)){
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

  };
};
