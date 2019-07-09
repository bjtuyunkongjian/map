import Path from 'path';
import PackageJson from './package.json';

export default {
  mode: 'development',
  entry: __dirname + '/src/map/index.api.js',
  output: {
    path: __dirname + '/build-api',
    filename: `ty-map.${PackageJson.version}.js` // [name].[hash].bundle.js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules', Path.resolve(__dirname, 'web_modules')]
  }
};
