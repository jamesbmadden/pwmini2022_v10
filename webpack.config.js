const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
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
        exclude: /node_modules\/(?!(lit-html||lit-element))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              useBuiltIns: 'entry',
              targets: {
                chrome: "54",
                firefox: "63",
                safari: "10.1"
              }
            }]],
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
      },
      {
        from: path.resolve('node_modules/@webcomponents/webcomponentsjs/bundles/**.*'),
        to: path.resolve(__dirname, 'dist/wc/bundles'),
        flatten: true
      }
    ])
  ]
}

module.exports = [
  config,
  
  {
    ...config,
    entry: './src/legacy.js',
    output: {
      filename: 'legacy.main.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(lit-html||lit-element))/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                useBuiltIns: 'entry',
                targets: {
                  ie: '11'
                }
              }]],
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
  }
]