module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
    }
  },
  // productionSourceMap:false,
  devServer: {
    open: true,
    proxy: {
      '^/api/warungku': {
        target: 'http://192.168.10.127:18087',
        changeOrigin: true,
      }
    }
  }
}
