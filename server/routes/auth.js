const express = require('express')
const { loginUser, logOut, verifyMe, registerUser } = require('../controller/authController')
const router = express.Router()

/*-------------------- SIGN IN & SIGN OUT USER ---------------*/
router.post('/login', loginUser)
router.post('/logout', logOut)

/*-------------------- REGISTER NEW USER ---------------*/
router.post('/register', registerUser)

/*-------------------- VERIFY USER WITH TOKEN ---------------*/
router.get('/validate-token', verifyMe)

module.exports = router
