const path = require('path');
const outDir = path.resolve(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Tasky',
            filename: "index.html",
            publicPath: './'
        }),
        new FaviconsWebpackPlugin('./src/favicon.png')
      ],
  output: {
    filename: '[name].bundle.js',
    path: outDir,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
     {
       test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
     },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};