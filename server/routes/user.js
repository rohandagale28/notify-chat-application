const express = require("express");
const router = express.Router();
const { addUser, getUser } = require("../controller/userController");
const { newConversation, getConversation } = require("../controller/conversationController");
const { newMessage, getMessages } = require("../controller/messageController");
const { registerUser, loginUser } = require("../controller/authController")

router.post("/login", loginUser); // add new user to database
router.post("/register", registerUser); // 

router.post("/add", addUser); //  add new user to database
router.get("/get/:id", getUser); // get users with name character

router.post("/conversation", newConversation);
router.post("/conversation/get", getConversation);

router.post("/message/add", newMessage);
router.get("/message/get/:id", getMessages);

module.exports = router;
