/*
 * @Descripttion:用户资料的路由
 * @Author: TaoWang
 * @Date: 2022-08-05 15:45:51
 */
const express = require("express")
const {
  getProfile,
  followUser,
  unFollowUser,
} = require("../controller/profile")
const auth = require("../middleware/auth")
const router = express.Router()
// 获取指定用户资料
router.get("/:username", getProfile)
// 关注用户
router.post("/:username/follow", auth, followUser)
// 取消关注用户
router.delete("/:username/follow", auth, unFollowUser)
module.exports = router
