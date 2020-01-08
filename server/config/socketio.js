var socket_io = require('socket.io')
const jwt = require('jsonwebtoken')
var User = require('./../models/User')
var Chat = require('./../models/Chat')
var socketio = {} // 获取io
// let clientList = {} // 客户端连接用户
// let adminList = {} // 客户端连接用户
let io = null
var online_user = []

socketio.getSocketio = function(server) {
  // http(s) server
  io = socket_io.listen(server)
  io.of('/chat').on('connection', function(socket) {
    console.log('websocket.io:', socket.id)
    let token = socket.handshake.query.token
    if (token) {
      let data = jwt.verify(token, 'admin')
      let username = data.username
      socket.username = username
      socket.userInfo = data
      socket.userToken = data.token
      let step = false
      for (let i = 0; i < online_user.length; i++) {
        const ele = online_user[i]
        if (ele.token == token) {
          ele.socketId = socket.id
          step = true
          break;
        }
      }
      !step &&
        online_user.push({
          ...data,
          token,
          socketId: socket.id
        })
      // socket.emit('loginSuccess', data)
      socket.broadcast.emit('user_list', online_user)
      socket.broadcast.emit('userIn', username)
    }

    socket.on('login', function(data) {
      //登录
      var username = data.username
      socket.username = username
      socket.userInfo = data
      socket.userToken = data.token
      data.socketId = socket.id
      online_user.push(data)
      // socket.emit('loginSuccess', data)
      socket.broadcast.emit('user_list', online_user)
      socket.broadcast.emit('userIn', username)
    })

    // 在线人数
    socket.on('get_user_list', function(data) {
      socket.emit('user_list', online_user)
    })
    // 断开
    socket.on('disconnect', function(data) {
      var username = data.username || socket.username
      var userToken = data.userToken || socket.userToken
      if (userToken) {
        console.log('disable socket清除在线')
        online_user.forEach((ele, index) => {
          if (ele.token === userToken) {
            online_user.splice(index, 1)
          }
        })
        socket.broadcast.emit('user_list', online_user)
        socket.broadcast.emit('userOut', username)
      }
    })

    socket.on('postNewMsg', function(data) {
      //接收群新消息
      new Chat({
        sendUser: data.username,
        sendUserEmail: data.email,
        sendUserImage: data.image,
        message: data.msg
      })
        .save()
        .then(function() {})
      socket.broadcast.emit('GroupNewMsg', data)
    })

    // 接受私聊消息
    socket.on('postPrivateNewMsg', function(data) {
      new Chat({
        sendUser: data.msgObj.username,
        sendUserEmail: data.msgObj.email,
        sendUserImage: data.msgObj.image,
        message: data.msgObj.msg,
        receiveUser: data.receiveUser.username,
        receiveUseEmail: data.receiveUser.email,
        receiveUserImage: data.receiveUser.image
      })
        .save()
        .then(function() {})
      socket.to(data.receiveUser.socketId).emit('onPrivateNewMsg', data.msgObj)
    })

    socket.on('postImg', function(data) {
      //接收到图片
      socket.broadcast.emit('newImg', data)
    })

    // 私聊建立连接
    socket.on('privateLink', function(data) {
      console.log('请求进入私聊房间', data)
      socket.to(data['receiveUser'].socketId).emit('onPrivateLink', data['sendUser'])
    })

    // 返回私聊请求状态
    socket.on('privateLinkStatus', function(data) {
      socket.to(data.info.socketId).emit('onPrivateLinkStatus', data)
    })

    socket.on('edit', function(data) {
      var username = data.username || socket.username
      User.findOne({
        username: username
      })
        .then(function(userInfo) {
          return User.update(
            {
              _id: userInfo._id
            },
            {
              username: data.newName,
              image: data.newImage
            }
          )
        })
        .then(function() {
          socket.username = data.newName
          return User.find()
        })
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {
            if (!data[i].state) {
              data.splice(i, 1)
            }
          }
          socket.emit('user_list', data)
          socket.broadcast.emit('user_list', data)
        })
    })
  })
}
module.exports = socketio
