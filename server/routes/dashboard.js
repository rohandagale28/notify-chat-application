const express = require('express')
const { getConversation } = require('../controller/conversationController')
const { getConversationList } = require('../controller/requestController')
const router = express.Router()

/*-------------------- GET CONVERSATION LIST -----------------*/
router.get('/conversation/:id', getConversationList)

/*-------------------- CREATE NEW CONVERSATION ---------------*/
router.post('/conversation/add', getConversation)

module.exports = router
