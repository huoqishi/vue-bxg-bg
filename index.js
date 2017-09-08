const http = require('http')

const express = require('express')
const socketIO = require('socket.io')
const session = require('express-session')
const bodyParser = require('body-parser')
const glob = require('glob')
const config = require('./config/config.js')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(session({
  secret: 'i am a chinese',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 动态加载所有控制器(路由)
const files = glob.sync('./controllers/*.js')
files.forEach(file => {
  const router = require(file)
  typeof router === 'function' ? app.use(router.prefix, router) : console.log(`${file} not provider a router `)
})

// if (config.env === 'production')
server.listen(config.PORT, err => {
  if (err) {
    return console.log('listen error', err)
  }
  console.log(`please run at http://${config.IP}:${config.PORT}`)
})
