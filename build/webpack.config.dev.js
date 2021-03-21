const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    open: true,
    hot: true,
    host: "localhost",
    compress: true,
    port: 8085,
    historyApiFallback: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:62938/',
    //     //pathRewrite: { '^/api': '' }
    //   }
    // }
  },
  context: path.join(__dirname, '../'),
  entry: {
    index: './src/index.tsx'
  },
  output: {
    filename: "bundle.js",
    publicPath: '/'
  },
  devtool: "source-map",
  resolve: {
    //modules: ["node_modules",path.join(__dirname, "../src")],
    extensions: [".ts", ".tsx", ".js", ".css"],
    alias: {
      '@http': path.join(__dirname, '../src/common/utils/ajax.ts'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@common': path.resolve(__dirname, '../src/common'),
      '@source': path.resolve(__dirname, '../src/source'),
      '@pipe': path.resolve(__dirname, '../src/pipe'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@router': path.resolve(__dirname, '../src/router')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "static/images/[name].[ext]"
        }
      }

    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: './src/index.html'
    })
  ],

  stats: 'errors-only'
}