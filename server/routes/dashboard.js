const express = require('express')
const { getConversation } = require('../controller/conversationController')
const { getConversationList } = require('../controller/requestController')
const { logOut } = require('../controller/authController')
const router = express.Router()

/*-------------------- GET CONVERSATION LIST -----------------*/
router.get('/conversation/:id', getConversationList)

/*-------------------- CREATE NEW CONVERSATION ---------------*/
router.post('/conversation/add', getConversation)

/*-------------------- LOGOUT USER ---------------------------*/
router.get('/user/logout', logOut)

module.exports = router
