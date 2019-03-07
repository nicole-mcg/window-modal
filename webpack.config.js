const path = require("path");
const fs = require("fs")

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (inlineEnv={}) => {
  const env = {
    ...process.env,
    ...inlineEnv,
  }

  env.NODE_ENV = env.NODE_ENV || "production"
  const mode = env.NODE_ENV === "production" ? "production" : "development";
  let envFilePath = "env/prod-env.ts";
  if (env.NODE_ENV === "development") {
    envFilePath = "env/dev-env.ts"
  } else if(env.NODE_ENV === "test") {
    envFilePath = "env/test-env.ts"
  }

  // Copy the environment file
  fs.copyFile(envFilePath, "./env.ts", (err) => {
    if (err) throw err;
  });
  

  return {
    entry: "",
    entry: {
      index: './src/index.tsx',
    },
    devtool: "inline-source-map",
    mode: mode,
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
      extensions: [.ts", ".js"],
      plugins: [
        new TsconfigPathsPlugin(),
      ]
    },
    output: {
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
      new HtmlWebpackPlugin({
        template: "templates/index.html",
        favicon: "assets/favicon.ico",
        hash: true,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    }
  };
}
