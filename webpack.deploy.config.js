var path = require('path');
var webpack = require("webpack");
module.exports = {
  entry: [
    './public/js/entry.js'
  ],
  // devtool: 'eval',
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'bundle.min.js'//[name].js
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',// short for babel-loader
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-0"]
        }

      },
      {
        test: /\.css$/,
        loader: 'style!css'// right-to-left and the loader are separated by '!'. Short for style-loader!css-loader
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')// production | true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],

};