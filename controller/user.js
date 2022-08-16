/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-05 16:19:41
 */
// 用户登录
const { User } = require("../model/index")
const jwt = require("../util/jwt")
const path = require("path")
const fs = require("fs")
const util = require("util")
const { jwtSecret } = require("../config/config.default")
// 用户登录
module.exports.login = async (req, res, next) => {
  try {
    // 请求处理
    const user = req.user.toJSON()
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: "10h",
      }
    )
    delete user.password
    res.status(200).json({
      ...user,
      token,
    })
  } catch (error) {
    next(error)
  }
}
// 用户注册
module.exports.register = async (req, res, next) => {
  try {
    // 请求处理
    let user = new User(req.body)
    await user.save()
    user = user._doc
    delete user.password
    res.status(201).json({
      user,
    })
  } catch (error) {
    next(error)
  }
}
// 获取当前登录用户
module.exports.getUser = (req, res, next) => {
  try {
    // 请求处理
    res.status(200).json({
      user: req.user,
    })
  } catch (error) {
    next(error)
  }
}
// 更新当前登录用户
module.exports.updateUser = async (req, res, next) => {
  try {
    // 请求处理
    const { username, email, password, image, bio } = req.body
    const userInfo = await User.findById(req.user._id)
    console.log("req.file=======>", req.file)
    if (!req.file) {
      res.send({
        status: 401,
        msg: "请选择头像！",
      })
    }
    console.log("userInfo====>", userInfo)
    userInfo.username = username
    userInfo.email = email
    userInfo.password = password
    userInfo.image = path.join("/uploads", req.file.filename)
    userInfo.bio = bio
    userInfo.save()
    res.status(200).json({
      userInfo,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
