const express = require("express")
const router = express.Router()
const { newRequest, getRequest } = require("../controller/friendRequestController")


router.post("/", newRequest)  //  create a new request
router.post("/:id", getRequest)  //  get the status of a specific request


module.exports = router  