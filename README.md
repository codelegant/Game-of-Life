# 说明文档
## webpack 配置注意事项
- 使用 webpack-dev-server 与 react-hot-loader 启动热加载时，应该指定`publicPath`，并且不能与`path`相同。
页面加载的脚本路径也要修改为`publicPath`
``` javascript
//webpack.config.js
  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devServer: {
    publicPath: '/assets/'
  }
```
``` html
<!--index.html-->
<body>
  <div id="container"></div>
  <script src="./assets/bundle.js"></script>
</body>
```
- `entry`中的服务器路径与`devServer`的配置相对应
``` javascript
//webpack.config.js
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
  }
```
- `only-dev-server`与`dev-server`的区别
简单来讲，在某些需要刷新浏览器的情况下，`only-dev-server`提示刷新，而`dev-server`自动帮你刷新
``` javascript
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './public/js/entry'
  ],
```
## webpack 构建
- 开发调试的构建使用 `npm run dev`，生产环境的构建使用`npm run deploy`
