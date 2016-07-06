var path       = require('path');
var webpack    = require("webpack");
module.exports = {
  entry  : [
    './public/js/entry.js'
  ],
  output : {
    path    : path.join(__dirname + '/public/'),
    filename: 'bundle.js'
  },
  module : {
    loaders: [
      {
        test   : /\.jsx?$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ["react", "es2015", "stage-0"]
        }

      },
      {
        test  : /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};