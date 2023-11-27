/* *********************** 正式环境 ********************** */
// export const API_ROOT = "https://eeoq-v1-api-v1.netlify.app/api";
export const API_ROOT = "https://eeoq-api.netlify.app/api";


/* *********************** 测试环境 ********************** */
// export const API_ROOT = "https://www.xxx.com/api";

// 系统标题
export const TITLE = "EEOQ管理系统";

// 生产环境和测试环境
// export const DEBUG = process.env.NODE_ENV !== "production";
export const DEBUG = true;

// 设置请求的超时时间   单位毫秒
export const REQUEST_TIMEOUT = 300000;

// 文件服务器地址
export const FILE_ROOT = "https://file.xxx.com/";

// 一页显示的条目
export const PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 20, 30, 40, 50]
