const express = require('express')
const Category = require('../models/Category.js')
const router = express.Router()
module.exports = router

/**
 * @api {post} /category/new 添加分类
 * @apiName /category/new
 * @apiGroup Category
 *
 * @apiParam {string} catName 分类名称
 * @apiParam {string} catLevel 分类级别
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/category/new', (request, response, next) => {
  const {catName, catLevel} = request.body
  if (!catName || !catLevel) {
    return response.send({
      errcode: 10001,
      errmsg: '分类名，或者分类级别不能为空'
    })
  }
  const cat = new Category({
    catName, catLevel
  })
  cat.then(doc => {
    request.send({
      errcode: 0,
      errmsg: 'ok'
    })
  }, next)
})

/**
 * @api {post} /categorys 获取所有分类列表
 * @apiName /categorys
 * @apiGroup Category
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Array} categories 所有分类信息
 */
router.post('/categorys', (request, response, next) => {
  Category.find({isdel: false}).then(docs => {
    request.send({
      errcode: 0,
      errmsg: 'ok',
      categories: docs
    })
  }, next)
})

/**
 * @api {get} /categorys/{_id} 获取某个分类的信息
 * @apiName /categorys/{_id}
 * @apiGroup Category
 *
 * @apiParam {string} _id 分类_id
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Array} categories 所有分类信息
 */
router.get('/categorys/:_id', (request, response, next) => {
  const {_id} = request.params
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  Category.findOne({isdel: false}).then(doc => {
    request.send({
      errcode: 0,
      errmsg: 'ok',
      category: doc
    })
  }, next)
})
/**
 * @api {post} /categorys/{_id} 更新某个分类的信息
 * @apiName /categorys/{_id}
 * @apiGroup Category
 *
 * @apiParam {string} _id 分类_id
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Array} categories 所有分类信息
 */
router.get('/categorys/:_id', (request, response, next) => {
  const {_id} = request.params
  const {catName, catLevel} = request.body
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  if (!catName || !catLevel) {
    return response.send({
      errcode: 10001,
      errmsg: '分类名或者分类级别不能为空',
    })
  }
  Category.updateMany({_id}, {catName, catLevel})
  .then((result) => {
    if (result.n <=0) {
      return response.send({
        errcode: 10001,
        errmsg: '分类级别不存在'
      })
      response.send({
        errcode: 0,
        errmsg: 'ok'
      })
    }
  }, next)
})
