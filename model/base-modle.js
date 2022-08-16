/*
 * @Descripttion: 时间处理
 * @Author: TaoWang
 * @Date: 2022-08-05 21:22:10
 */
module.exports = {
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
}
