'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const BroccoliDebug = require('broccoli-debug');
const fastbootTransform = require('fastboot-transform');
const path = require('path');

// inspired upon https://github.com/canufeel/ember-leaflet-marker-cluster/blob/2d88fd054529ccee834dc76f2a3d5082531c8804/index.js
module.exports = {
  name: require('./package').name,

  included(app) {
    let vendor = this.treePaths.vendor;
    let dir = `${vendor}/leaflet-iiif`;

    // Main modules
    app.import(`${dir}/leaflet-iiif.js`);

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    let debugTree = BroccoliDebug.buildDebugCallback(this.name),
      trees = [];

    if (vendorTree) {
      trees.push(debugTree(vendorTree, 'vendorTree'));
    }

    let js = fastbootTransform(
      moduleToFunnel('leaflet-iiif', {
        include: ['*.js'],
        destDir: 'leaflet-iiif',
      })
    );

    trees.push(debugTree(js, 'leaflet-iiif:js'));

    return debugTree(mergeTrees(trees), 'mergedVendorTrees');
  },
};

function moduleToFunnel(moduleName, opts) {
  opts = opts || { destDir: moduleName };
  return new Funnel(resolveModulePath(moduleName), opts);
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}
