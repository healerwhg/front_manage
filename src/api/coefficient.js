import API from "@utils/request";

/**
 * 买币列表
 * @param {object} params 
 * @returns 
 */
export async function getCoefficientList(params) {
    try {
        return await API.get('back/index/daily_mining/list', {
            params,
        })
    } catch (error) {
        return error;
    }
}
