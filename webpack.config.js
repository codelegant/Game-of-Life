var path = require('path');
var webpack = require("webpack");
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './public/js/entry'
  ],
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'bundle.js',//[name].js
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],// short for babel-loader
        exclude: /node_modules/,
        include: path.join(__dirname + '/public/js/')
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
        NODE_ENV: JSON.stringify(true)// production | true
        // NODE_ENV: 'development'// production | true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './',//where index.html is
    publicPath: '/assets/',//虚拟目录，脚本所在文件夹，与output.publicPath一致，与页面使用一致
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 3000,
    stats: {colors: true},
    headers: {'Access-Control-Allow-Origin': '*'}
  }
};