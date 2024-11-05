const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const user_routes = require('./routes/user')
const request_routes = require('./routes/request')
const dashboard_routes = require('./routes/dashboard')
const { verifyToken } = require('./middleware/VerifyToken')

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

/*------------------ ENVIRONMENT VARIABLES --------------------*/
dotenv.config()
if (!process.env.PORT || !process.env.ALLOW_ORIGIN) {
  console.error('Missing necessary environment variables in .env')
  process.exit(1)
}

/*------------------ CORS CONFIGURATION ------------------------*/
const allowedOrigins = [process.env.ALLOW_ORIGIN, 'https://notify-chat-application.vercel.app']
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: true,
  credentials: false,
  optionsSuccessStatus: 200,
}

app.options('*', cors(corsOptions)) // Enable CORS pre-flight for all routes
app.use(cors(corsOptions))

/*------------------ MONGODB CONNECTION ---------------------*/
require('./db')

/*------------------ ROUTES -----------------------------------------*/
// User Routes
app.use('/', user_routes)

// Dashboard Routes (protected)
app.use('/dashboard', verifyToken, dashboard_routes)

// Request Routes (protected)
app.use('/request', verifyToken, request_routes)

// Home Route
app.get('/', (_, res) => {
  res.status(200).json({ message: 'Server is running healthy' })
})

/*------------------ SERVER CONFIGURATION ----------------------*/
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
