const { default: mongoose } = require('mongoose')
const FriendRequest = require('../model/FriendRequest')
const User = require('../model/User')
const Conversation = require('../model/Conversation')

/*------------------ SENDING NEW REQUEST ------------------*/
const newRequest = async (req, res) => {
  const { sender, receiver } = req.body

  if (!sender || !receiver) {
    return res.status(400).json({ message: 'Both sender and receiver are required' })
  }

  try {
    const updateOptions = { new: true, upsert: true }

    await FriendRequest.findOneAndUpdate(
      { userId: receiver },
      { $addToSet: { pendingList: sender } },
      updateOptions
    )

    await FriendRequest.findOneAndUpdate(
      { userId: sender },
      { $addToSet: { pendingList: receiver } },
      updateOptions
    )

    return res.status(201).json({ message: 'Request sent successfully' })
  } catch (error) {
    console.error('Error updating pendingList:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

/*------------------ GETTING CONVERSATION LIST ------------------*/
const getConversationList = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  try {
    const result = await FriendRequest.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'pendingList',
          foreignField: '_id',
          as: 'pendingUsers',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'contactList',
          foreignField: '_id',
          as: 'contactUsers',
        },
      },
      {
        $project: {
          userId: 1,
          pendingUsers: {
            $map: {
              input: '$pendingUsers',
              as: 'user',
              in: {
                _id: '$$user._id',
                username: '$$user.username',
                image: '$$user.image',
              },
            },
          },
          contactUsers: {
            $map: {
              input: '$contactUsers',
              as: 'user',
              in: {
                _id: '$$user._id',
                username: '$$user.username',
                image: '$$user.image',
              },
            },
          },
        },
      },
    ])

    if (!result || !result.length) {
      return res.status(404).json({ message: 'No requests found for this user' })
    }

    const [{ pendingUsers, contactUsers, userId }] = result
    return res
      .status(200)
      .json({ id: userId, pendingList: pendingUsers, contactList: contactUsers })
  } catch (error) {
    console.error('Error fetching conversation list:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

/*------------------ UPDATING CONTACT AND PENDING LIST ------------------*/
const updateRequest = async (req, res) => {
  const { sender, receiver } = req.body

  if (!sender || !receiver) {
    return res.status(400).json({ message: 'Both sender and receiver are required' })
  }

  try {
    await FriendRequest.updateOne({ userId: sender }, { $pull: { pendingList: receiver } })
    await FriendRequest.updateOne({ userId: receiver }, { $pull: { pendingList: sender } })

    await FriendRequest.updateOne({ userId: sender }, { $addToSet: { contactList: receiver } })
    await FriendRequest.updateOne({ userId: receiver }, { $addToSet: { contactList: sender } })

    const newConversation = new Conversation({ members: [sender, receiver] })
    await newConversation.save()

    return res.status(200).json({ message: 'Request updated successfully' })
  } catch (error) {
    console.error('Error updating contact and pending list:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { newRequest, getConversationList, updateRequest }
