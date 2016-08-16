'use strict';
require('whatwg-fetch');
var fetch_utils = require('./fetch-utils');
var tilejson = require('./tile-json');
var consts = require('./consts');

/**
 * get_valid_frames
 * @private
 * @param  {[String]}   layer_id  id of the product to fetch valid frames
 * @param  {[String]}   app_id   3scale application id
 * @param  {[String]}   app_key  3scale application key
 * @returns {[Promise]} throws error if rejected. Returns Array of valid frames if resolved.
 */
module.exports = function get_valid_frames(product, app_id, app_key) {
  var skywise_url = [
    consts.domain,
    'swarmweb',
    'valid_frames?product=' + product.layer_id + '&format=JSON'
  ].join('/');
  var skywise_opts = {
    'headers': {
      'app_id': app_id,
      'app_key': app_key
    }
  };
  return fetch(skywise_url, skywise_opts).then(fetch_utils.checkStatus).then(fetch_utils.parseJSON).then(function (res) {
    return res[product.layer_id].map(function (frame) {
      return tilejson(product, frame);
    });
  });
};
