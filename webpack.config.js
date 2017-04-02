var combineLoaders = require('webpack-combine-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function() {
  return {
    entry: {
      bundle: [
        './client/app.js'
      ]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: ['react-hot-loader', 'jsx-loader', 'babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.sass$/,
          loader: combineLoaders([
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ])
        }
      ],
    },
    output: {
      path: __dirname + '/public',
      filename: '[name].js'
    }
  };
}
