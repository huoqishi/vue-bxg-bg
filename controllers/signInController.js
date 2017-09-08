const express = require('express')
const router = module.exports = express.Router()

router.prefix = '/'

router.post('/signin', (req, res, next) => {
  res.send('signin is ok')
})

router.get('/test', (req, res, next) => {
  res.send('test is ok')
})
