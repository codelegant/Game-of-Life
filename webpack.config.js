var path = require('path');
var webpack = require("webpack");
var process = require('process');
var PROD = JSON.parse(process.env.PROD_ENV || 0);
process.argv
module.exports = {
  entry: [
    './public/js/entry.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname + '/public/'),
    filename: PROD ? 'bundle.min.js' : 'bundle.js'//[name].js
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')// production | true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ] : []
};