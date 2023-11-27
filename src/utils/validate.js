/**
 * 邮箱格式验证
 * @param {number} email 邮箱号
 * @returns {boolean}
 */
export function validEmail(email) {
  const reg =
    /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/i;
  return reg.test(email);
}

/**
 * 验证密码强度
 * 四级密码强度（符号、大写字母、小字字母、数字、8位以上）
 * @param {string} password
 * @returns {boolean}
 */
export function validPassword (password) {
  // 密码包含符号、大写字母、小字字母、数字，8-20位
  const reg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\._])[0-9a-zA-Z!@#$%^&*,\\._]{8,20}$/
  // 密码包含符号、大写字母、小字字母、数字任意三种，8-20位
  // const reg =
  //   /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,}$/;;
  return reg.test(password);
}

/**
 * 手机号格式验证
 * @param {number} phone 手机号
 * @returns {boolean}
 */
export function validPhone(phone) {
  const reg = /^1[2345789]\d{9}$/;
  return reg.test(phone);
}

/**
 * 电话号码格式验证(手机 + 座机)
 * @param {number} phone 电话号码
 * @returns {boolean}
 */
export function validTel(phone) {
  const reg = /(^1[34578]\d{9}$)|(0\d{2,3}\d{7,8})|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^((0\d{2,3})-)(\d{3,4})(-(\d{3,4}))$)/
  return reg.test(phone);
}

/**
 * 身份证号-省级地址码校验
 * @param {string} val
 * @returns {boolean}
 */
function checkProv(val) {
  var pattern = /^[1-9][0-9]/;
  var provs = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
  };
  if (pattern.test(val)) {
    if (provs[val]) {
      return true;
    }
  }
  return false;
}

/**
 * 身份证号-出生日期码校验
 * @param {string} val
 * @returns {boolean}
 */
function checkDate(val) {
  var pattern =
    /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
  if (pattern.test(val)) {
    var year = val.substring(0, 4);
    var month = val.substring(4, 6);
    var date = val.substring(6, 8);
    var date2 = new Date(year + "-" + month + "-" + date);
    if (date2 && date2.getMonth() == parseInt(month) - 1) {
      return true;
    }
  }
  return false;
}

/**
 * 身份证号-校验码校验
 * @param {string} val
 * @returns {boolean}
 */
function checkCode(val) {
  var p =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

/**
 * 身份证号格式验证
 * @param {string} val 身份证号
 * @returns {boolean}
 */
export function validIdentityID(val) {
  if (checkCode(val)) {
    var date = val.substring(6, 14);
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true;
      }
    }
  }
  return false;
}

/**
 * URL 网址验证
 * @param {number} url 网址
 * @returns {boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}