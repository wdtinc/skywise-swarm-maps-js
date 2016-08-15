'use strict';
module.exports = {
  /**
   * if the response status is in the 200's, all good!
   * @private
   * @param  {[Object]} response a fetch response object
   * @return {[Object]}          the fetch response object
   * @throws {[Error]} if response status is outside of 200 range
   */
  checkStatus: function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },
  /**
   * call response.json from fetch object
   * @private
   * @param  {[Object]} response a fetch response object
   * @return {[Object]}          json object of the response
   */
  parseJSON: function parseJSON(response) {
    return response.json();
  }
};
