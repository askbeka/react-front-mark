'use strict';

const 
    webpack = require('webpack'),
    path = require('path'),
    env = require('yargs').argv.mode,
    libraryName = require('./package.json').name, 
    plugins = []; 

let outputFile;


if (env === 'build') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, dead_code: true}));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: path.join(__dirname, `src/${libraryName}.js`),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.js$/,
        loader: "eslint",
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins,
  externals: {
      'react': 'react',
      'front-markjs': 'front-markjs'
  }
};

module.exports = config;