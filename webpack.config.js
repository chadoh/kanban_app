var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')
var TEST_PATH = path.resolve(ROOT_PATH, 'test')

process.env.BABEL_ENV = TARGET;

var config = {
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
  config = merge(config, {
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

if(TARGET === 'test' || TARGET === 'tdd') {
  config = merge(config, {
    entry: {}, // karma will set this
    output: {}, // karma will set this
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        'app': APP_PATH
      }
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['isparta-instrumenter'],
          include: APP_PATH
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: TEST_PATH
        }
      ]
    }
  })
}

if (TARGET === 'build' || TARGET === 'stats') {
  config = merge(config, {
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

module.exports = config;
