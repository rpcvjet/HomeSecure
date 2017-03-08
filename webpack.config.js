'use strict';

require('dotenv').config();

const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: `${__dirname}/app/entry.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new HtmlPlugin({template: `${__dirname}/app/index.html`}),
    new ExtractText('bundle.css'),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.scss$/,
        loader: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|jpeg|bmp|tiff|gif|png)$/,
        loader: 'url-loader?limit=10000&name=image/[hash].[ext]',
      },
      {
        test: /\.(woff|ttf|svg|eot).*/,
        loader: 'url-loader?limit=10000&name=font/[name].[ext]',
      },
    ],
  },
};
