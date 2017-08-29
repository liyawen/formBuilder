const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    index: './src/static/index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/chunk/[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env', 'stage-0'],
          plugins: ['antd', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less?relativeUrls'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  babel: {
    presets: ['es2015']
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.vue'],
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"production"'
  //     }
  //   })
  ],
  devtool: '#inline-source-map'
}