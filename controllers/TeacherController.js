const path = require('path')
const express = require('express')
const multer = require('multer')
const Teacher = require('../models/Teacher.js')
const upload = multer({ dest: path.resolve('../uploads') })
const router = express.Router()
module.exports = router
/**
 * @api {post} /signin 登陆讲师账号
 * @apiName signin
 * @apiGroup Sign
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 用户密码
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误1
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} data  将要响应给客户端的数据
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
    request.session.teacher = doc
    const data = Object.assign(doc, {password: undefined})
    response.send({
      errcode: 0,
      errmsg: 'ok',
      data
    })
  }, next)
})

/**
 * @api {post} /signout 退出登陆状态
 * @apiName signout
 * @apiGroup Sign
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/signout', (request, response, next) => {
  const result = delete request.session.teacher
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
 * @apiGroup UserInfo
 *
 * @apiParam {Buffer} avatar 一张头像图片
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {string} avatarUrl 新头像地址
 */
router.post('/avatar', upload.single('avatar'), (request, response) => {
  if (!request.file) {
    return response.send({
      errcode: 1001,
      errmsg: '图片上传失败'
    })
  }
  response.send({
    errcode: 0,
    errmsg: 'ok',
    avatarUrl: request.file.path
  })
})
/**
 * @api {get} /userinfo 获取用户个人资料
 * @apiName userinfo
 * @apiGroup UserInfo
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} userinfo  所查询到的用户信息
 */
router.get('/userinfo', (request, response, next) => {
  const {_id} = request.params
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  Teacher.findOne({_id}) // *注意:* 传入的_id如果不是12或者24位则会报错
  .then(doc => {
    if (!doc) {
      return response.send({
        errcode: 10001,
        errmsg: '用户不存在'
      })
    }
    const teacher = Object.assign(doc, {password: undefined})
    response.send({
      errcode: 0,
      errmsg: 'ok',
      teacher: teacher
    })
  }, next)
})
/**
 * @api {post} /userinfo 更新讲师个人资料
 * @apiName userinfo
 * @apiGroup UserInfo
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
 * @apiParam {string} birttDay 讲师生日
 * @apiParam {string} introduce 讲师介绍
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/teacher/update', (request, response) => {
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
  const _id = request.session.user
  t.updateMany({_id}, {
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
      const teacher = Object.assign(doc, {password: undefined})
      response.send({
        errcode: 0,
        errmsg: 'ok',
        teacher
      })
    }, next)
})

/**
 * @api {post} /teacher/new 添加一个新的讲师账号
 * @apiName /teacher/new
 * @apiGroup Teacher
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 用户密码
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/teacher/new', (request, response, next) => {
  const {username, password} = request.body
  if (!username || !password) {
    return response.send({
      errcode: 10001,
      errmsg: '用户名或者密码不能为空!'
    })
  }
  const p = Teacher.findOne({username}).exec()
  const p2 = p.then(doc => {
    if (doc) {
      return response.send({
        errcode: 10001,
        errmsg: '用户已存在!'
      })
    }
    const u = new teacher({username, password})
    const p2 = u.save()
    return p2
  })
  p2.then(doc => {
    response.send({
      errcode: 0,
      errmsg: 'ok'
    })
  }, next)
})

/**
 * @api {get} /teachers/{_id} 查看讲师详细信息
 * @apiName teacher/{_id}
 * @apiGroup Teacher
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} teacher  所查询到的用户信息
 */
router.get('/teachers/:_id', (request, response, next) => {
  const {_id} = request.params
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  Teacher.findOne({_id}) // *注意:* 传入的_id如果不是12或者24位则会报错
  .then(doc => {
    if (!doc) {
      return response.send({
        errcode: 10001,
        errmsg: '用户不存在'
      })
    }
    const teacher = Object.assign(doc, {password: undefined})
    response.send({
      errcode: 0,
      errmsg: 'ok',
      teacher: teacher
    })
  }, next)
})

/**
 * @api {get} /teachers/edit 获取讲师需要被编辑的资料
 * @apiName teacher/edit
 * @apiGroup Teacher
 *
 * @apiParam {string} _id 要编辑的讲师的id
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} teacher  所查询到的用户信息
 */
