const path = require("path");
const fs = require("fs")

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: "",
  entry: {
    index: './src/index.ts',
  },
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
            loader: MiniCssExtractPlugin.loader,
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
    library: "FloatingWindow",
    libraryExport: "FloatingWindow",
    libraryTarget: 'umd',
    auxiliaryComment: 'Test Comment',
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};