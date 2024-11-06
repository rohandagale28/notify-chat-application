const express = require('express')
const router = express.Router()
const { newRequest,  updateRequest } = require('../controller/requestController')

router.post('/new', newRequest) // create a new request
router.post('/update', updateRequest)

module.exports = router
