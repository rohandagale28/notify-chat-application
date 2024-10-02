const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
dotenv.config({ path: "./config.env" });
const cors = require("cors");
app.use(express.json());
var cookieParser = require("cookie-parser");
const user_routes = require("./routes/user");
const request_routes = require("./routes/request");
const dashboard_routes = require("./routes/dashboard")
const { verifyToken } = require("./middleware/VerifyToken");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // The frontend domain
    credentials: true, // Allow credentials (cookies)
  })
);

const PORT = process.env.PORT || 5000;

//==========|| MongoDB Connection ||==========//
require("./db");

//==========|| JWT Middleware ||==========//


//==========|| User Routes ||==========//
app.use("/", user_routes);

//==========|| Dashboard || ==========//
app.use("/dashboard", verifyToken, dashboard_routes)

//==========|| Request Routes ||==========//
app.use("/request", verifyToken, request_routes);

//==========|| Home Route ||==========//
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running healthy" });
});

//==========|| Server Listening On PORT ||==========//
app.listen(PORT, () => {
  console.log("Server is Running Fine");
});
