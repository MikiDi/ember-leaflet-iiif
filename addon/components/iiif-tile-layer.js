import TileLayer from 'ember-leaflet/components/tile-layer';

/**
 *
 * @class IiifTileLayer
 * @extends TileLayer
 */
export default class IiifTileLayer extends TileLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     *
     * @argument tileFormat
     * @type {String}
     */
    'tileFormat',

    /**
     *
     * @argument tileSize
     * @type {Number}
     */
    'tileSize',

    /**
     *
     * @argument fitBounds
     * @type {Boolean}
     */
    'fitBounds',

    /**
     *
     * @argument setMaxBounds
     * @type {Boolean}
     */
    'setMaxBounds',

    /**
     *
     * @argument quality
     * @type {String}
     */
    'quality',
  ];

  createLayer() {
    return this.L.tileLayer.iiif(...this.requiredOptions, this.options);
  }
}
