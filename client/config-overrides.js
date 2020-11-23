/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const path = require('path');

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@queries': path.resolve(__dirname, 'src/queries'),
    '@reducers': path.resolve(__dirname, 'src/reducers'),
    '@sagas': path.resolve(__dirname, 'src/sagas'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@theme': path.resolve(__dirname, 'src/theme'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@images': path.resolve(__dirname, 'src/images'),
    '@utils' : path.resolve(__dirname, 'src/utils'),
  }),
);
