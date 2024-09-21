const express = require("express");
const { verifyMe, getUser } = require("../controller/userController");
const { newConversation, getConversation } = require("../controller/conversationController");
const { newMessage } = require("../controller/messageController");
const router = express.Router();

router.get("/", verifyMe)
router.get("/:id", getUser)

router.post("/conversation", getConversation)

router.post("/message/add", newMessage)

module.exports = router;
