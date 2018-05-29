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
        test: /\.(php|html)$/,
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

      host: 'localhost',
      port: 4000,
      proxy: 'http://localhost:8088/',
    },
    // plugin options
    {
      /* notify: false, */
      /* logLevel: 'silent', */
      files: ['./*.php', '*./*.css']
    }),
  ].filter(Boolean),
};