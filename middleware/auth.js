/*
 * @Descripttion: 权限验证封装
 * @Author: TaoWang
 * @Date: 2022-08-06 13:37:02
 */
const jwt = require("../util/jwt")
const { jwtSecret } = require("../config/config.default")
const { User } = require("../model/index")
module.exports = async (req, res, next) => {
  let token = req.headers.authorization
  token = token ? token.split(" ")[1] : null
  if (!token) {
    return res.status(401).json({
      msg: "TOKEN认证失败！",
    })
  }
  // 解密
  try {
    const decodedToken = await jwt.verify(token, jwtSecret)
    const user = await User.findById(decodedToken.userId)
    // 将user挂载req
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      code: 401,
      msg: "TOKEN认证失败",
    })
  }
}
