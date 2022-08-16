/*
 * @Descripttion: 文章路由函数模块
 * @Author: TaoWang
 * @Date: 2022-08-05 16:19:05
 */
// 返回文章列表
const { Article, User, Comments } = require("../model/index")
module.exports.getArticle = async (req, res, next) => {
  const { limit = 20, offset = 0, tag, author, favorited } = req.query
  const filter = {}
  console.log("favorited@@@@@@", favorited)
  // 根据标签筛选文章
  if (tag) {
    filter["tagList"] = tag
  }
  // 根据作者筛选文章
  if (author) {
    // 根据名字找到作者
    const user = await User.findOne({ username: author })
    filter["author"] = user ? user._id : null
  }
  if (favorited) {
    // 根据收藏找到作者
    const user = await User.findOne({ username: favorited })
    console.log("user===========>", user)
    filter["favorited"] = user ? user._id : null
  }
  const articles = await Article.find(filter)
    .skip(Number.parseInt(offset))
    .limit(Number.parseInt(limit))
    .populate("author", ["username", "image"])
    .select("+favorited")
    .sort({
      // -1 倒叙  1升序
      createdAt: -1,
    })
  const articlesCount = await Article.countDocuments()
  res.status(200).json({
    articles,
    articlesCount,
  })
}
//返回由关注的用户创建的多篇文章
module.exports.getFeed = (req, res, next) => {
  res.send("getFeed")
}
// 返回单篇文章
module.exports.getOnActicle = async (req, res, next) => {
  const article = await Article.findById(req.params.articleId).populate(
    "author"
  )
  if (!article) {
    return res.status(404).json({ error: "无法获取文章" })
  }
  res.status(200).json({
    article,
  })
}
// 创建文章
module.exports.createActicle = async (req, res, next) => {
  const article = new Article(req.body.article)
  // 获取
  article.author = req.user._id
  article.populate("author")
  await article.save()
  res.status(201).json({
    article,
    status: 201,
  })
}
// 修改文章
module.exports.updateActicle = async (req, res, next) => {
  try {
    let article = req.article
    const bodyArticle = req.body.article
    console.log("bodyArticle==>", req.body)
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.body = bodyArticle.body || article.body
    article.tagList = bodyArticle.tagList || article.tagList
    await article.save()
    console.log("进来了")
    res.status(200).json({
      article,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
// 删除文章
module.exports.deleteActicle = async (req, res, next) => {
  let article = req.article
  await article.remove()
  res.send({
    status: 204,
    msg: "删除文章成功！",
  })
}
// 添加评论
module.exports.addComments = async (req, res, next) => {
  const { author, body } = req.body
  const { articleId } = req.params
  try {
    await Comments.create({
      body,
      articleId,
      author,
    })
    res.send({
      msg: "添加评论成功",
      status: 200,
    })
  } catch (error) {
    res.status(401).json({
      err: error.msg,
    })
  }
}
// 获取评论
module.exports.getComments = async (req, res, next) => {
  try {
    const { articleId } = req.params
    const comments = await Comments.find({ articleId })
      .populate("author")
      .sort({
        // -1 倒叙  1升序
        time: -1,
      })
    console.log("comments=====>", comments)
    res.send({
      comments,
      status: 200,
    })
  } catch (error) {
    res.status(401).json({
      err: error.msg,
    })
  }
}
// 删除评论
module.exports.deleteComments = (req, res, next) => {
  res.send("deleteComments")
}
// 最喜欢的文章
module.exports.favorite = async (req, res, next) => {
  try {
    const { articleId } = req.params
    let userId = req.user._id
    const article = await Article.findById(articleId).select("+favorited")
    // 判断用户是否收藏
    if (
      !article.favorited.map(id => id.toString()).includes(userId.toString())
    ) {
      //收藏
      article.favorited.push(userId)
      article.favoritesCount += 1
      article.save()
    }
    res.status(200).json({
      message: "收藏文章成功",
    })
  } catch (error) {
    next(error)
  }
}
// 最不喜欢的文章
module.exports.unFavorite = async (req, res, next) => {
  try {
    const { articleId } = req.params
    let userId = req.user._id
    const article = await Article.findById(articleId).select("+favorited")
    // 判断用户id是否存在收藏中
    const index = article.favorited.findIndex(
      index => index.toString() === userId.toString()
    )
    if (index !== -1) {
      // 存在-找到了对应的索引删除
      article.favorited.splice(index, 1)
      article.favoritesCount -= 1
      article.save()
    }
    res.status(200).json({
      message: "取消收藏文章成功",
    })
  } catch (error) {
    next(error)
  }
}
