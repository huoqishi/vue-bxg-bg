const path = require('path')
const express = require('express')
const multer = require('multer')
const Teacher = require('../models/Teacher.js')
const upload = multer({ dest: path.resolve('../uploads') })
const router = express.Router()
module.exports = router
/**
 * @api {get} /user/status 查看用户登陆状态
 * @apiName /user/status
 * @apiGroup Sign
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示已登陆
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} data  将要响应给客户端的数据
 */
router.get('/user/status', (request, response) => {
  response.send({
    errcode: 0,
    errmsg: '用户已登陆!'
  })
})