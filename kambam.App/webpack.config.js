/*
    todo: index.html has not been copy to dist
          
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin();
const config = {
    plugins: [
      new CopyWebpackPlugin([
          { from: 'src/index.html', to: 'dest', toType: 'file',force:true,debug:'debug'},
          { from: 'src/img', to: 'dest', toType: 'dir',force:true,debug:'debug'}])
    ]
  }
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  plugins: [
         new HtmlWebpackPlugin({
          template:'./src/index.html'
        })
      ],
  devServer: {
    contentBase: "./dist",
    hot: true
    },
  mode:"none",
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
}