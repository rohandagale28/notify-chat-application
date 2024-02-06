const userModel = require("../model/User")

const addUser = async (req, res) => {
    try {
        const account = req.body
        const userExist = await userModel.findOne({ sub: account.sub })
        if (userExist) {
            return res.status(200).json(userExist)
        }
        const newUser = new userModel(account)
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        return res.status(500).send({ message: "Error while creating account", err })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await userModel.findById(id)
        return res.status(200).json(userExist)
    } catch (err) {
        return res.status(500).send({ message: "Error while creating account", err })
    }
}

module.exports = { addUser, getUser }