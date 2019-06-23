// webpack config
'use strict'

const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const DEV_MODE = process.env.NODE_ENV !== 'production'
const ANALYZER = Boolean(process.env.ANALYZER)
const PUBLIC_DIRNAME = 'public'
const OUT_DIRNAME = 'dist'

module.exports = {
  target: 'web',
  mode: DEV_MODE ? 'development' : 'production',
  devtool: DEV_MODE ? 'eval-source-map' : 'source-map',
  entry: {
    bundle: path.join(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.join(__dirname, OUT_DIRNAME),
    filename: DEV_MODE ? '[name].js' : '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.join(__dirname, './babel.config.js'),
        },
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          { loader: ExtractCssChunksPlugin.loader, options: { hot: DEV_MODE } },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(ico|gif|jpg|png)$/,
        loader: 'file-loader',
        options: {
          name: DEV_MODE ? '[name].[ext]' : 'images/[name].[contenthash].[ext]',
        },
      },
      // {
      //   test: /\.png$/,
      //   loader: 'sharp-loader',
      //   options: {
      //     presets: {
      //       thumbnail: {
      //         format: ['webp', 'png'],
      //         width: 512,
      //         quality: 60,
      //       },
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new ExtractCssChunksPlugin({
      filename: DEV_MODE ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: DEV_MODE ? '[id].css' : '[id].[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: ANALYZER ? 'server' : 'disabled',
      openAnalyzer: ANALYZER,
    }),
    new HtmlPlugin({ template: path.join(__dirname, './src/prerender.tsx') }),
    new ScriptExtHtmlPlugin({ defaultAttribute: 'async' }),
    new CopyPlugin([{ from: PUBLIC_DIRNAME }]),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, OUT_DIRNAME),
    historyApiFallback: true,
    // disableHostCheck: true,
    host: '0.0.0.0',
  },
}
