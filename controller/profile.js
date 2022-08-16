/*
 * @Descripttion: 用户资料路由函数模块
 * @Author: TaoWang
 * @Date: 2022-08-05 16:19:12
 */
// 获取指定用户资料
const { User } = require("../model/index.js")
module.exports.getProfile = async (req, res, next) => {
  const { username } = req.params
  console.log("username===>", username)
  try {
    const user = await User.findOne({ username })
    if (user) {
      return res.send(user)
    }
    return res.status(401).json({
      msg: "用户名未找到",
      status: 401,
    })
  } catch (error) {
    res.send({
      err: error.msg,
    })
  }
}
// 关注用户
module.exports.followUser = async (req, res, next) => {
  try {
    const { username } = req.params
    const user = await User.findById(req.user._id)
    if (!user.follow.includes(username)) {
      // 没关注
      user.follow.push(username)
      user.save()
    }
    res.send({
      user,
      msg: "关注用户成功！",
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
// 取消关注用户
module.exports.unFollowUser = async (req, res, next) => {
  try {
    const { username } = req.params
    const user = await User.findById(req.user._id)
    if (user.follow.includes(username)) {
      const index = user.follow.indexOf(username)
      if (index !== -1) {
        // 找到了对应的索引删除
        user.follow.splice(index, 1)
        user.save()
        return res.send({
          msg: "已取消关注！",
          status: 200,
        })
      }
    }
    res.send({
      msg: "已取消关注！",
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
