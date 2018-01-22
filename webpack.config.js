const path = require('path')

const sourcePath = path.resolve(__dirname, 'source')

module.exports = {
  entry: sourcePath,
  resolve: {alias: {'-': sourcePath}},
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {presets: [['env', {modules: false}], 'react']},
      },
    ],
  },
  devServer: {port: 4000, contentBase: sourcePath},
}
