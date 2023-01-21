const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/': {
        target: 'http://192.168.32.64:83',
        ws: false,
        changeOrigin: true
      }
    }
  }
})
