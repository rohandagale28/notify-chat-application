const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
app.use(express.json({ limit: '10mb' }))
dotenv.config({ path: './config.env' })
const cors = require('cors')
var cookieParser = require('cookie-parser')
const user_routes = require('./routes/user')
const request_routes = require('./routes/request')
const dashboard_routes = require('./routes/dashboard')
const { verifyToken } = require('./middleware/VerifyToken')
app.use(cookieParser())

const CORS = process.env.VITE_ALLOW_ORIGIN

// app.use(
//   cors({
//     origin: "https://notify-chat-application-git-development-rohandagale28s-projects.vercel.app/",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: true, // Allow credentials
//     optionsSuccessStatus: 204, // Response status for preflight requests
//   })
// )

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://notify-chat-application-git-development-rohandagale28s-projects.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

const PORT = process.env.PORT || 5000

//==========|| MongoDB Connection ||==========//
require('./db')

//==========|| JWT Middleware ||==========//

//==========|| User Routes ||==========//
app.use('/', user_routes)

//==========|| Dashboard || ==========//
app.use('/dashboard', verifyToken, dashboard_routes)

//==========|| Request Routes ||==========//
app.use('/request', verifyToken, request_routes)

//==========|| Home Route ||==========//
app.get('/', (req, res) => {
  res.status(200).json({ message: 'server is running healthy' })
})

//==========|| Server Listening On PORT ||==========//
app.listen(PORT, () => {
  console.log('Server is Running Fine')
})
