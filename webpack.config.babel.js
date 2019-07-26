import os from 'os';
import Path from 'path';
import Webpack from 'webpack';
import HappyPack from 'happypack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import PackageJson from './package.json';

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  output: {
    filename: '[name].[hash].js', // [name].[hash].bundle.js
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      },
      // {
      //   test: /\.(less|css)$/,
      //   use: [
      //     {
      //       loader: 'style-loader' // create style nodes from JS strings
      //     },
      //     {
      //       loader: 'css-loader' // translates CSS into CommonJS
      //     },
      //     {
      //       loader: 'less-loader' // compiles Less to CSS
      //     }
      //   ]
      // }
      {
        test: /\.(less|css)$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=happycssloader'
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', Path.resolve(__dirname, 'web_modules')]
  },
  plugins: [
    new HappyPack({
      id: 'happycssloader',
      threadPool: happyThreadPool,
      loaders: ['css-loader!less-loader'],
      verbose: true
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './favicon.ico'
    }),
    new Webpack.DefinePlugin({
      __DEV__: true,
      VERSION: JSON.stringify(PackageJson.version)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
      chunkFilename: '[id].css'
    })
  ]
};
