const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("../model/FriendRequest");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgh263nmt",
  api_key: "641842339472793",
  api_secret: "6PxsxCmGoEaquDgAyiU37Gg9FlE",
});

//====================|| register new user ||====================//
const registerUser = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    const result = await cloudinary.uploader.upload(image, {
      folder: "profiles",
    });
    console.log(result.secure_url);

    const userExist = await userModel.findOne({ email: email });

    if (userExist) {
      return res.status(409).json({ success: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      image: result.secure_url,
    });

    const data = await newUser.save();

    // const request = new request({ userId: data._id });
    // await request.save();

    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//====================|| login user || ====================//
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email: email });

    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // JWT token
    const payload = { id: userExist._id, email: userExist.email };
    const token = jwt.sign(payload, "workspace28", { expiresIn: "1h" });

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the token
      secure: true, // Ensures the cookie is sent over HTTPS
      sameSite: "none", // Allows cross-site cookies (for use with different domains)
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//====================|| verify logged in user and send user object ||====================//
const verifyMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "workspace28");
    const userData = await userModel.findById(decoded.id);
    console.log(userData);
    const { username, _id, image } = userData;
    console.log(userData);
    res.status(200).json({ username, _id, image });
  } catch (error) {}
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).send("Logged out and cookie removed");
    console.log("Cookies removed");
  } catch (error) {
    console.error("Error while logging out:", error);
    res.status(500).send("Error logging out");
  }
};

module.exports = { registerUser, loginUser, verifyMe, logOut };
