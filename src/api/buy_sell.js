import API from "@utils/request";

const DEAL = '/back/user/';
/**
 * 买币列表
 * @param {object} params 
 * @returns 
 */
export async function getBuyList(params) {
    try {
        return await API.get(DEAL + 'coins_buy/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * 买币状态列表
 * @param {object} params 
 * @returns 
 */
export async function getBuyStatusList() {
    try {
        return await API.get(DEAL + 'coins_buy/list/channel')
    } catch (error) {
        return error;
    }
}
/**
 * 卖币列表
 * @param {object} params 
 * @returns 
 */
export async function getSellList(params) {
    try {
        return await API.get(DEAL + 'coins_sell/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
/**
 * 卖币状态列表
 * @param {object} params 
 * @returns 
 */
export async function getSellStatusList() {
    try {
        return await API.get(DEAL + 'coins_sell/list/channel')
    } catch (error) {
        return error;
    }
}