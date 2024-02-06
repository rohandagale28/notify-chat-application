const express = require("express")
const dotenv = require("dotenv")
const app = express();
dotenv.config({ path: './config.env' })
const cors = require('cors')
app.use(cors())
app.use(express.json())
const user_routes = require("./routes/user")
const request_routes = require("./routes/request")


const PORT = process.env.PORT || 5000


//==========|| MongoDB Connection ||==========//
require("./db")


//==========|| Error handling Middleware ||==========//
// app.use((req, res, next) => {
//     res.status(500).send('Something went wrong!');
//     next()
// });



//==========|| User Routes ||==========//
app.use("/", user_routes)


//==========|| Request Routes ||==========//
app.use("/friend/request", request_routes)



//==========|| Home Route ||==========//
app.get('/', (req, res) => {
    res.status(200).json({ message: "server is running healthy" })
})

//==========|| Server Listening On PORT ||==========//
app.listen(PORT, () => {
    console.log("Server is Running Fine")
})