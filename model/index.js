/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-05 19:41:38
 */
const mongoose = require("mongoose")
const { dbUri } = require("../config/config.default")
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "数据库连接失败！"))
db.once("open", function () {
  console.log("数据库连接成功！")
})

// 导出模型
module.exports = {
  User: mongoose.model("User", require("./user")),
  Article: mongoose.model("Article", require("./article")),
  Comments: mongoose.model("Comments", require("./comments")),
}
