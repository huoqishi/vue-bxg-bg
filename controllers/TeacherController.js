const path = require('path')
const express = require('express')
const multer = require('multer')
const Teacher = require('../models/Teacher.js')
const upload = multer({ dest: path.resolve('../uploads') })
const router = express.Router()
// hello
module.exports = router

/**
 * @api {get} /teachers 分页获取所有讲师的简要信息
 * @apiName /teachers
 * @apiGroup Teacher
 *
 * @apiParam {number} page 页码
 * @apiParam {number} count 需要的数据条数
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {number} total 总条数
 * @apiSuccess {Array} teachers 查询出的所有讲师信息
 * @apiParamExample {javascript}  接口请求示例
 * axios.get('http://bxg.huoqishi.net/teachers', { params: {page: 1, count: 2}})
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
    "errcode": 0,
    "errmsg": "ok",
    "total": 21,
    "teachers": [
        {
            "_id": "59f90fe49b5463742c8d2cc9",
            "username": "前端学院",
            "email": null,
            "phone": "",
            "birthDay": "2017-11-02T20:17:41.921Z",
            "joinDate": "2017-11-02T20:17:41.921Z",
            "gender": -1,
            "nickname": "哈哈哈哈"
        },{
            "_id": "19f90fe49b5463742c8d2cc2",
            "username": "阳春白雪",
            "email": null,
            "phone": "",
            "birthDay": "2017-11-02T20:17:41.921Z",
            "joinDate": "2017-11-02T20:17:41.921Z",
            "gender": -1,
            "nickname": "阳春黑雪"
        }
    ]
 */
