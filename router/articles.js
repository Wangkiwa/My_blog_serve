/*
 * @Descripttion: 文章相关路由
 * @Author: TaoWang
 * @Date: 2022-08-05 15:57:25
 */
const express = require("express")
const router = express.Router()
const {
  getArticle,
  getFeed,
  getOnActicle,
  createActicle,
  updateActicle,
  deleteActicle,
  addComments,
  getComments,
  deleteComments,
  favorite,
  unFavorite,
} = require("../controller/articles")
const auth = require("../middleware/auth")
const {
  createArticleValidate,
  selectArticleValidate,
  updateArticleValidate,
  deleteArticleValidate,
  collectValidate,
  addCommentValidate,
} = require("../validate/article")
// 文章列表
router.get("/", getArticle)
//返回由关注的用户创建的多篇文章
router.get("/feed", getFeed)
// 返回单篇文章
router.get("/:articleId", selectArticleValidate, getOnActicle)
// 创建文章
router.post("/", auth, createArticleValidate, createActicle)
// 修改文章
router.put("/:articleId", auth, updateArticleValidate, updateActicle)
// 删除文章
router.delete("/:articleId", auth, deleteArticleValidate, deleteActicle)
// 添加评论
router.post("/:articleId/comments", auth, addCommentValidate, addComments)
// 获取评论
router.get("/:articleId/comments", auth, getComments)
// 删除评论
router.delete("/:articleId/comments/:id", deleteComments)
// 最喜欢的文章
router.post("/:articleId/favorite", auth, collectValidate, favorite)
// 最不喜欢的文章
router.delete("/:articleId/favorite", auth, collectValidate, unFavorite)

module.exports = router
