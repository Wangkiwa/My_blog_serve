/*
 * @Descripttion: 用户校验模块
 * @Author: TaoWang
 * @Date: 2022-08-06 10:03:19
 */
const { validate } = require("../middleware/validate")
const { User } = require("../model")
const md5 = require("../util/md5")
const { body, validationResult } = require("express-validator")
// 注册数据校验
module.exports.registerValidate = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async username => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject("用户名已存在")
      }
    }),
  body("password").notEmpty().withMessage("密码不能为空"),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async value => {
      const user = await User.findOne({ email: value })
      if (user) {
        return Promise.reject("邮箱已存在")
      }
    }),
])
// 登录校验
module.exports.loginValidate = [
  validate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("user.email").custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        "email",
        "username",
        "bio",
        "image",
        "password",
      ])
      if (!user) {
        return Promise.reject("用户不存在")
      }
      req.user = user
    }),
  ]),
  validate([
    body("user.password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误")
      }
    }),
  ]),
]
// 更改用户校验
module.exports.updateValidate = [
  validate([
    body("username").custom(async (username, { req }) => {
      const userId = req.user._id
      //  查询除当前用户以外的用户
      const user = await User.find({ _id: { $ne: userId } }).select([
        "username",
        "email",
      ])
      req.users = user
      // 拿到查询到的用户名字
      const userN = user.map(item => item.username)
      if (userN.includes(username.toString())) {
        return Promise.reject("用户名已存在,请更换")
      }
    }),
  ]),
  validate([
    body("email")
      .isEmail()
      .withMessage("邮箱格式不正确")
      .custom(async (email, { req }) => {
        const emails = req.users.map(item => item.email)
        if (emails.includes(email.toString())) {
          return Promise.reject("邮箱已存在,请更换")
        }
      }),
  ]),
  validate([
    body("password")
      .notEmpty()
      .withMessage("密码不能为空")
      .custom(async (password, { req }) => {
        if (md5(password) === req.user.password) {
          return Promise.reject("新旧密码不能一致！")
        }
      }),
  ]),
]
