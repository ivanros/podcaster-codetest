const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src', 'index.tsx'),
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    port: 3042,
    historyApiFallback: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /.*\.(gif|png|jp(e*)g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 21000,
              name: 'images/[name]_[fullhash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]', outputPath: 'fonts/' },
      },
      // Vendor CSS loader
      // This is necessary to pack third party libraries like antd
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../node_modules'),
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
