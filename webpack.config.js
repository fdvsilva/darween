/*
./webpack.config.js
(Lifted from https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel)
*/
const path = require('path');

/* Inserts .js file into index.html that enables to load react-related code */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/stylesheets/main.scss'],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        //exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(['css-loader','sass-loader'])
      },
      // enables webpack to laod images without parsing them
      // as if they were javascript files.
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
      }
    ]
  },
  plugins:  [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin("app.css")
  ]
}