router.get('/teachers', (request, response, next) => {
  let {page, count} = request.query
  page = parseInt(page)
  count = parseInt(count)
  page = page === isNaN || page < 1 ? 1 : page
  count = count === isNaN || count < 1 ? 10 : count
  const skip = (page - 1) * count
  const p1 = Teacher.find({}, ['username', 'nickname', 'status', 'gender', 'phone', 'birthDay', 'joinDate', 'email'].join(' ')).skip(skip).limit(count).exec()
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

// 权限
router.use('/teachers', (request, response, next) => {
  if (request.session.user.type !== 1) {
    return response.send({
      errcode: 14003,
      errmsg: '您不是管理员,没有权限进行操作!'
    })
  }
  next ()
})

/**
 * @api {post} /teacher/new 添加一个新的讲师账号
 * @apiName /teacher/new
 * @apiGroup Teacher
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} joinDate 入职日期
 * @apiParam {number} gender 讲师性别, 0为男， 1为女
 * @apiParam {number} type 讲师类型,0是普通讲师，1是管理员
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiParamExample {javascript}  接口请求示例
 * axios.post('http://bxg.huoqishi.net/teacher/new', {username:'', joinDate: '', type: 0, gender: 1})
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *   errcode: 0,
 *   errmsg: '添加成功'
 * }
 */
router.post('/teachers/new', (request, response, next) => {
  const {username, gender, type, joinDate} = request.body
  if (!username) {
    return response.send({
      errcode: 10001,
      errmsg: '参数不能为空!'
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
      errmsg: '添加成功'
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
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {number} total 查询出的总条数
 * @apiSuccess {Array}  teachers 查询出的所有讲师信息
 * @apiParamExample {javascript}  接口请求示例
 * axios.get('http://bxg.huoqishi.net/teacher/search', { params: {query:'小明'}})
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *   errcode: 0,
 *   errmsg: 'ok',
 *   total: 2,
 *   teachers: [
 *    {
 *        "_id": "59f90fe49b5463742c8d2cc9",
 *        "username": "小明学院",
 *        "email": null,
 *        "phone": "",
 *        "birthDay": "2017-11-02T20:17:41.921Z",
 *        "joinDate": "2017-11-02T20:17:41.921Z",
 *        "gender": -1,
 *        "nickname": "哈哈哈哈"
 *    },{
 *        "_id": "19f90fe49b5463742c8d2cc2",
 *        "username": "阳春小明",
 *        "email": null,
 *        "phone": "",
 *        "birthDay": "2017-11-02T20:17:41.921Z",
 *        "joinDate": "2017-11-02T20:17:41.921Z",
 *        "gender": -1,
 *        "nickname": "阳春黑雪"
 *    }
 *   ]
 * }
 */
router.get('/teachers/search', (request, response, next) => {
  let {query} = request.query
  const reg = new RegExp(query, 'ig')
  const p1 = Teacher.find({username: reg}, ['username', 'nickname', 'gender', 'phone', 'birthDay', 'joinDate', 'email'].join(' ')).exec()
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

/**
 * @api {get} /teachers/edit 获取讲师需要被编辑的讲师信息
 * @apiName teachers/edit2
 * @apiGroup Teacher
 *
 * @apiParam {string} _id 要编辑的讲师的id
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} teacher  所查询到的用户信息
 * @apiParamExample {javascript}  接口请求示例
 * axios.get('http://bxg.huoqishi.net/teachers/edit', {params: {_id: '59fb84fb6c220d055206f503'}})
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *   username: '小明明'
 *   joinDate: '1998-1-1',
 *   type: 0,
 *   gender: 1
 * }
 */
router.get('/teachers/edit', (request, response, next) => {
  const {_id} = request.query
  if ([12, 24].indexOf(_id && _id.length) === -1) {
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
 * @api {get} /teachers/{_id} 查看讲师详细信息
 * @apiName teachers/{_id}
 * @apiGroup Teacher
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Object} teacher  所查询到的用户信息
 * @apiParamExample {javascript}  接口请求示例
 * axios.get('http://bxg.huoqishi.net/teacher/59f90fe49b5463742c8d2cc9')
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *   errcode: 0,
 *   errmsg: 'ok',
 *   teacher: {
 *     "_id": "59f90fe49b5463742c8d2cc9",
 *     "username": "全栈学院",
 *     "email": "w4e3w43",
 *     "isdel": false,
 *     "created": "2017-11-03T05:25:39.479Z",
 *     "introduce": "\n  马云,1964年9月10日生于浙江省杭州市，祖籍浙江省嵊州市（原嵊县）谷来镇， 阿里巴巴集团主要创始人，现担任阿里巴巴集团董事局主席、日本软银董事、大自然保护协会中国理事会主席兼全球董事会成员、华谊兄弟董事、生命科学突破奖基金会董事。\n  [1] 1988年毕业于杭州师范学院外语系，同年担任杭州电子工业学院英文及国际贸易教师，\n  1995年创办中国第一家互联网商业信息发布网站“中国黄页”，\n  1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理，\n  1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席。",
 *     "district": "330682",
 *     "city": "330600",
 *     "province": "330000",
 *     "type": 1,
 *     "status": 0,
 *     "phone": "345345435",
 *     "birthDay": "2017-11-03T00:46:57.734Z",
 *     "joinDate": "2017-11-03T00:46:57.734Z",
 *     "gender": -1,
 *     "avatar": "386b9c6736c7abe732139cfa8f07724e",
 *     "nickname": "院学栈全a"
 *   }
 * }
 */
router.get('/teachers/:_id', (request, response, next) => {
  const {_id} = request.params
  if ([12, 24].indexOf(_id && _id.length) === -1) {
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
 * @api {post} /teachers/edit 更新被编辑的讲师信息
 * @apiName teachers/edit
 * @apiGroup Teacher
 *
 * @apiParam {string} _id 要编辑的讲师的id
 * @apiParam {string} joinDate 讲师的入职日期
 * @apiParam {number} type 讲师类型
 * @apiParam {number} gender 讲师性别
 * @apiParam {string} username 讲师姓名
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiParamExample {javascript}  接口请求示例
 * axios.get('http://bxg.huoqishi.net/teacher/edit', {
 *   _id: '59f90fe49b5463742c8d2cc9', joinDate: '1997-1-1', type: 0, gender: 0, username: '小明讲师'})
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *  errcode: 0,
 *  errmsg: 'ok'
 * }
 */
router.post('/teachers/edit', (request, response, next) => {
  // *注意:* 传入的_id如果不是12或者24位则会报错
  const {_id, username, joinDate, type, gender} = request.body
  if ([12, 24].indexOf(_id && _id.length) === -1) {
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
 * @apiName teachers/handler
 * @apiGroup Teacher
 *
 * @apiParam {string} _id 要编辑的讲师的id
 * @apiParam {string} status 讲师的目标状态, 0表示已被注销, 1表示已被启用
 *
 * @apiSuccess {string} errcode 错误标识码, 为0时表示没有错误,且操作成功!
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {string} status  修改后讲师的状态
 * @apiParamExample {javascript}  接口请求示例
 * axios.get('http://bxg.huoqishi.net/teacher/edit', {
 *   _id: '59f90fe49b5463742c8d2cc9',
 *   status: 0 // 讲师的status将被修改为0
 *   })
 * .then(res => {})
 * @apiSuccessExample {javascript} 响应结果示例
 * {
 *   errcode: 0,
 *   errmsg: '修改成功',
 *   status: 0 // 修改后的讲师状态
 * }
 */
router.post('/teachers/handler', (request, response, next) => {
  // *注意:* 传入的_id如果不是12或者24位则会报错
  // mongoose.Types.ObjectId()
  const {_id, status} = request.body
  if ([12, 24].indexOf(_id && _id.length) === -1) {
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


