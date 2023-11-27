import Vue from "vue";
import Router from "vue-router";
const path = require('path');

Vue.use(Router);

/* 布局 */
import Layout from "@views/layout";
import memberRouter from "./modules/member";
import roleRouter from "./modules/role";
import roleGroupRouter from "./modules/roleGroup";

/*
 * 路由器模块
 */

/**
 * 注意:子菜单只在路由 children.length >= 1 时，才出现
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单（默认为false）
 *                                如果没有设置alwaysShow，当item有多个子路由时，它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             使用 <keep-alive> （必须设置!），字母全部大写，多个单词以“_”分隔，例：TEST_ONE （推荐全部设置）
 * meta : {
    permission: ['add','edit']   该路由下，按钮的权限，该值一般从接口返回（可以设置多个权限）
    title: 'title'               名称显示在侧边栏和面包屑中（推荐全部设置）
    icon: 'el-icon-x'            图标显示在侧栏中
    keepAlive: true              如果设置为true，页面将会被缓存（默认为false）
    breadcrumb: false            如果设置为false，该项将隐藏在breadcrumb中（默认为true）
    activeMenu: 'router-name'    如果设置路径，侧边栏将突出显示您设置的路径名
  }
 */

/**
 * 路由白名单
 * 没有权限要求的页面
 * 所有角色都可以被访问
 */
export const constantRoutes = [{
    path: "/login",
    name: "LOGIN",
    hidden: true,
    component: () => import("@views/login/index"),
  },

  {
    path: "/404",
    name: "404",
    hidden: true,
    component: () => import("@views/error/404"),
  },

  {
    path: "/401",
    name: "401",
    hidden: true,
    component: () => import("@views/error/401"),
  },

  {
    path: "/",
    component: Layout,
    redirect: "/homepage",
    children: [{
      path: "homepage",
      name: "HOMEPAGE",
      alwaysShow: true,
      meta: {
        title: "控制台"
      },
      component: () => import("@views/homepage/index"),
    }, ],
  }
];

/**
 * 遍历文件夹，自动获取路由文件
 */
export function getOtherRouter() {
  const files = require.context('@/router/modules', false, /.js$/);
  let otherRouterList = [];
  files.keys().forEach(key => {
    const routerFileName = path.basename(key, '.vue');
    const routerObj = require('@/router/modules/' + routerFileName);
    otherRouterList.push(routerObj.default);
  });
  return otherRouterList;
}


/**
 * 动态路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 所有页面都未匹配到时
  {
    path: "*",
    hidden: true,
    redirect: {
      name: "404"
    }
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // 需要服务器支持
    scrollBehavior: () => ({
      y: 0
    }),
    routes:getOtherRouter().concat(constantRoutes)
  });

const router = createRouter();

// 详情见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由器
}

export default router;