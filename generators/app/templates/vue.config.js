const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const compress = new CompressionWebpackPlugin({
  test: /\.js(\?.*)?$/i,
  algorithm: 'gzip',
  threshold: 500,
  deleteOriginalAssets: false,
})


module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
    }
  },
  devServer: {
    // open: true,
    proxy: {
      '^/api/warungku': {
        target: 'http://192.168.10.127:18087',
        changeOrigin: true,
      }
    },
    compress: true
  },
  configureWebpack: {
    plugins: [
      compress,
      new BundleAnalyzerPlugin(),
    ]
  },
  chainWebpack: config => {
    config.optimization.minimize(true);
    config.optimization
      .minimizer('js')
      .use(TerserPlugin, [{
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          }
        }
      }])
    config.optimization.splitChunks({ chunks: "all", maxSize: 500 * 1024 })

    config.module
      .rule('image')
      .test(/\.(jpg|jpeg|svg|png|webp)$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: true
      })
      .end()
  }
}
