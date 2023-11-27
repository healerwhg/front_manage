import axios from "axios";
import Qs from 'qs'
import {
  MessageBox,
  Message
} from "element-ui";
import {
  API_ROOT,
  REQUEST_TIMEOUT,
  DEBUG
} from "@config";
import router from "@router";

let loadingInstance; //加载

/**
 * 创建一个axios实例
 */
const service = axios.create({
  baseURL: API_ROOT, // 请求地址
  timeout: REQUEST_TIMEOUT, // 请求超时
  // withCredentials: true, // 在跨域请求时发送cookie

  // 请求参数的格式
  headers: {
    // "content-type": "application/json",
    isLoading: "true",
    // "Content-Language":"zh-hans"
    "Accept-Language": "zh",
    'Content-Type': 'application/x-www-form-urlencoded'
  },

  // 请求需要拼接参数
  // transformRequest: [
  //     function(data, config) {
  //         return Qs.stringify(data);
  //     },
  // ],
});

/**
 * 请求拦截器
 * 在请求发送之前做什么
 */
service.interceptors.request.use(
  (config) => {
    // 加载层, 默认开启
    if (!config.headers.isLoading)
      loadingInstance = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    if (config.data) {
      delete config.data.delete_time;
      delete config.data.update_time;
      config.data = Qs.stringify(config.data)
    }


    delete config.headers.isLoading;
    if (sessionStorage.getItem("token")) {
      // 让每个请求都带有令牌，请根据实际情况修改
      config.headers["Authorization"] = "Bearer " + sessionStorage.getItem("token");
    }

    return config;
  },
  (error) => {
    // 请求错误时做了什么

    if (DEBUG) console.log("requestError：" + error);

    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 如果您想获得http信息，如头信息或状态
 */
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 加载层清除
    if (loadingInstance) loadingInstance.close();

    /**
     * 通过自定义代码确定请求状态
     * 这里只是一个例子
     * 您也可以通过HTTP状态码来判断状态
     */
    switch (res.code) {
      case 200:
        if (response.config.responseType === "blob") {
          //文件传输入
          return handleResponse(response);
        } else {
          return res;
        }
      case 401:
        Message.error(res.msg);
        sessionStorage.clear();
        break;

      default:
        Message.error(res.msg);
        break;
    }

    return Promise.reject(new Error(res.message || "Error"));
  },
  (error) => {
    // 加载层清除
    if (loadingInstance) loadingInstance.close();
    const res = error.response.data
    switch (res.code) {
      case 401:
        Message.error(res.msg);
        setTimeout(() => {
          sessionStorage.clear();
          location.replace('/#/login')
        }, 1500)
        break;
      default:
        Message.error(res.msg);
        break;
    }

    return Promise.reject(error);
  }
);

/**
 * 处理响应的二进字数据
 * @param {*} response
 */
function handleResponse(response) {
  /**
   * 从响应头获取文件名称
   * 后端返回的文件名称为十六进制
   */
  const fileName = decodeURI(
    response.headers["content-disposition"].split("=")[1]
  ).replace(/\"/g, "");

  try {
    const blob = new Blob([response.data]);
    if ("download" in document.createElement("a")) {
      // 非IE下载
      const elink = document.createElement("a");
      elink.download = fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob); //创建下载
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName);
    }
  } catch (e) { }
}

export default service;