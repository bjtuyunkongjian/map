import Path from 'path';
import Webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import PackageJson from './package.json';

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader' // create style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', Path.resolve(__dirname, 'web_modules')]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './favicon.ico'
    }),
    new Webpack.DefinePlugin({
      __DEV__: true,
      VERSION: JSON.stringify(PackageJson.version)
    })
  ]
};
