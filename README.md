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

`npm run start`

Examples can be found in the `examples` directory.

Add your own keys to the `examples/keys.js` file:

-   Skywise Keys: <https://skywise.wdtinc.com>

-   Google Maps Key: <https://developers.google.com/maps/documentation/javascript/get-api-key>

-   Mapbox Auth Token: <https://www.mapbox.com>

# Interface


## SkywiseTiles

**Parameters**

-   `a` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** the main map object
-   `b` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Skywise app_id
-   `c` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** Skywise app_key
-   `d` **\[Class]** the renderer to use, found in renderers directory

## add

add a layer to the map. layer_id. Product list can be found at <https://skywise.wdtinc.com/root/swarm-docs.html#product_list>

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer to be added. must be unique
-   `options` **layerOption** object defining options for rendering the layer

## remove

remove a layer from the map

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this**

## refresh

call valid frames and check if the current frame is current. If not, update layer to most recent frame.

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this**

## next

For a given layer_id, update the current frame to the next available timestep.
If at the last timestep, will loop to the first

**Parameters**

-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this**

## previous

For a given layer_id, update the current frame to the previous available timestep.
If at the first timestep, will loop to the last

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
-   `_op`  
-   `layer_id` **\[[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** identifier of the layer. If null, iterates through all layers (optional, default `null`)

Returns **this**
