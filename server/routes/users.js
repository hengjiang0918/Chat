var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
var User = require('../models/User')
var Utils = require('./../utils')

/* GET users listing. */
// 注册
router.post('/signUp', function(req, res) {
  let email = req.body.email
  let username = req.body.name
  let password = req.body.pwd
  User.findOne({
    email: email
  })
    .then(function(userInfo) {
      if (userInfo) {
        res.json(Utils.returnMsg('The email has been registered!'))
        return Promise.reject(false)
      } else {
        var user = new User({
          email,
          username,
          password,
          image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          state: false
        })
        return user.save()
      }
    })
    .then(function(UserInfo) {
      delete UserInfo.password

      let resData = {
        email: UserInfo.email,
        username: UserInfo.username,
        image: UserInfo.image
      }
      const token = jwt.sign(resData, 'admin')
      res.json(
        Utils.returnSuccess({
          data: {
            ...resData
          },
          extData: {
            token
          }
        })
      )
    })
})

// 登录
router.post('/signIn', function(req, res, next) {
  var email = req.body.email
  var password = req.body.pwd
  var resData = {}
  User.findOne({
    email,
    password
  }).then(function(UserInfo) {
    if (!UserInfo) {
      res.json(Utils.returnMsg('Incorrect user name or password!'))
      return false
    } else {
      let resData = {
        email: UserInfo.email,
        username: UserInfo.username,
        image: UserInfo.image
      }
      const token = jwt.sign(resData, 'admin')
      res.json(
        Utils.returnSuccess({
          msg: 'Login successful!',
          data: {
            ...resData
          },
          extData: {
            token
          }
        })
      )
      return
      if (userInfo.state) {
        resData.success = 0
        resData.message = 'The user is logged in!'
        res.json(resData)
        return false
      } else {
        User.update(
          {
            _id: userInfo._id
          },
          {
            state: true
          }
        ).then(function() {
          resData.success = 1
          resData.message = 'Login successful!'
          res.cookie('user', userInfo.username, { maxAge: 1000 * 60 * 60 })
          res.json(resData)
          // next()
        })
      }
    }
  })
})


module.exports = router
