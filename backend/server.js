const express = require('express');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/database");
const { Server } = require("socket.io");

require('dotenv').config();
const app = express();

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send("API is working");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    () => console.log(`Server running on PORT ${PORT}...`)
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
        console.log(`User ${userData._id} connected`);
    });

    socket.on("joinChat", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on("typing", (room) => {
        socket.to(room).emit("typing");
        console.log(`User typing in room: ${room}`);
    });

    socket.on("stopTyping", (room) => {
        socket.to(room).emit("stopTyping");
        console.log(`User stopped typing in room: ${room}`);
    });

    socket.on("newMessage", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        if (!chat.users) {
            return console.log("chat.users not defined");
        }

        chat.users.forEach((user) => {
            if (user._id === newMessageReceived.sender._id) return;
            console.log(`Sending message to user: ${user._id}`);
            socket.to(user._id).emit("messageReceived", newMessageReceived);
        });
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });
});
