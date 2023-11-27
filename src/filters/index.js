// 导入 formatTime dateDiff 并设置为过渡器
export { formatTime } from "@utils";

/**
 * 如果时间是复数，则显示复数标签
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label;
}

/**
 * 距离今天过去多少时间
 * @param {number} time
 */
export function timeAgo(time) {
  const between = (Date.now() - Number(time)) / 1000;
  if (between < 3600) {
    return pluralize(~~(between / 60), " 分钟");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " 小时");
  } else {
    return pluralize(~~(between / 86400), " 天");
  }
}

/**
 * 数字格式化
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 格式化为货币的形式
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * 大写首字母
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
