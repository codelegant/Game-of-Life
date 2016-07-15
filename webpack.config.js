var path = require('path');
var webpack = require("webpack");
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './public/js/entry.js'
  ],
  devtool: 'eval',
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'bundle.js'//[name].js
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],// short for babel-loader
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'// right-to-left and the loader are separated by '!'. Short for style-loader!css-loader
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: './'
  }
};