router.get('/teacher/edit', (request, response, next) => {
  const {_id} = request.query
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  Teacher.findOne({_id}, ['username', 'joinDate', 'type', 'gender'].join(' ')) // *注意:* 传入的_id如果不是12或者24位则会报错
  .then(doc => {
    if (!doc) {
      return response.send({
        errcode: 10001,
        errmsg: '讲师不存在'
      })
    }
    const teacher = Object.assign(doc, {password: undefined})
    response.send({
      errcode: 0,
      errmsg: 'ok',
      teacher: teacher
    })
  }, next)
})
/**
 * @api {post} /teachers/update 更新被编辑的讲师信息
 * @apiName teacher/update
 * @apiGroup Teacher
 *
 * @apiParam {string} _id 要编辑的讲师的id
 * @apiParam {string} joinDate 讲师的入职日期
 * @apiParam {number} type 讲师类型
 * @apiParam {number} gender 讲师性别
 * @apiParam {string} username 讲师姓名
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/teacher/update', (request, response, next) => {
  // *注意:* 传入的_id如果不是12或者24位则会报错
  const {_id, username, joinDate, type, gender} = request.body
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  Teacher.updateMany({_id}, {_id, username, joinDate, type, gender})
  .then(result => {
    if (result.n <= 0) {
      return response.send({
        errcode: 10001,
        errmsg: '讲师不存在，请确认_id是不是正确'
      })
    }
    response.send({
      errcode: 0,
      errmsg: 'ok'
    })
  }, next)
})

/**
 * @api {post} /teachers/handler 注销或者启用讲师
 * @apiName teacher/handler
 * @apiGroup Teacher
 *
 * @apiParam {string} _id 要编辑的讲师的id
 * @apiParam {string} status 讲师的状态, 0表示已被注销, 1表示已被启用
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {string} status  修改后讲师的状态
 */
router.post('/teacher/handler', (request, response, next) => {
  // *注意:* 传入的_id如果不是12或者24位则会报错
  // mongoose.Types.ObjectId()
  const {_id, status} = request.body
  if ([12, 24].indexOf(_id && _id.length) !== -1) {
    return response.send({
      errcode: 10001,
      errmsg: '正确的_id应该是一个长度为12或者24的字符串'
    })
  }
  Teacher.updateMany({_id}, {_id, status})
  .then(result => {
    // { ok: 0, n: 0, nModified: 0 }
    if (result.n <= 0) {
      return response.send({
        errcode: 10001,
        errmsg: '讲师不存在'
      })
    }
    response.send({
      errcode: 0,
      errmsg: 'ok'
    })
  }, next)
})

/**
 * @api {get} /teachers 分页获取所有讲师的简要信息
 * @apiName /teachers
 * @apiGroup Teacher
 *
 * @apiParam {string} page 页码
 * @apiParam {string} count 需要的数据条数
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {number} total 总条数
 * @apiSuccess {Array} teachers 查询出的所有讲师信息
 */
router.get('/teachers', (request, response, next) => {
  let {page, count} = request.body
  page = parseInt(page)
  count = parseInt(count)
  page = page === isNaN || page < 1 ? 1 : page
  count = count === isNaN || count < 1 ? 10 : count
  const skip = (page - 1) * count
  const p1 = Teacher.find({}, ['username', 'nickname', 'gender', 'phone', 'birthDay', 'joinDate', 'email'].join(' ')).skip(skip).limit(count).exec()
  const p2 = Teacher.count({})
  Promise.all([p1, p2]).then(results => {
    results[0].forEach(item => item.password = undefined)
    response.send({
      errcode: 0,
      errmsg: 'ok',
      total: results[1],
      teachers: results[0]
    })
  }, next)
})

/**
 * @api {get} /teachers/search 搜索讲师
 * @apiName /teachers/search
 * @apiGroup Teacher
 *
 * @apiParam {string} query 查询条件
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {number} total 查询出的总条数
 * @apiSuccess {Array} teachers 查询出的所有讲师信息
 */
router.get('/teachers/search', (request, response, next) => {
  let {query} = request.body
  const reg = new RegExp(query, 'ig')
  const p1 = Teacher.find({username: reg}, ['username', 'nickname', 'gender', 'phone', 'birthDay', 'joinDate', 'email'].join(' ')).skip(skip).limit(count).exec()
  const p2 = Teacher.count({username: reg})
  Promise.all([p1, p2]).then(results => {
    results[0].forEach(item => item.password = undefined)
    response.send({
      errcode: 0,
      errmsg: 'ok',
      total: results[1],
      teachers: results[0]
    })
  }, next)
})