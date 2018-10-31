import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.(less|css)$/,
      use: [{
        loader: "style-loader" // create style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
      }]
    }]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'web_modules')]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};