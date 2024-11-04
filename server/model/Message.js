const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.ObjectId,
    ref: 'conversations',
    index: true,
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
  },
  receiverId: {
    type: mongoose.Schema.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const message = mongoose.model('messages', messageSchema)

module.exports = message
