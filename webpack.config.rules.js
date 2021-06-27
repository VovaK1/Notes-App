const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const path = require('path');
const loader = require('sass-loader');


module.exports = function() {
  return [
    {
      test: /\.html/,
      exclude: /\.svg$/,
      use: 'html-loader'
    },
    {
      test: /\.hbs/,
      use: 'handlebars-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/, 
      use: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [ 
        { 
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev
          }
        }, 
        'css-loader'
      ]
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          }
        },
        'css-loader',
        'sass-loader'
      ],
    },
    // {
    //   test: /\.svg$/,
    //   type: 'asset/inline',
    //   use: 'svgo-loader'
    // },
  ]
}