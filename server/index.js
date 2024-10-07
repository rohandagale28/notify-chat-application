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
const dashboard_routes = require("./routes/dashboard");
const { verifyToken } = require("./middleware/VerifyToken");
app.use(cookieParser());

const corsOptions = {
  origin:"https://notify-chat-application-clie-git-489a45-rohandagale28s-projects.vercel.app",
  credentials: true,
};

function setCorsHeaders(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

app.use(setCorsHeaders)

app.use(cors(corsOptions));

app.options("/", cors(corsOptions)); // Change '/api/data' to your actual route

const PORT = process.env.PORT || 5000;

//==========|| MongoDB Connection ||==========//
require("./db");

//==========|| JWT Middleware ||==========//

//==========|| User Routes ||==========//
app.use("/", user_routes);

//==========|| Dashboard || ==========//
app.use("/dashboard", verifyToken, dashboard_routes);

//==========|| Request Routes ||==========//
app.use("/request", verifyToken, request_routes);

//==========|| Home Route ||==========//
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running healthy" });
  res.set('Access-Control-Allow-Origin', 'https://notify-chat-application-clie-git-489a45-rohandagale28s-projects.vercel.app');

});

//==========|| Server Listening On PORT ||==========//
app.listen(PORT, () => {
  console.log("Server is Running Fine");
});
