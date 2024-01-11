const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log("Connection Successfull (DB)")
}).catch((err) => {
    console.log("Connection Failed", err.message)
})