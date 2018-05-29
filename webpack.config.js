const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


//const DEV = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: "source-map",
  output: {
    //change the output directory
    path: path.resolve(__dirname, "www"), // string
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
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
    new HtmlWebPackPlugin({
      template: "src/index.php",
      filename: "./index.php"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new BrowserSyncPlugin({
      notify: false,
      host: 'localhost',
      port: 4000,
      logLevel: 'silent',
      files: ['./*.php'],
      proxy: 'http://localhost:8088/',
    }),
  ].filter(Boolean),
};