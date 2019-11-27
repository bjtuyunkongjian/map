import Path from 'path';
import Package from './package.json';

const city = 'sd';

export default {
  mode: 'development',
  entry: Path.resolve(__dirname, `src/map-${city}/api.index.production.js`),
  output: {
    filename: `ty-map-production.${Package.version}.js`,
    path: Path.resolve(__dirname, `build-api-${city}`)
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
