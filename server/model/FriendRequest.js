const mongoose = require("mongoose");

const friendRequestSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "users" },
    pendingList: {
        type: [mongoose.Schema.ObjectId],  // Array of ObjectIds
        ref: "users",                       // Reference to the users collection
        default: [],                        // Default to an empty array
    },
    contactList: {
        type: [mongoose.Schema.ObjectId],  // Array of ObjectIds
        ref: "users",                       // Reference to the users collection
        default: [],
    }
});

const requestModel = mongoose.model("request", friendRequestSchema);

module.exports = requestModel;
