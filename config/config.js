/**
 * generate configuration according to environment
 */

const base = require('./config-base.js')

let devOrProd
if (process.env.NODE_ENV === 'production') {
  devOrProd = require('./config-prod.js')
} else {
  devOrProd = require('./config-dev.js')
}

// the dev or prod will cover base
const merge = Object.assign(base, devOrProd)
module.exports = merge
