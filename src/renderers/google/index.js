/* global google */
"use strict";
var skywise_imagemaptype = require('./ImageMapType.Skywise');

var addCopyright = function addCopyright(map) {
  var control = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
  if (control.getLength() > 0) {
    control.pop();
  }


  var outerdiv = document.createElement("div");
  outerdiv.innerHTML = "<div class=\"gmnoprint\" style=\"z-index: 1000001; bottom: 0px;\">" +
    "<div draggable=\"false\" class=\"gm-style-cc\" style=\"-webkit-user-select: none; height: 14px; line-height: 14px;\">" +
    "<div style=\"opacity: 0.7; width: 100%; height: 100%; position: absolute;\">" +
    "<div style=\"width: 1px;\"></div>" +
    "<div style=\"width: auto; height: 100%; margin-left: 1px; background-color: rgb(245, 245, 245);\">" +
    "</div>" +
    "</div>" +
    "<div style=\"position: relative; padding-right: 6px; padding-left: 6px; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;\">" +
    "<a href=\"http://wdtinc.com\" target=\"_new\" style=\"color: rgb(68, 68, 68); text-decoration: none; cursor: pointer;\">Weather Data &copy; WDT, Inc.</a>" +
    "</div>" +
    "</div>" +
    "</div>";

  control.push(outerdiv);
};

function getFrameIndex(map, product_id) {
  var returnIndex = -1;
  map.overlayMapTypes.forEach(function(element, index) {
    if (element.name === product_id) {
      returnIndex = index;
    }
  });
  return returnIndex;
}

function refreshLayer(options) {
  var frame_index = getFrameIndex(options.map, options.product_id);
  var maptype = options.map.overlayMapTypes.removeAt(frame_index);
  options.map.overlayMapTypes.insertAt(frame_index, maptype);
}

var GoogleRenderer = function(opts) {
  var options = opts;
  var maptype = skywise_imagemaptype(options);
  this.addTo = function addTo(map) {
    Object.assign(options, {
      map: map
    });
    addCopyright(map);
    map.overlayMapTypes.push(maptype);
  };
  this.removeFrom = function removeFrom(map) {
    Object.assign(options, {
      map: null
    });
    var index = getFrameIndex(map, options.product_id);
    map.overlayMapTypes.removeAt(index);
  };
  this.setFrame = function setFrame(frame) {
    Object.assign(options, {
      frame: frame
    });
    maptype.setFrame(frame);
    refreshLayer(options);
  };
  this.setStyle = function setStyle(style) {
    Object.assign(options, {
      style: style
    });
    maptype.setStyle(style);
    refreshLayer(options);
  };
};

module.exports = function(options) {
  if (!options || !options.product_id || !options.frame || !options.style) {
    console.error("product_id, frame, and style in options object are required");
    return null;
  }
  return new GoogleRenderer(options);
};
