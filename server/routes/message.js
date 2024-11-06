const express = require('express')
const { newMessage, DeleteMessage } = require('../controller/messageController')
const router = express.Router()

/*-------------------- ADD NEW MESSAGE --------------------*/
router.post('/add', newMessage)

/*-------------------- DELETE MESSAGE ------------------------*/
router.post('/delete/:id', DeleteMessage)

module.exports = router
