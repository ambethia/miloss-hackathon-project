'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const ROOT_PATH = path.resolve(__dirname);
const CLIENT_PATH = path.resolve(ROOT_PATH, 'client');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

let config = {
  common: {
    entry: [
      CLIENT_PATH
    ],
    output: {
      path: BUILD_PATH
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(CLIENT_PATH, 'index.tpl.html'),
        inject: 'body',
        filename: 'index.html'
      }),
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': ENVIRONMENT
      // })
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        include: [CLIENT_PATH],
        loader: 'babel'
      }, {
        test: /\.less$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less'
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },

  development: {
    devtool: 'eval-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    output: {
      filename: '[name].js',
      publicPath: '/'
    }
  },

  production: {
    output: {
      filename: '[name]-[hash].min.js'
    },
    plugins: [
      new ExtractTextPlugin('[name]-[hash].min.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          screw_ie8: true
        }
      })
    ],
    postcss: [
      require('autoprefixer')
    ]
  }
}

module.exports = merge(config.common, config[ENVIRONMENT]);
