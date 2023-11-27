import Vue from "vue";

import "normalize.css/normalize.css"; // 替代CSS重置

import "@utils/element-ues"; // 按需引入ElementUI

import "@assets/styles/public.scss"; // 全局引用样式

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2OrgTree from 'vue2-org-tree' // 引入树状结构图
import "vue2-org-tree/dist/style.css" // 引入树状结构图样式

Vue.use(Vue2OrgTree)

import "./permission"; // 权限控制

import _ from "lodash"; // JavaScript 实用工具库

import * as filters from "@/filters"; // 全局过滤器

import * as directives from "./directives"; // 全局过指令

//screenfull
import screenfull from "screenfull";

//echarts
import * as echarts from "echarts";


// lodash挂载
Vue.prototype.$screenfull = screenfull;
Vue.prototype.$echarts = echarts;
Vue.prototype.$_ = _;

/**
 * 流程执行步骤（全局）
 */
Vue.prototype.doList = [{
  id: "do_7",
  name: "执行最后一步",
},
{
  id: "do_next",
  name: "执行下一节点",
},
{
  id: "do_end",
  name: "结束",
},
{
  id: 0,
  name: "重置到之前节点",
},
]

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 注册全局过指令
Object.keys(directives).forEach((key) => {
  Vue.use(directives[key]);
});

// /**
//  * 更新菜单
//  */
// Vue.prototype.getMemberMenuList = async function () {
//   Vue.prototype.menuList = (await getMemberMenu()).data;
//   return Vue.prototype.menuList;
// }

Vue.prototype.menuList = undefined;

Vue.config.productionTip = false;


const myVue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");