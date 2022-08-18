/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-05 16:19:20
 */
const { Article } = require("../model/index")
module.exports.getTage = async (req, res, next) => {
  try {
    const article = await Article.find()
    const tagList = article.map(article => article.tagList)
    const tags = [...new Set(tagList.flat())]
    const val = tags.filter(item => {
      return item.trim()
    })
    res.send({
      tagList: val,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
