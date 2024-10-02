const express = require("express");
const { getUser } = require("../controller/userController");
const { newConversation, getConversation } = require("../controller/conversationController");
const { newMessage } = require("../controller/messageController");
const { verifyMe } = require("../controller/authController");
const router = express.Router();

router.get("/", verifyMe) // verify token and send user object

router.get("/:id", getUser) // search user parameter

router.post("/conversation", getConversation)

router.post("/message/add", newMessage)

module.exports = router;
