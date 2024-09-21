const message = require("../model/Message")

const newMessage = async (req, res) => {
    const { senderId, receiverId, conversationId, type, text } = req.body
    console.log(senderId, receiverId, conversationId, type, text)
    try {
        const newMessage = new message({ senderId, receiverId, conversationId, type, text })
        await newMessage.save()
        return res.status(200).send("message send successfully")
    } catch (err) {
        res.status(500).send("not found")
    }
}

// const currentDate = new Date();

// // Set the start time of the current day (midnight)
// currentDate.setHours(0, 0, 0, 0);

// // Set the end time of the current day (just before midnight)
// const endOfDay = new Date(currentDate);
// endOfDay.setHours(23, 59, 59, 999);

const getMessages = async (req, res) => {
    try {
        const messages = await message.find({ conversationId: req.params.id })
        return res.status(200).json({ data: messages.reverse() })
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = { newMessage, getMessages }