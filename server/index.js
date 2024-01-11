const express = require("express")
const dotenv = require("dotenv")
const app = express();
dotenv.config({ path: './config.env' })
const cors = require('cors')
app.use(cors())
app.use(express.json())
const user_routes = require("./routes/user")

//==========|| MongoDB Connection ||==========//
require("./db")


//==========|| User Routes ||==========//
app.use("/", user_routes)
app.get('/', (req, res) => {
    res.send({ message: "server is running fine" })
})

//==========|| Server Listening On PORT ||==========//
app.listen(process.env.PORT, () => {
    console.log("Server is Running Fine")
})