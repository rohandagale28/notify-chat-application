const { default: mongoose } = require('mongoose')
const conversation = require('../model/Conversation')

const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId

    const exist = await conversation.findOne({ members: { $all: [receiverId, senderId] } })
    if (exist) {
      return res.status(200).json({ data: exist })
    }
    const newConversation = new conversation({
      members: [senderId, receiverId],
    })
    await newConversation.save()
    return res.status(201).json({ message: 'Conversation created successfully' })
  } catch (err) {
    res.send(500).send({ messagen: "Coudn't initiate conversation" })
  }
}

const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId

    // Find existing conversations
    const result = await conversation.aggregate([
      {
        // Match the conversation where both senderId and receiverId are in the members array
        $match: {
          members: {
            $all: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
          },
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
    ])

    // If a conversation is found, return it
    if (result.length > 0) {
      const [{ _id, messages }] = result
      return res.status(200).json({ data: { _id, messages } })
    }

    // If no conversation is found, create a new one
    const newConversation = await conversation.create({
      members: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
    })

    // Return the newly created conversation
    res.status(201).json({ data: newConversation })
  } catch (error) {
    console.error('Error fetching or creating conversation:', error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

module.exports = { newConversation, getConversation }
