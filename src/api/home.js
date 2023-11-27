import API from "@utils/request";


/**
 * 首页统计
 * @param {object} params 
 * @returns 
 */
export async function getHomeData() {
    try {
        return await API.get("/back/index/home/data")
    } catch (error) {
        return error;
    }
}
