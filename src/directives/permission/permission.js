import store from "@/store";
import { addClass } from "@utils";
import { DEBUG } from "@config";
import router from "@router";

/**
 * 检验权限
 * @param {*} el  指令所绑定的元素，可以用来直接操作 DOM
 * @param {*} binding 一个对象，包含绑定值等信息
 */
function checkPermission(el, binding) {
  const permissionAction = binding.value.action;
  const permissiondisabled = binding.value.disabled;
  const accessRoutes = store.getters && store.getters.accessRoutes;

  if (!permissionAction || accessRoutes.length <= 0) {
    throw new Error(
      `需要权限！ 例如： v-permission="{ action: 'add', disabled: 'disabled' }"`
    );
  }

  // 查找当前路由的权限
  const existRoute = accessRoutes.find(route => route.name == router.currentRoute.name)
  const hasPermission = existRoute && existRoute.permission && existRoute.permission.includes(permissionAction);

  if (!hasPermission) {
    if (permissiondisabled) {
      // 禁用点击
      el.disabled = true;
      addClass(el, "is-disabled");
    }
    else
      // 隐藏显示
      el.parentNode && el.parentNode.removeChild(el);
  }
}

export default {
  inserted(el, binding) {
    if (DEBUG)
      checkPermission(el, binding);
  },

  update(el, binding) {
    if (DEBUG)
      checkPermission(el, binding);
  },
};
