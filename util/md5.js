/*
 * @Descripttion: 加密模块
 * @Author: TaoWang
 * @Date: 2022-08-06 10:38:42
 */
const crypto = require("crypto")
module.exports = str => {
  // crypto模块功能是加密并生成各种散列,此处所示为MD5方式加密
  return crypto
    .createHash("md5")
    .update("heihei" + str)
    .digest("hex") //转为十进制
}
