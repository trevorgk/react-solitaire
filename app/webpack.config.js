const webpack = require("webpack");
const {resolve, join} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/client.ts',
  output: {
    filename: 'bundle.[name].js',
    path: resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: [
            resolve(__dirname, "./src/index.html"),
          ],
        },
        {
            enforce: 'pre',
            test: /\.tsx?$/,
            loader: 'tslint-loader',
            include: [
              resolve(__dirname, "./src"),
            ],
        },
        {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            include: [
              resolve(__dirname, "./src"),
            ],
        }
    ]
  },
  devtool: 'sourcemap',
  devServer: {
    contentBase: join(__dirname, "../dist"),
    compress: true,
    port: 8080
  },
  plugins: [
        // new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            // title: METADATA.title,
            chunksSortMode: 'dependency',
            // metadata: METADATA,
            // inject: 'head'
        }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' }
        ]),

        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendors'] // Specify the common bundle's name.
        // }),
        // new BundleAnalyzerPlugin()
    ]
};
