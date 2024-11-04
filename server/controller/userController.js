const userModel = require('../model/User')
const jwt = require('jsonwebtoken')

//==========|| registration ||==========//
const addUser = async (req, res) => {
  try {
    const account = req.body

    const userExist = await userModel.findOne({ sub: account.sub })

    if (userExist) {
      return res.status(409).json({ success: true, message: 'user already exist' })
    }

    const newUser = new userModel(account)
    await newUser.save()
    res.status(201).json({ success: true, message: 'new user created' })
  } catch (err) {
    return res.status(500).send({ message: 'Error while creating account', err })
  }
}

//==========|| searching contacts with username ||==========//
const getUser = async (req, res) => {
  try {
    const searchQuery = req.params.id

    const users = await userModel.aggregate([
      {
        $match: {
          username: { $regex: searchQuery, $options: 'i' }, // Case-insensitive regex search
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          image: 1,
        },
      },
    ])

    return res.status(200).json({ data: users })
  } catch (err) {
    return res.status(500).send({ message: 'Error while fetching users', err })
  }
}

module.exports = { addUser, getUser }
