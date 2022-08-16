/*
 * @Descripttion: JSONWEBTOKEN
 * @Author: TaoWang
 * @Date: 2022-08-06 13:05:45
 */
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
// 加密
module.exports.sign = promisify(jwt.sign)
// 解密
module.exports.verify = promisify(jwt.verify)
// 无需验证的token
module.exports.decode = promisify(jwt.decode)
