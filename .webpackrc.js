import path from 'path'
module.exports = {
  "extraBabelPlugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "style": "css"
    }]
  ],
  "proxy":{
    // "/api":{
    //   "target":"https://github.com",
    //   "changeOrigin":true,
    //   "pathRewrite":{"^/api":"/"}
    // }
  },
  "alias":{
    '@src':path.resolve(__dirname,'./src'),
    '@comp':path.resolve(__dirname,'./src/components'),
    '@models':path.resolve(__dirname,'./src/models'),
    '@api':path.resolve(__dirname,'./src/services'),
    '@utils':path.resolve(__dirname,'./src/utils'),
    '@asset':path.resolve(__dirname,'./src/assets'),
    '@pages':path.resolve(__dirname,'./src/routes'),
    '@infe':path.resolve(__dirname,'./src/interface'),
    '@env':path.resolve(__dirname,'./src/env')
  },
  "publicPath":"/"
}
