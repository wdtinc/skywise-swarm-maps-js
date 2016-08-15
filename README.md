# Skywise (SWARM) Maps

This is a mapping library for SWARM Tiles, it is built based on the Documentation found at: <https://skywise.wdtinc.com/root/swarm-docs.html>, it features mapping interfaces to the following libraries:

-   [Mapbox.js](https://www.mapbox.com/mapbox.js)
-   [Leaflet](http://leafletjs.com/)
-   [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/)
-   [Google Maps](https://developers.google.com/maps/documentation/javascript/)

# Usage

Ensure [node.js](https://nodejs.org/en/download/) and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) is installed

run the following commands inside the project directory:

`npm install`

`npm run build`

Examples can be found in the `examples` directory.

# Interface

## activeLayer

Object representing a layer that is registered with plugin

**Parameters**

-   `frames`  

## SkywiseTiles

**Parameters**

-   `a` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** the main map object
-   `b` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** 3scale app_id
-   `c` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** 3scale app_key
-   `d` **\[type]** the renderer to use, found in renderers directory

## add

[addTile description]

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer to be added. must be unique
-   `options` **layerOption** [description]

## remove

[removeTile description]

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## refresh

[refresh description]

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## next

[goToNextFrame description]

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## previous

[goToPreviousFrame description]

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## get

return the layer

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, returns active_layer object (optional, default `null`)

Returns **([activeLayer](#activelayer) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[activeLayer](#activelayer)>)** returns either one active

## hide

set the opacity to 0 of a given tile layer identified by layer_id

this can be used in conjuction with [show](#show)

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## show

set the opacity to the layer opacity of a given tile layer identified by layer_id

this can be used in conjuction with [hide](#hide)

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## opacity

set opacity of a given tile layer identified by layer_id

**Parameters**

-   `opacity` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value between 0 and 1
-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this** 

## valid-frames

get_valid_frames

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** id of the product to fetch valid frames
-   `app_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** 3scale application id
-   `app_key` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** 3scale application key
-   `system` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** System that serves tiles
-   `product`  

## validFramesCallback

valid_frames_callback

**Parameters**

-   `error` **?[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** message from http request
-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** data back (in JSON) from http request
