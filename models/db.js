const mongoose = require('mongoose')
const config = require('../config/config.js')
mongoose.connect(config.mongodbUrl)
