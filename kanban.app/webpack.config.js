/*
    todo: index.html has not been copy to dist
          
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
         /* template of the entry html page*/
         new HtmlWebpackPlugin({
          template:'./src/index.html'
        }),
        /*copy all the static files*/
        new CopyWebpackPlugin([
          { from: 'src/static', to: 'static', toType: 'dir',force:true,debug:'debug'}
        ])
      ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
    port:3000
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
      }, 
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
      test: /\.(png|jp(e*)g|svg)$/,  
      use: [{
          loader: 'file-loader',
          options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'static/[hash]-[name].[ext]'
          } 
      }]
    }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
}