import { FILE_ROOT } from "@config";
import dayjs from "dayjs";

/**
 * 图片地址格式化
 * @param {string} rawImg 图片地址
 * @returns {string}
 */
export function formatImg(rawImg) {
  if (!rawImg) return "";
  return FILE_ROOT + rawImg;
}

/**
 * 日期时间格式化
 * @param {date} dateTime
 * @param {string} forma
 * @returns {string}
 */
export function formatTime(dateTime, forma = "YYYY-MM-DD HH:mm") {
  if (!dateTime || dateTime <= 0) return "-";
  return dayjs(dateTime).format(forma);
}

/**
 * 获取两个日期之间的持续时间
 * @param {date} startTime
 * @param {date} endTime
 * @param {string} type (years、months、days、hours、minutes、seconds)
 * @returns {number}
 */
export function dateDiff(startTime, endTime, type = "days") {
  if (!startTime || !endTime) return 0;
  const diffNumber = dayjs(startTime).diff(endTime, type);
  return Math.abs(diffNumber);
}

/**
 * 生成字母选项（ABCD...）
 * @param {number} num 数字从0开始
 */
export function creationLetter(num = 0) {
  const ascii = num + 65;

  if (!isNaN(num) && ascii < 65 && ascii >= 91) return "-";
  return String.fromCharCode(ascii);
}

/**
 * 获取地址栏中的参数
 * 一般用于第三方登录（微信登录、QQ登录等）
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * 元素类切换开关
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * 数组去重
 * 可以弃用，直接使用lodash中的去重方法
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * 生成一个无重复的字符串
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * 检查一个元素是否有一个类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * 向元素添加类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * 从元素中移除类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}
