const { default: mongoose } = require("mongoose");
const requestModel = require("../model/FriendRequest");
const userModel = require("../model/User");

const newRequest = async (req, res) => {
    try {
        const { user1, user2 } = req.body;

        console.log(user1, user2);

        // Ensure user1 and user2 are present
        if (!user1 || !user2) {
            return res.status(400).send({ message: "Both user1 and user2 are required" });
        }

        // Update the request model
        const user = await requestModel.findOneAndUpdate(
            { userId: user2 }, // Search by user2 (userId)
            { $addToSet: { pendingList: user1 } }, // Add user1 to pendingList without duplicates
            { new: true, upsert: true } // Create a new document if not found
        );

        console.log(user);
        return res.status(200).send("Request created successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

const getRequest = async (req, res) => {
    const id = req.params.id;
    console.log(id, "this is id coming from frontend");

    if (!id) {
        return res.status(400).send({ message: "User ID is required" });
    }

    try {
        const result = await requestModel.aggregate([
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
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { newRequest, getRequest };
