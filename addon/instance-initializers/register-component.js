export function initialize(appInstance) {
  let emberLeafletService = appInstance.lookup('service:ember-leaflet');

  if (emberLeafletService) {
    emberLeafletService.registerComponent('iiif-tile-layer', {
      as: 'iiif-tile',
    });
  }
}

export default {
  initialize,
};
