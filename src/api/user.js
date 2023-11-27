import API from "@utils/request";

const USER = '/back/user/';

/**
 * 会员等级
 * @param {object} params 
 * @returns 
 */
export async function getMemberList(params) {
    try {
        return await API.get(USER + 'vip/spec/list', {
            params
        })
    } catch (error) {
        return error;
    }
}

/**
 * 用户列表
 * @param {object} params 
 * @returns 
 */
export async function getUserList(params) {
    try {
        return await API.get(USER + 'list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * USDT列表
 * @param {object} params 
 * @returns 
 */
export async function getUSDTList(params) {
    try {
        return await API.get(USER + 'ubalance/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * USDT状态列表
 * @param {object} params 
 * @returns 
 */
export async function getUSDTStatusList() {
    try {
        return await API.get(USER + 'ubalance/list/channel')
    } catch (error) {
        return error;
    }
}
/**
 * EEOQ列表
 * @param {object} params 
 * @returns 
 */
export async function getEEOQList(params) {
    try {
        return await API.get(USER + 'bbalance/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * EEOQ状态列表
 * @param {object} params 
 * @returns 
 */
export async function getEEOQStatusList() {
    try {
        return await API.get(USER + 'bbalance/list/channel')
    } catch (error) {
        return error;
    }
}
/**
 * 等级算力列表
 * @param {object} params 
 * @returns 
 */
export async function getLevelList(params) {
    try {
        return await API.get(USER + 'level_power/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * 等级算力状态列表
 * @param {object} params 
 * @returns 
 */
export async function getLevelStatusList() {
    try {
        return await API.get(USER + 'level_power/list/channel')
    } catch (error) {
        return error;
    }
}
/**
 * 云算力列表
 * @param {object} params 
 * @returns 
 */
export async function getCloudList(params) {
    try {
        return await API.get(USER + 'cloud_power/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * 云算力状态列表
 * @param {object} params 
 * @returns 
 */
export async function getCloudStatusList() {
    try {
        return await API.get(USER + 'cloud_power/list/channel')
    } catch (error) {
        return error;
    }
}
