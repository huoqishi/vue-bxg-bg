const path = require('path')
const url = require('url')
const express = require('express')
const multer = require('multer')
const config = require('../config/config.js')
const Teacher = require('../models/Teacher.js')
const upload = multer({ dest: path.resolve('../uploads') })
const router = express.Router()
module.exports = router
/**
 * @api {get} /user/status 查看用户登陆状态
 * @apiName /user/status
 * @apiGroup User
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示已登陆
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.get('/user/status', (request, response) => {
  response.send({
    errcode: 0,
    errmsg: '用户已登陆!'
  })
})

/**
 * @api {post} /signin 登陆讲师账号
 * @apiName signin
 * @apiGroup User
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 用户密码
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} user    当前登陆的用户的部分信息
 */
router.post('/signin', (request, response, next) => {
  const {username, password} = request.body
  const p = Teacher.findOne({username, password}).exec()
  p.then(doc => {
    if (!doc) {
      return response.send({
        errcode: 10001,
        errmsg: '用户名或者密码不正确'
      })
    }
    request.session.user = doc
    const user = {
      _id: doc._id,
      username: doc.username,
      avatar: doc.avatar
    }
    user.avatar = url.resolve(config.host, user.avatar)
    response.send({
      errcode: 0,
      errmsg: 'ok',
      user
    })
  }, next)
})

/**
 * @api {post} /signout 退出登陆状态
 * @apiName signout
 * @apiGroup User
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/signout', (request, response, next) => {
  const result = delete request.session.user
  if (result) {
    return response.send({
      errcode: 0,
      errmsg: '已退出登陆'
    })
  }
  response.send({
    errcode: 0,
    errmsg: '退出登陆失败'
  })
})
/**
 * @api {get} /avatar 修改用户个人头像
 * @apiName /avatar
 * @apiGroup User
 *
 * @apiParam {Buffer} avatar 一张头像图片
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {string} avatar 新头像地址
 */
router.post('/avatar', upload.single('avatar'), (request, response, next) => {
  if (!request.file) {
    return response.send({
      errcode: 1001,
      errmsg: '图片上传失败'
    })
  }
  const {_id} = request.session.user
  const filename = path.basename(request.file.path)
  Teacher.updateMany({_id}, {avatar: filename})
  .then(result => {
      response.send({
        errcode: 0,
        errmsg: 'ok',
        avatar: url.resolve(config.host, filename)
      })
    },next)
})
/**
 * @api {get} /userinfo 获取个人资料
 * @apiName userinfo
 * @apiGroup User
 * 
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} user    所查询到的个人资料
 * 
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *    "errcode":0,
 *    "errmsg":"ok",
 *    "user":{
 *     "_id":"59f90fe49b5463742c8d2cc9",
 *     "username":"前端学院",
 *     "isdel":false,
 *     "created":"2017-11-02T18:44:14.504Z",
 *     "type":0,
 *     "status":0,
 *     "gender":-1,
 *     "avatar":"/img/avatar.jpg"
 *    }
 *  }
 */
router.get('/userinfo', (request, response, next) => {
  // const {_id} = request.params
  // if ([12, 24].indexOf(_id && _id.length) !== -1) {
  //   return response.send({
  //     errcode: 10001,
  //     errmsg: '正确的_id应该是一个长度为12或者24的字符串'
  //   })
  // }
  const {_id} = request.session.user
  Teacher.findOne({_id}) // *注意:* 传入的_id如果不是12或者24位则会报错
  .then(doc => {
    if (!doc) {
      return response.send({
        errcode: 10001,
        // session: request.session,
        errmsg: '用户不存在a:' + _id
      })
    }
    const user = Object.assign(doc, {password: undefined})
    response.send({
      errcode: 0,
      errmsg: 'ok',
      user
    })
  }, next)
})
/**
 * @api {post} /userinfo 更新个人资料
 * @apiName userinfo
 * @apiGroup User
 *
 * @apiParam {string} username 讲师姓名
 * @apiParam {string} nickname 讲师昵称
 * @apiParam {number} gender 讲师性别
 * @apiParam {string} province 讲师所在省
 * @apiParam {string} city 讲师所在市
 * @apiParam {string} district 讲师所在区
 * @apiParam {string} phone 讲师手机号
 * @apiParam {string} email 讲师邮箱
 * @apiParam {string} joinDate 讲师入职日期
 * @apiParam {string} birthDay 讲师生日
 * @apiParam {string} introduce 讲师介绍
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/userinfo', (request, response, next) => {
  const {
    username,
    nickname,
    gender,
    phone,
    email,
    joinDate,
    birthDay,
    introduce,
    province,
    city,
    district} = request.body
  const {_id} = request.session.user
  Teacher.updateMany({_id}, {
    username,
    nickname,
    gender,
    phone,
    email,
    joinDate,
    birthDay,
    introduce,
    province,
    city,
    district}).then((doc) => {
      // const teacher = Object.assign(doc, {password: undefined})
      response.send({
        errcode: 0,
        errmsg: '更新成功'
      })
    }, next)
})

/**
 * @api {get} /region 获取全国省市区数据
 * @apiName region
 * @apiGroup Region
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} region  全国省市区数据
 */
router.get('/region', (request, response) => {
  // result.sendFile('../public/region.json')
  const region = require('../public/region.json')
  response.send({
    errcode: 0,
    errmsg: 'ok',
    region
  })
})
