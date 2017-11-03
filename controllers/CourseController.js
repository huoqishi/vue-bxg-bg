const path = require('path')
const express = require('express')
const multer = require('multer')
const Course = require('../models/Course.js')
const upload = multer({ dest: path.resolve('../uploads') })
const router = express.Router()
module.exports = router

/**
 * @api {post} /course/new 创建新课程
 * @apiName /course/new
 * @apiGroup Course
 *
 * @apiParam {string} title 课程名/标题
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} course  新创建的课程的内容
 * @apiParamExample {javascript}  接口请求示例
 * axios.post('http://bxg.huoqishi.net/course/new', { title: '新课程'})
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *   errcode: 0,
 *   errmsg: 'ok',
 *   course: {
 *     title: '新课程',
 *     teacher: '12210930193021291',
 *     introduce: '课程介绍',
 *     address: 'http://xx',
 *     minute: 18,
 *     topLever: 1,
 *     childLever: 18,
 *     tag: '课程标签',
 *     cover: '课程封面图片'
 *   }
 * }
 * 
 */
router.post('/course/new', (req, res, next) => {
// 创建新课程, 无则添加，有则响应回去
  const {title} = req.body
  Course.findOne({title})
  .then(doc => {
    if (doc) {
      return res.send({
        errcode: 0,
        errmsg: '该课程已存在',
        course: doc
      })
    }
    const course = new Course({
      title,
    })
    return course.save()
  }, next)
  .then(doc => {
    res.send({
      errcode: 0,
      errmsg: 'ok',
      course: doc
    })
  }, next)
})
