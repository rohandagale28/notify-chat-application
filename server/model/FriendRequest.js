const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
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

const request = mongoose.model("request", friendRequestSchema);

module.exports = request;
