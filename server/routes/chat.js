var express = require('express')
var router = express.Router()
var Chat = require('../models/Chat')
var Utils = require('./../utils')

// 获取聊天记录
router.get('/', function(req, res) {
  Chat.find({}).then(function(data) {
    if (data.length) {
      res.json(
        Utils.returnSuccess({
          data
        })
      )
    } else {
      res.json(Utils.returnMsg('no Chat!'))
    }
  })
})

router.post('/saveChat', function(req, res) {
  new Chat({
    sendUser: req.body.username,
    sendUserImage: req.body.image,
    sendUserEmail: req.body.email,
    message: req.body.msg,
    receiveUser: req.body.receiveUser,
    receiveUseEmail: req.body.receiveUseEmail,
    receiveUserImage: req.body.receiveUserImage
  })
    .save()
    .then(function() {
      res.json({
        success: 1,
        message: 'save Chat data success!'
      })
    })
})

module.exports = router
