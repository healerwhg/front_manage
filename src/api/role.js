import API from '@utils/request';

const ROLE = '/back/admin/';
/**
 * 权限组列表
 * @param {object} params 
 * @returns 
 */
export async function roleGroupList(params) {
    try {
        return await API.get(ROLE + "permission/list", {
            params
        });
    } catch (error) {
        return error;
    }
}
/**
 * 权限下拉列表
 * @param {object} params 
 * @returns 
 */
export async function roleGroupSelect(params) {
    try {
        return await API.get("/back/dropdown/permission", {
            params
        });
    } catch (error) {
        return error;
    }
}

/**
 * 权限修改
 * @param {object} params 
 * @param {string} type 
 * @returns 
 */
export async function roleGroupUpdate(params) {
    try {
        return await API.post(ROLE + "permission/edit",
            params
        );

    } catch (error) {
        return error;
    }
}
/**
 * 权限删除
 * @param {object} params 
 * @returns 
 */
export async function roleAuthReomve(params) {
    try {
        return await API.post(ROLE + "role/permission/remove", params);
    } catch (error) {
        return error;
    }
}
/**
 * 权限新增
 * @param {object} params 
 * @returns 
 */
export async function roleAuthAdd(params) {
    try {
        return await API.post(ROLE + "role/permission/add", params);
    } catch (error) {
        return error;
    }
}
/**
 * 角色列表
 * @returns
 */
export async function roleList(params) {
    try {
        return await API.get(ROLE + "role/list", {
            params
        });
    } catch (error) {
        return error;
    }
}
/**
 * 角色权限列表
 * @returns
 */
export async function roleAuthList(params) {
    try {
        return await API.get(ROLE + "role/permission/list", {params});
    } catch (error) {
        return error;
    }
}
/**
 * 角色新增
 * @param {object} params 
 * @returns 
 */
export async function roleAdd(params) {
    try {
        return await API.post(ROLE + "role/add", params);
    } catch (error) {
        return error;
    }
}
/**
 * 角色修改
 * @param {object} params 
 * @param {string} type 
 * @returns 
 */
export async function roleUpdate(params) {
    try {
        return await API.post(ROLE + "role/edit", params);
    } catch (error) {
        return error;
    }
}