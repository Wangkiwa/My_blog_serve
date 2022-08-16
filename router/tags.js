/*
 * @Descripttion: 标签列表
 * @Author: TaoWang
 * @Date: 2022-08-05 16:12:18
 */
const express = require("express")
const { getTage } = require("../controller/tags")
const router = express.Router()
router.get("/tags", getTage)
module.exports = router
