/*
 * @Descripttion: 错误失败中间件
 * @Author: TaoWang
 * @Date: 2022-08-05 21:11:31
 */
module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      error: err.message,
    })
  }
}
