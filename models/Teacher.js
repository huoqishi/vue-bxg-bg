const mongoose = require('mongoose')
const db = require('./db.js')
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  avatar: { // 头像
    type: String,
    default: '/img/avatar.jpg'
  },
  gender: {
    type: Number,
    default: -1, // 0 是男孩，1是女孩，-1是未设置值
  },
  joinDate: { // 入职日期
    type: Date
  },
  birthDay: { // 生日
    type: Date
  },
  phone: { // 手机号
    type: String
  },
  status: { // 讲师的状态，0表示已被注销，1表示已被启用
    type: Number,
    default: 0
  },
  type: { // 用户类型, 0是普通讲师，1是管理员
    type: Number,
    default: 0,
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  district: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  isdel: {
    type: Boolean,
    default: false
  }
})
const User = mongoose.model('user', userSchema, 'users')
module.exports = User
