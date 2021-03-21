const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: 'index.tsx'
  },
  output: {
    filename: "bundle.js",
    path: path.resolve('./dist')
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css",".jsx"],
    alias: {
      '@http': path.join(__dirname, 'src/common/utils/ajax.ts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@common': path.resolve(__dirname, 'src/common')
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
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(__dirname, '../tsconfig.json')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dist/static/dll/core.manifest.json")
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html'
    })
  ]
}