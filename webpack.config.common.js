const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: { poll: true },
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { fix: true },
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: [
          /\.(png|svg|jpg|gif)$/,
          /\.(woff|woff2|eot|ttf|otf)$/,
          path.join(__dirname, 'client/index.html'),
          path.join(__dirname, 'client/favicon.ico'),
          // path.join(__dirname, 'api/controllers/*'),
          // path.join(__dirname, 'api/models/*'),
          // path.join(__dirname, 'api/server.js'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        }],
      },
      // {
      //   test: [
      //     path.join(__dirname, 'src/CNAME'),
      //     path.join(__dirname, 'src/.surgeignore'),
      //   ],
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[path][name]',
      //     },
      //   }],
      // },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Client: path.resolve(__dirname, './client/'),
      Stylesheets: path.resolve(__dirname, './client/css/'),
      Components: path.resolve(__dirname, './client/components'),
      // Scripts: path.resolve(__dirname, 'src/scripts/'),
      // Settings: path.resolve(__dirname, './src/components/settings'),
      // Events: path.resolve(__dirname, './src/scripts/events'),
      // Images: path.resolve(__dirname, './src/assets/images/'),
      // Json: path.resolve(__dirname, './src/assets/json/'),
    },
  },
};
