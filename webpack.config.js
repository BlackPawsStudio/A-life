const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resourse'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'src/index.html',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './src/index.css',
    }),
    new CopyPlugin({
      patterns: [
        {from: './src/public'}
      ]
    }),
  ],
};