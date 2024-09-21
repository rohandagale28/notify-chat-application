const { default: mongoose } = require("mongoose")
const conversation = require("../model/Conversation")

const newConversation = async (req, res) => {
    try {
        const senderId = req.body.senderId
        const receiverId = req.body.receiverId

        const exist = await conversation.findOne({ members: { $all: [receiverId, senderId] } })
        if (exist) {
            return res.status(200).json({ data: exist })
        }
        const newConversation = new conversation({
            members: [senderId, receiverId]
        })
        await newConversation.save()
        return res.status(201).json({ message: "Conversation created successfully" })
    } catch (err) {
        res.send(500).send({ messagen: "Coudn't initiate conversation" })
    }
}

const getConversation = async (req, res) => {
    try {
        const senderId = req.body.senderId
        const receiverId = req.body.receiverId
        console.log(senderId, receiverId)
        const result = await conversation.aggregate([
            {
                // Match the conversation where both senderId and receiverId are in the members array
                $match: {
                    members: { $all: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)] },
                },
            },
            {
                // Lookup the messages based on the conversation _id
                $lookup: {
                    from: 'messages', // Messages collection
                    localField: '_id', // Conversation's _id
                    foreignField: 'conversationId', // Message's conversationId
                    as: 'messages', // The field where the messages will be added
                },
            },
            {
                // Optionally sort the messages by creation time
                $sort: {
                    'messages.createdAt': 1, // Sort messages by creation date
                },
            },
        ]);
        console.log(result)
        res.status(200).json({ data: result })
    } catch (error) {
        console.error('Error fetching conversation with messages:', error);
        throw error;
    }
}

module.exports = { newConversation, getConversation }