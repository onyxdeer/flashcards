const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://0.0.0.0:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    'babel-polyfill',

    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'public/assets/bundles'),

    publicPath: 'http://127.0.0.1:8080/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'client'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server
    port: 8080,
    host: '0.0.0.0',

    contentBase: resolve(__dirname, 'public/assets/bundles'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      { 
        test: /\.jsx$/, 
        use: [
         'babel-loader', 
        ], 
        exclude: /node_modules/ 
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};







//ORIGINAL FILE
/*
const path = require('path');
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public/assets/bundles'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devtool: "source-map"
}
*/

