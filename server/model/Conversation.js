const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.ObjectId],
    },
  },
  {
    timestamps: true,
  }
)

const conversation = mongoose.model('conversation', ConversationSchema)

module.exports = conversation
