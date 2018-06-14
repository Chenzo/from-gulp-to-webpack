const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    'pageone': [
      './src/js/pageone.js',
      './src/_scss/main.scss'
      ],
    'test': './src/js/test.js'
  },
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "www"), // string
    filename: 'js/[name].js',
    sourceMapFilename: 'js/maps/[name].js.map'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
            {
            loader: "css-loader",
            options: {
                minimize: true
            }
            },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    })
  ]
};