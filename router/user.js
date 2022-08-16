/*
 * @Descripttion:用户相关路由
 * @Author: TaoWang
 * @Date: 2022-08-05 13:26:43
 */
// 用户相关的路由
const express = require("express")
const { login, register, getUser, updateUser } = require("../controller/user")
const {
  registerValidate,
  loginValidate,
  updateValidate,
} = require("../validate/user")
const auth = require("../middleware/auth")
const multer = require("multer")

// 导入处理路径的核心模块
const path = require("path")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg")
  },
})

const upload = multer({ storage: storage })
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, "../uploads") })
const router = express.Router()
// 用户登录
router.post("/users/login", loginValidate, login)
// 用户注册
router.post("/users", registerValidate, register)
// 获取当前登录用户
router.get("/user", auth, getUser)
// 更新当前登录用户
router.put("/user", auth, upload.single("image"), updateValidate, updateUser)
module.exports = router
