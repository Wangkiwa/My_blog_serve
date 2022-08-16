/*
 * @Descripttion:主路由
 * @Author: TaoWang
 * @Date: 2022-08-05 13:23:31
 */
const express = require("express")
// 用户信息路由
const user = require("./user")
// 用户资料路由
const profile = require("./profile")
// 文章路由
const article = require("./articles")
// 便签路由
const tags = require("./tags")
const router = express.Router()
router.use(user)
router.use("/profiles", profile)
router.use("/articles", article)
router.use(tags)
module.exports = router
