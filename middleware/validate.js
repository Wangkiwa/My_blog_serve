/*
 * @Descripttion: 数据验证
 * @Author: TaoWang
 * @Date: 2022-08-06 10:00:30
 */
const express = require("express")
const {
  validationResult,
  ValidationChain,
  buildCheckFunction,
} = require("express-validator")
const { isValidObjectId } = require("mongoose")
// can be reused by many routes

// parallel processing
module.exports.validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: errors.array(), status: 400 })
  }
}
module.exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async value => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 不是一个有效的 ObjectID")
    }
  })
}
