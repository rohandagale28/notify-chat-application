const { Server } = require("socket.io");

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:5173"
    }
}, (req, res) => {
    res.send("server is running fine");
});

let users = new Map();

const addUser = (userData, socketId) => {
    // Add the user to the Map using `sub` (or other unique identifier) as the key

    users.set(userData, socketId);
};

const getUser = (userId) => {
    // Retrieve the user from the Map using `sub` as the key
    const userfound = users.get(userId);
    console.log(userfound,"yes uesr found")
    return userfound
};

const removeUser = (socketId) => {
    // Iterate over the Map to find and remove the user with the given socketId
    for (let [key, value] of users) {
        if (value.socketId === socketId) {
            users.delete(key);
            break;
        }
    }
};

io.on('connection', (socket) => {
    console.log("connection detected");
    console.log(users);
    // connect
    socket.on("addUsers", (userData) => {
        addUser(userData, socket.id);
        console.log(userData, socket.id);
        // Emit the updated list of users by converting the Map to an array
        io.emit("getUsers", Array.from(users.values()));
        console.log(users)
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
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', Array.from(users.values()));
    });
});
