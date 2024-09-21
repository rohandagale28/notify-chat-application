const userModel = require("../model/User");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const account = req.body;
    const userExist = await userModel.findOne({ sub: account.sub });
    if (userExist) {
      return res.status(200).json(userExist);
    }
    const newUser = new userModel(account);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error while creating account", err });
  }
};


//==========|| searching contacts with username ||==========//
const getUser = async (req, res) => {
  try {
    const searchQuery = req.params.id;

    const users = await userModel.aggregate([
      {
        $match: {
          username: { $regex: searchQuery, $options: 'i' }, // Case-insensitive regex search
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
        }
      }
    ]);

    return res.status(200).json({ data: users });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error while fetching users", err });
  }
};

const verifyMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "workspace28");
    const userData = await userModel.findById(decoded.id)
    const { username, _id, ...rest } = userData
    console.log(userData)
    res.status(200).json({ username, _id })
  } catch (error) { }
};

module.exports = { addUser, getUser, verifyMe };
