var skywise_imagemaptype = require('./ImageMapType.Skywise');

var toggleCopy = function toggleCopy(map) {
  var control = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
  console.log(control.getLength());
  if (control.getLength() > 0) control.pop();


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

var GoogleRenderer = function (opts) {
  'use strict';
  var options = opts;
  var maptype = skywise_imagemaptype(options);
   this.addTo = function addTo (map) {
     toggleCopy(map);
     map.overlayMapTypes.push(maptype);
   };
   this.removeFrom = function removeFrom (map) {
     map.overlayMapTypes.forEach(function (element, index) {
      if (element.name === options.product_id) {
        map.overlayMapTypes.removeAt(index);
      }
    });
   }
}

module.exports = function (options) {
  if(!options || !options.product_id || !options.frame) {
    console.error("product_id and frame in options object is required");
    return null;
  }
  options.style = options.style || 'default';
  return new GoogleRenderer(options);
}
