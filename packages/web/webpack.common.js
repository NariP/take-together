const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker
              transpileOnly: true,
            },
          },
        ],
        exclude: /types/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      }, // file-loader 대신 사용
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx'], // 앞에서부터 순서대로 해석
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: { ignore: '**/index.html' },
        },
      ],
    }),
  ],
  output: {
    filename: 'main.[hash].bundle.js',
    assetModuleFilename: 'static/images/[hash][ext][query]',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
};
// webpack 공통 설정
