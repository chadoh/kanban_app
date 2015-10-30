import path from 'path'
import HtmlwebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import Clean from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import pkg from './package.json'

let TARGET = process.env.npm_lifecycle_event;
let ROOT_PATH = path.resolve(__dirname)
let APP_PATH = path.resolve(ROOT_PATH, 'app')
let BUILD_PATH = path.resolve(ROOT_PATH, 'build')

let common = {
  entry: APP_PATH,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: APP_PATH
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      loaders: [
        {
          test: /.css$/,
          loaders: ['style', 'css'],
          include: APP_PATH
        },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      app: APP_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    /* important! */
    output: {
      path: BUILD_PATH,
      filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: APP_PATH
        },
      ]
    },
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': "'production'"
        }
      })
    ]
  })
}
