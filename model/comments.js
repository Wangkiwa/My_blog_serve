/*
 * @Descripttion: 评论数据库模型
 * @Author: TaoWang
 * @Date: 2022-08-16 09:30:49
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CommentsSchema = new Schema({
  // 文章id
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  // 评论人用户id
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // 评论时间
  time: {
    type: Date,
    default: Date.now,
  },
  // 评论内容
  body: {
    type: String,
    require: true,
  },
})
module.exports = CommentsSchema
