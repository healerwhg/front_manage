import API from "@utils/request";

const UPGRADE = '/back/user/';
/**
 * 升级见点
 * @param {object} params 
 * @returns 
 */
export async function getUpgrade(params) {
    try {
        return await API.get(UPGRADE + 'cash/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * 升级列表
 * @param {object} params 
 * @returns 
 */
export async function getUpgradeList(params) {
    try {
        return await API.get(UPGRADE + 'level_up/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * 升级状态列表
 * @param {object} params 
 * @returns 
 */
export async function getUpgradeStatusList() {
    try {
        return await API.get(UPGRADE + 'level_up/list/channel')
    } catch (error) {
        return error;
    }
}