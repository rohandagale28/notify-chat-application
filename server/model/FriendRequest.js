const mongoose = require('mongoose')

const friendRequestSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'users' },
  pendingList: {
    type: [mongoose.Schema.ObjectId], 
    ref: 'users',
    default: [], 
  },
  contactList: {
    type: [mongoose.Schema.ObjectId], 
    ref: 'users', 
    default: [],
  },
})

const request = mongoose.model('request', friendRequestSchema)

module.exports = request
