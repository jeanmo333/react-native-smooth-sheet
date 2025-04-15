// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);



const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const libraryPath = path.resolve(__dirname, '../../'); // ruta hacia la raíz de la librería

const config = {
  resolver: {
    extraNodeModules: {
      'react-native-smooth-sheet': libraryPath,
    },
  },
  watchFolders: [libraryPath],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);






