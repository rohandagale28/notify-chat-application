const { Server } = require("socket.io");
const dotenv = require("dotenv");
require("dotenv").config();

const PORT = process.env.PORT || 9000;

const CORS = process.env.FRONT_END_CORS;

const io = new Server(
  PORT,
  {
    cors: {
      origin: "*",
    },
  },
  (req, res) => {
    res.send("server is running fine");
  }
);

let users = new Map();

const addUser = (userData, socketId) => {
  users.set(userData, socketId);
};

const getUser = (userId) => {
  const userfound = users.get(userId);
  console.log(userfound, "yes uesr found");
  return userfound;
};

const removeUser = (socketId) => {
  for (let [key, value] of users) {
    if (value.socketId === socketId) {
      users.delete(key);
      break;
    }
  }
};

io.on("connection", (socket) => {
  console.log("connection detected");
  console.log(users);
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    console.log(userData, socket.id);

    io.emit("getUsers", Array.from(users.values()));
    console.log(users);
  });

  // send message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    console.log(data);
    if (user) {
      console.log(user, "user found");
      io.to(user).emit("getMessage", data);
    } else {
      console.log("user is offline");
    }
  });

  // disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", Array.from(users.values()));
  });
});
