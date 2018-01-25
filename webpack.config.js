const path = require('path')
const webpack = require('webpack')

const sourcePath = path.resolve(__dirname, 'source')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    path.resolve(sourcePath, 'index.js'),
  ],
  resolve: {alias: {'~': sourcePath}},
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {presets: [['env', {modules: false}], 'react']},
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {hot: true, inline: true, port: 4000, contentBase: sourcePath},
}
