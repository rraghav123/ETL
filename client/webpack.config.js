const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        pathRewrite: {'^/api' : ''},
        secure: false,
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        loader: ["style-loader", "css-loader", "sass-loader"],
        test: /\.(scss|css)$/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
  ]
};