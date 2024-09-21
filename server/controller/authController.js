const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await userModel.findOne({ email: email });

        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

//========== Login ==========//
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

        // Create JWT token (customize payload as needed)
        const payload = { id: userExist._id, email: userExist.email };
        const token = jwt.sign(payload, "workspace28", { expiresIn: "1h" });

        // Set the token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the token
            secure: true, // Ensures the cookie is sent over HTTPS
            sameSite: "none", // Allows cross-site cookies (for use with different domains)
        });

        // Send success response with user info
        res.status(200).json({ message: "Login successful"   });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
