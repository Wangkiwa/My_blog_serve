/*
 * @Descripttion: 用户数据库模型
 * @Author: TaoWang
 * @Date: 2022-08-05 20:38:01
 */
const basemodle = require("./base-modle")
const mongoose = require("mongoose")
const md5 = require("../util/md5")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false,
  },
  bio: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "/uploads/0d86288d443c3f02a6e7879d7b9c6ad3.jpg",
  },
  follow: {
    type: [String],
  },
  ...basemodle,
})
module.exports = userSchema
