const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    text: {
        type: String
    },
    type: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
)

const message = mongoose.model("message", messageSchema)


module.exports = message