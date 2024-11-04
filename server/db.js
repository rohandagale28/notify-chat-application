const mongoose = require('mongoose')

const DB = process.env.MONGODB_URI

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connection Successfull (DB)')
  })
  .catch((err) => {
    console.log('Connection Failed', err.message)
  })
