const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 2022,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-decorators',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        },
        include: [
          path.join(__dirname, '../src'),
          /\/node_modules\/lit-element/
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      }
    ]
  }
}