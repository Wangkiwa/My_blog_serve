/*
 * @Descripttion: 文章数据库模型
 * @Author: TaoWang
 * @Date: 2022-08-05 20:38:01
 */
const basemodle = require("./base-modle")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const articleSchema = new mongoose.Schema({
  ...basemodle,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tagList: {
    type: [String],
    default: null,
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
  favorited: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})
module.exports = articleSchema
