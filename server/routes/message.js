const express = require('express')
const { newMessage, deleteMessage } = require('../controller/messageController')
const router = express.Router()

/*-------------------- ADD NEW MESSAGE --------------------*/
router.post('/add', newMessage)

/*-------------------- DELETE MESSAGE ------------------------*/
router.patch('/delete', deleteMessage)

module.exports = router
