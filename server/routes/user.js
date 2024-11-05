const express = require('express')
const router = express.Router()
const { addUser, getUser } = require('../controller/userController')
const { newConversation, getConversation } = require('../controller/conversationController')
const { newMessage, getMessages } = require('../controller/messageController')
const { registerUser, loginUser, logOut } = require('../controller/authController')

router.post('/login', loginUser)
router.post('/logout', logOut)
router.post('/register', registerUser)

router.post('/add', addUser)
router.get('/get/:id', getUser) 

router.post('/conversation', newConversation)
router.post('/conversation/get', getConversation)

router.post('/message/add', newMessage)
router.get('/message/get/:id', getMessages)

module.exports = router
