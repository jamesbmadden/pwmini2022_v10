const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        exclude: /node_modules\/(?!(lit-html))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader'
        }]
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve('node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: path.resolve(__dirname, 'dist/wc'),
        flatten: true
      }
    ])
  ]
}