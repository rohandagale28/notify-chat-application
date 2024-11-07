const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const request = require('../model/FriendRequest')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dgh263nmt',
  api_key: '641842339472793',
  api_secret: '6PxsxCmGoEaquDgAyiU37Gg9FlE',
})

/*-------------------- REGISTER NEW USER ----------------------------*/
const registerUser = async (req, res) => {
  try {
    const { username, email, password, image } = req.body

    const result = await cloudinary.uploader.upload(image, {
      folder: 'profiles',
    })
    console.log(result.secure_url)

    const userExist = await userModel.findOne({ email: email })

    if (userExist) {
      return res.status(409).json({ success: true, message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      image: result.secure_url,
    })

    const data = await newUser.save()

    return res.status(201).json({ success: true, message: 'User registered successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

/*-------------------- LOGIN USER ----------------------------*/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const userExist = await userModel.findOne({ email: email })

    if (!userExist) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    // JWT token
    const payload = { id: userExist._id, email: userExist.email }
    const token = jwt.sign(payload, 'workspacex28', { expiresIn: '8h' })

    // Set the token as a cookie
    res.cookie('_vercel_jwt', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the token
      secure: true, // Ensures the cookie is sent over HTTPS
      sameSite: 'None', // Allows cross-site cookies (for use with different domains)
    })

    res.status(200).json({ success: true, message: 'Login successful' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

/*-------------------- VERIFY LOGGEDIN USER -------------------*/
const verifyMe = async (req, res) => {
  try {
    const token = req.cookies?._vercel_jwt
    const decoded = jwt.verify(token, 'workspacex28')
    const userData = await userModel.findById(decoded.id)
    const { username, _id, image } = userData

    res.status(200).json({ username, _id, image })
  } catch (error) {
    res.status(500).json({ message: 'Error while verifying user' })
  }
}

const logOut = async (req, res) => {
  try {
    console.log('its hit')
    res.clearCookie('_vercel_jwt', { httpOnly: true })
    res.status(200).json({ success: true, message: 'Logout successful' })
  } catch (error) {
    res.status(500).json({ message: 'Error while logout' })
  }
}

module.exports = { registerUser, loginUser, verifyMe, logOut }
