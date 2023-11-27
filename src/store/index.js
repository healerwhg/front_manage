import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// webpack 的功能 https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// 不需要 `import app from './modules/app'`
// 将自动从模块文件中要求所有vuex模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
});

export default store;
