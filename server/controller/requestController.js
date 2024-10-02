const { default: mongoose } = require("mongoose");
const request = require("../model/FriendRequest");
const userModel = require("../model/User");
const conversation = require("../model/Conversation");
const conversation = require("../model/Conversation");

//==========|| sending new request ||==========//
const newRequest = async (req, res) => {
    const { sender, receiver } = req.body;

    console.log(sender, receiver, "these are the users coming from the frontend");

    // Validate input
    if (!sender || !receiver) {
        return res.status(400).send({ message: "Both sender and receiver are required" });
    }

    try {
        const user2Update = await request.findOneAndUpdate(
            { userId: receiver },
            { $addToSet: { pendingList: sender } },
            { new: true, upsert: true }
        );

        return res.status(201).send({ message: "request send successfully" });
    } catch (error) {
        console.error("Error updating pendingList:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

//==========|| getting request and contact array ||=========//
const getRequest = async (req, res) => {
    const id = req.params.id;
    console.log(id, "this is id coming from frontend");

    if (!id) {
        return res.status(400).send({ message: "User ID is required" });
    }

    try {
        const result = await request.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(id) } // Match the userId
            },
            {
                $lookup: {
                    from: "users", // The collection name
                    localField: "pendingList",
                    foreignField: "_id",
                    as: "pendingUsers"
                }

            },
            {
                $lookup: {
                    from: "users", // The collection name
                    localField: "contactList",
                    foreignField: "_id",
                    as: "contactUsers"
                }
            },
            {
                $project: {
                    userId: 1,
                    pendingUsers: {
                        $map: {
                            input: "$pendingUsers",
                            as: "user",
                            in: {
                                _id: "$$user._id", // Include the user ID
                                username: "$$user.username", // Include specific fields
                                // Exclude other fields or modify as needed
                            }
                        }
                    },
                    contactUsers: {
                        $map: {
                            input: "$contactUsers",
                            as: "user",
                            in: {
                                _id: "$$user._id", // Include the user ID
                                username: "$$user.username", // Include specific fields
                                // Exclude other fields or modify as needed
                            }
                        }
                    }
                }
            }
        ]);
        if (!result) {
            return res.status(404).send({ message: "No requests found for this user" });
        }

        console.log(result, "this is the result of the request");
        const [{ pendingUsers, contactUsers }] = result
        return res.status(200).json({ pendingList: pendingUsers, contactList: contactUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

//==========|| updating contactList and pendingList ||==========//
const updateRequest = async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        console.log(sender, receiver, "what the fuck is this"); //as object id's

        if (!sender || !receiver) {
            return res.status(400).send({ message: "Both user1 and user2 are required" });
        }

        // First, pull from pendingList
        await request.updateOne(
            { userId: sender },
            { $pull: { pendingList: receiver } }
        );

        // Then, add to contactList without duplicates
        const user = await request.updateOne(
            { userId: sender },
            { $addToSet: { contactList: receiver } }
        );


        await request.updateOne(
            { userId: receiver },
            { $addToSet: { contactList: sender } }
        )

        const conversation = new conversation({ members: { $all: [sender, receiver] } })
        await conversation.save();

        console.log(user, "this is updated user from pending array to contactList");
        return res.status(200).send("Request created successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { newRequest, getRequest, updateRequest };
