/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-06 15:40:37
 */
const { validate, isValidObjectId } = require("../middleware/validate")
const { body, param } = require("express-validator")
const mongoose = require("mongoose")
const { Article } = require("../model")
module.exports.createArticleValidate = validate([
  body("article.title").notEmpty().withMessage("文章标题不能为空"),
  body("article.description").notEmpty().withMessage("文章摘要不能为空"),
  body("article.body").notEmpty().withMessage("文章内容不能为空"),
])
module.exports.selectArticleValidate = validate([
  isValidObjectId(["params"], "articleId"),
  // param("articleId").custom(async value => {
  //   if (!mongoose.isValidObjectId(value)) {
  //     // 没有验证通过
  //     return Promise.reject("文章ID类型错误")
  //   }
  // }),
])
// 检查文章是否存在
// 修改的文章作者是否是当前登录用户
module.exports.updateArticleValidate = [
  validate([isValidObjectId(["params"], "articleId")]),
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    req.article = article
    if (article && Object.keys(article).length > 0) {
      next()
    } else {
      return res.status(404).json({
        error: "文章不存在",
      })
    }
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).json({
        error: "文章作者不匹配",
      })
    }
    next()
  },
]
// 删除文章
module.exports.deleteArticleValidate = module.exports.updateArticleValidate
// 收藏文章
module.exports.collectValidate = validate([
  param("articleId").custom(async value => {
    if (!mongoose.isValidObjectId(value)) {
      // 没有验证通过
      return Promise.reject("文章ID类型错误")
    }
  }),
])
// 添加评论
module.exports.addCommentValidate = validate([
  param("articleId").custom(async value => {
    if (!mongoose.isValidObjectId(value)) {
      // 没有验证通过
      return Promise.reject("文章ID类型错误")
    }
  }),
  body("body").notEmpty().withMessage("评论内容不能为空"),
])
