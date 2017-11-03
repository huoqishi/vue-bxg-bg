const http = require('http')
const url = require('url')
const express = require('express')
const socketIO = require('socket.io')
const session = require('express-session')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
const glob = require('glob')
const config = require('./config/config.js')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// 配置允许跨域
app.use((req, res, next) => {
  const origin = req.headers.origin
  const acrm = req.headers['access-control-request-method'] // 预检时有此头
  const options = {'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Credentials': true}
  if (acrm) {
    // 允许跨域!
    const optionsPre = {
      // 允许发送cookie;CORS请求默认不发送Cookie和HTTP认证信息
      // 需要保证xhr.withCredentials值为true,当然，它的的默认值就是
      // Access-Control-Allow-Credentials
      'Access-Control-Allow-Credentials': true,
      // 'Access-Control-Expose-Headers': 'set-cookie', // 允许客户端读取的响应头
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // 允许浏览器发出的请求类型
      'Access-Control-Allow-Headers': 'Content-Type, cookie', // 额外的自定义头信息, 允许用户发出的头信息
      // 'Access-Control-Allow-Headers': 'cookie', // 额外的自定义头信息, 允许用户发出的头信息

      'Access-Control-Max-Age': '36000', // 预检请求的有效期，此期间内，不再次预检,单位秒
      'Content-Type': 'application/json; charset=utf-8'
    }
    Object.assign(options, optionsPre)
    res.set(options)
    res.end('这次请求是用来关闭浏览器的跨域限制的')
    return
  }
  res.set(options)
  // res.setHeader('Access-Control-Allow-Origin', '*')
              // Access-Control-Allow-Origin
              // http://www.lcode.cc/2016/12/06/cors-explain.html
  next()
})
app.use(express.static('./public'))
app.use(express.static('./uploads'))
app.use('/api', express.static('./apidoc'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
  store: new MongoStore({
    url: config.mongodbUrl
  }),
  secret: 'i am a chinese',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 3600 * 1000 * 24 * 7}
}))
// 登陆验证
app.use((request, response, next) => {
  const filtersApi = ['/signin', '/region'] // 未登陆时允许访问的接口
  // const filtersHtml = ['/signin.html'] // 未登陆时允许访问的html页面
  const urlObj = url.parse(request.url)
  if (request.session.user) {
    return next()
  }
  if (filtersApi.find(item => item === urlObj.pathname)) {
    return next()
  }
  // if (filtersHtml.find(item => item === urlObj.pathname)) {
  //   return response.redirect('signin.html')
  // }
  response.send({
    errcode: 10001,
    errmsg: '未登陆，请先登陆'
  })
})
// 动态加载所有控制器(路由)
const files = glob.sync('./controllers/*.js')
files.forEach(file => {
  const router = require(file)
  const arr = router.prefix ? [router.prefix] : []
  arr.push(router)
  typeof router === 'function' ? app.use(router) : console.log(`${file} not provider a router `)
})
// app.use((err, req, res, next) => {
//   res.status(500)
//   res.send({
//     errcode: 15000,
//     errmsg: err
//   })
// })
// if (config.env === 'production')
server.listen(config.PORT, err => {
  if (err) {
    return console.log('listen error', err)
  }
  console.log(`please run at http://${config.IP}:${config.PORT}`)
})
