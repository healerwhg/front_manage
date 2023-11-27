import router from "./router";
import { Message } from "element-ui";
import getPageTitle from "@/utils/get-page-title";

const whiteList = ["/login"]; // 不需要重定向的白名单

router.beforeEach(async (to, from, next) => {
  if (to.matched.length == 0) {
    next({ path: "/404" });
  }

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 判断用户是否已经登录
  const hasToken = sessionStorage.getItem("token");
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，则重定向到主页
      next({ path: "/" });
    } else {
      try {
        next();
      } catch (error) {
        // 删除令牌并转到登录页面重新登录
        sessionStorage.clear();
        Message.error(error || "有错误");
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    /* 没有令牌*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单，直接去
      next();
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {});
