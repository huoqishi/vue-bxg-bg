const mongoose = require('mongoose')
const db = require('./db.js')
const categorySchema = mongoose.Schema({
  catName: {
    type: String,
  },
  catLevel: {
    type: Number
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
const category = mongoose.model('category', categorySchema, 'categorys')
module.exports = category
