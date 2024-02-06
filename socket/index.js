const { Server } = require("socket.io")

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:5173"
    }
}, (req, res) => {
    res.send("server is running fine")
})

let users = []

const addUser = (userData, socketId) => {
    console.log(users)
    const exist = !users.some(user => user.sub === userData.sub)
    if (exist) {
        users.push({ ...userData, socketId })
    }
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId)
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on('connection', (socket) => {
    console.log("connection detected")

    //connect
    socket.on("addUsers", (userData) => {
        addUser(userData, socket.id)
        io.emit("getUsers", users)
    })

    //send message
    socket.on("sendMessage", (data) => {
        const user = getUser(data.receiverId)
        if (user) {
            console.log(user)
            io.to(user.socketId).emit("getMessage", data)
        } else {
            console.log("user is offline")
        }
    })

    //disconnect
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})