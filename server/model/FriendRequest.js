const mongoose = require("mongoose")


const friendRequestSchema = mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});


const requestModel = mongoose.model("request", friendRequestSchema)


module.exports = requestModel