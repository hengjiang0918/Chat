const mongoose = require('mongoose')
const chatSchema = mongoose.Schema(
  {
    sendUser: String,
    sendUserEmail: String,
    sendUserImage: String,
    receiveUser: String,
    receiveUseEmail: String,
    receiveUserImage: String,
    message: String
  },
  {
    timestamps: {
      createdAt: 'createtime',
      updatedAt: 'updatetime'
    }
  }
)

module.exports = mongoose.model('Chat', chatSchema)
