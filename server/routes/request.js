const express = require("express")
const router = express.Router()
const { newRequest, getRequest, updateRequest } = require("../controller/requestController")


router.post("/new", newRequest)  //  create a new request
router.get("/contact/:id", getRequest)  //  get the status of a specific request
router.post("/update", updateRequest)




module.exports = router  