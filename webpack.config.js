/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV } = process.env;

const docsPath = NODE_ENV === 'development' ? './assets' : './';

module.exports = () => {
  return {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'docs'),
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, ''),
      publicPath: '/'
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: 'bundle.js',
      publicPath: './'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlwebpackPlugin({
        title: 'Responsive Nav',
        filename: 'index.html',
        template: 'docs/index.html',
        inject: true,
        hash: true,
        path: docsPath
      })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(less|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    }
  };
};
