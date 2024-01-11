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
        const convo = await conversation.findOne({ members: { $all: [senderId, receiverId] } })
        return res.status(200).json(convo)
    } catch (err) {
        res.send(500).json({ message: "Fail to create new conversation" })
    }
}

module.exports = { newConversation, getConversation }