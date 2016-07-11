'use strict';
require('whatwg-fetch');
var fetch_utils = require('./fetch-utils');
var consts = require('./consts');

/**
 * get_valid_frames
 * @param  {[String]}   product_id  id of the product to fetch valid frames
 * @param  {[String]}   app_id   3scale application id
 * @param  {[String]}   app_key  3scale application key
 * @param  {[String]}   system System that serves tiles
 */
module.exports = function get_valid_frames(product_id, app_id, app_key) {
  var skywise_url = [
    consts.domain,
    'swarmweb',
    'valid_frames?product=' + product_id + '&format=JSON'
  ].join('/');
  var skywise_opts = {
    'headers': {
      'app_id': app_id,
      'app_key': app_key
    }
  };
  return fetch(skywise_url, skywise_opts).then(fetch_utils.checkStatus).then(fetch_utils.parseJSON);
};

/**
 * valid_frames_callback
 * @callback validFramesCallback
 * @param {?Object} error message from http request
 * @param {Object} data data back (in JSON) from http request
 */
