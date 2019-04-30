// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;
const { HashedModuleIdsPlugin } = require('webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

//sitemap paths
const paths = [
  '/',
  '/experience',
  '/info',
  '/locator',
  '/products'
];

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/client.jsx')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // new HtmlWebpackPlugin({
    //   template: 'app/info.html',
    //   filename: 'info.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    //   inject: true,
    // }),

    // new HtmlWebpackPlugin({
    //   template: 'app/experience.html',
    //   filename: 'experience.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    //   inject: true,
    // }),

    // new HtmlWebpackPlugin({
    //   template: 'app/locator.html',
    //   filename: 'locator.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    //   inject: true,
    // }),

    // new HtmlWebpackPlugin({
    //   template: 'app/products.html',
    //   filename: 'products.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    //   inject: true,
    // }),

    // new ScriptExtHtmlWebpackPlugin({
    //   preload: {
    //     test: /\.(eot|otf|ttf|woff|woff2)$/,
    //     chunks: 'async'
    //   }
    // }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileBlacklist: [/\.map/, /\.woff/, /\.eot/, /\.ttf/, /\.svg/],
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff2)$/.test(entry)) return 'font';
        if (/\.(jpg|png)$/.test(entry)) return 'image';
        return 'script';
      }
    }),

    // favicon and things
    new CopyWebpackPlugin([
      {
        from: 'app/images/favicons/',
        // to: '.',
        toType: 'dir'
      },
      {
        from: 'robots.txt',
        to: 'robots.txt'
      }
    ]),

    // new SitemapWebpackPlugin('https://drinkszent.com', paths),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
