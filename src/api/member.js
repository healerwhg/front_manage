import API from "@utils/request";

const MEMBER = "/back/admin/";

/**
 * 会员登录
 * @param {object} params
 */
export async function login(params) {
  try {
    return await API.post(MEMBER + "login", params);
  } catch (error) {
    return error;
  }
}
/**
 * 登录人信息
 * @returns 
 */
export async function getMyInfo() {
  try {
    return await API.get(MEMBER + "user/info");
  } catch (error) {
    return error;
  }
}
/**
 * 修改密码
 * @returns 
 */
export async function memberPasswordUpdate(params) {
  try {
    return await API.post(MEMBER + "password", params);
  } catch (error) {
    return error;
  }
}
/**
 * 获取账号列表
 * @param {object} params
 */
export async function getMemberList(params) {
  try {
    return await API.get(MEMBER + "user/info/list", {
      params,
    });
  } catch (error) {
    return error;
  }
}
/**
 * 获取账号详情
 * @param {object} params
 */
export async function memberUpdate(params) {
  try {
    return await API.get(MEMBER + "user/info/detail", {
      params,
    });
  } catch (error) {
    return error;
  }
}
/**
 * 新增
 * @param {object} params 
 * @returns 
 */
export async function memberAdd(params) {
  try {
    return await API.post(MEMBER + "user/add", params);
  } catch (error) {
    return error
  }
}
/**
 * 重置密码
 * @param {object} params 
 * @returns 
 */
export async function restPwd(params) {
  try {
    return await API.post(MEMBER + "password/reset", params);
  } catch (error) {
    return error
  }
}
/**
 * 删除
 * @param {object} params 
 * @returns 
 */
export async function memberDelete(id) {
  try {
    return await API.post(MEMBER + "memberDelete", {
      id: id
    });
  } catch (error) {
    return error;
  }
}
