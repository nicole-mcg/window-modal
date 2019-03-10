const path = require("path");
const fs = require("fs")

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "",
  entry: {
    index: './src/index.ts',
  },
  target: 'web',
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
          'source-map-loader',
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin(),
    ]
  },
  output: {
    library: "WindowModal",
    libraryExport: "WindowModal",
    libraryTarget: 'umd',
    auxiliaryComment: 'Test Comment',
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "test/public/index.html",
      // favicon: "assets/favicon.ico",
      hash: true,
    }),
  ],
};