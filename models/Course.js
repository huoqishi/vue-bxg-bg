const mongoose = require('mongoose')
const db = require('./db.js')
const courseSchema = mongoose.Schema({
  title: { // 课程名称/标题
    type: String
  },
  introduce: { // 课程描述/介绍
    type: String
  },
  teacher: { // 课程讲师的_id(12或24)
    type: String,
  },
  topLevel: { // 课程所属的1级分类
    type: Number
  },
  childLevel: { // 课程所属的2级分类
    type: Number
  },
  tag: { // 课程标签
    type: String
  },
  cover: { // 课程图片
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
const course = mongoose.model('course', courseSchema, 'courses')
module.exports = course
