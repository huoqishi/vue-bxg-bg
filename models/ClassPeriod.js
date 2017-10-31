const mongoose = require('mongoose')
const db = require('./db.js')
const classPeriodSchema = mongoose.Schema({
  title: { // 课时名称/标题
    type: String
  },
  introduce: { // 课时描述/介绍
    type: String
  },
  address: { // 课时视频地址
    type: String,
  },
  minute: { // 课程时长分钟
    type: Number
  },
  second: { // 课程时长秒
    type: Number
  },
  recommend_duration: { // 建议学习时长
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
const classPeriod = mongoose.model('classPeriod', classPeriodSchema, 'classPeriods')
module.exports = classPeriod
