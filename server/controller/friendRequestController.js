const requestModel = require("../model/FriendRequest")


const newRequest = async (req, res) => {
    try {
        const { user1, user2 } = req.body
        const existingRequest = await requestModel.findOne({ user1, user2 }).populate('user1')
        if (existingRequest) {
            return res.status(200).send({ message: "already send" })
        }
        const data = await new requestModel({ user1: user1, user2: user2 })
        await data.save()
        return res.status(200).send("user created successfully")
    } catch (error) {
        return res.status(500)
    }
};

const getRequest = async (req, res) => {
    const id = req.params.id
    console.log(id)
    if (!id) {
        return res.status(400).send({ message: "User ID is required" })
    } else {
        const result = await requestModel.find({ user1: id }).populate("user1")
        console.log(result)
        const newResult = result.map((item) => { return (item.user1.sub) })
        console.log(newResult)
        return res.send({ request: result })
    };
};



module.exports = { newRequest, getRequest };