// vue-cli配置文件
const path = require("path");

//获取打包时的时间戳
const Timestamp = new Date().getTime();

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 项目部署的基础路径
  // publicPath: process.env.NODE_ENV === "production" ? "/aa/" : "/",
  publicPath: "/",

  // 将构建好的文件输出到哪里
  outputDir: "dist",

  assetsDir: "static",

  //代码错误提示，生产环境设置为false
  productionSourceMap: true,

  //是否在保存的时候使用 `eslint-loader` 进行检查
  lintOnSave: false,
  // lintOnSave: process.env.NODE_ENV === "development",

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    host: "0.0.0.0",
    // port: 9006,
    https: false,
    hotOnly: false,
    open: true,
    // 开发环境代理配置，string | Object proxy:
    //http://www.tang-railway-bzhzy.com
    proxy: {
      "/api": {
        target: "https://eeoq-v1-api-v1.netlify.app",
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": "",
        // },
      }
    },

    before: (app) => {},
  },

  // 调整内部的 webpack 配置...(链式写法)
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@comp", resolve("src/components"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"))
      .set("@router", resolve("src/router"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"))
      .set("@config", resolve("src/config.js"));

    // 为css文件打包时加上反缀
    // config.plugin('extract-css').tap(args => [{
    //     filename: `css/[name].${Timestamp}.css`,
    //     chunkFilename: `css/[name].${Timestamp}.css`
    // }])
  },

  // 调整内部的 webpack 配置...(常规写法)
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
    },

    // 为js文件打包时加上反缀
    // output: {
    //   filename: `js/[name].${Timestamp}.js`,
    //   chunkFilename: `js/[name].${Timestamp}.js`,
    // },
  },
};