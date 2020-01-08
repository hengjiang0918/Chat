var express = require('express')
var router = express.Router()
var User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('hello word!')
})

module.exports = router
