/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-05 12:48:33
 */
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const router = require("./router/index")
const path = require("path")
const handleError = require("./middleware/error-handle")
app.use("/uploads", express.static(path.join(__dirname, "./uploads")))
require("./model/index")
// 解析urlencoded请求体数据
app.use(express.urlencoded({ extended: false }))
// 解析json请求体数据
app.use(express.json())
// 日志输出
app.use(morgan("dev"))
// 跨域问题
app.use(cors())
app.use("/api", router)
app.use(handleError())
app.listen(8888, () => {
  console.log("http://localhost:8888")
})
