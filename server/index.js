//COMMONJS JS MODULE SYSTEM
const express = require('express')
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth");
const messageRoutes = require("./routes/Message");
const LastseenModel = require("./model/LastseenModel");
const MessageModel = require("./model/MessageModel");
const { Server, Socket } = require("socket.io");
const app = express();
require("dotenv").config();
const uuid = require('uuid');
const massageModel = require('./model/MessageModel');
const { setLastseen } = require("./controllers/LastseenController")
const { saveMsg } = require("./controllers/MessageController")
app.use(cors({
  origin:process.env.CORS_ORIGIN?process.env.CORS_ORIGIN:"*",
  credentials:true
}));
app.use(express.json());

if (process.env.NODE_STATE === 'production') {
  console.log = function () { }
}

// db instance 
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const appserver = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);



app.get('/', (req, res) => {
  res.send('<h1>chatapp backend</h1>');
});

const io = new Server(appserver, {
  cors: {
    origin: process.env.CORS_ORIGIN_SOCKET ? process.env.CORS_ORIGIN_SOCKET : "*",
    credentials: true,
  },
  path: "/chat"
});

// const count = io.engine.clientsCount;
// console.log(count)

// io.engine.generateId = (req) => {
//   return uuid.v4(); // must be unique across all Socket.IO servers
// }


function onlineUserarr(socket, data) {
  if (socket.id !== data.socketId) {
    return true
  }
  if (socket.id === data.socketId) {
    console.log("User who Logout ", data.userId)
    setLastseen(data.userId)
    return false
  }


}

// global.onlineUsers = new Map();
let onlineUsers = []

io.on("connection", (socket) => {

  socket.on("connect", (abcd) => {
    console.log("SOCKET CONNECT")

    console.log("SOCKET CONNECT", socket.id)
    console.log("SOCKET CONNECT", abcd)
  })
  // add new User when any one start chat with new user 
  socket.on("add-user", (newusersId) => {
    console.log("ADD NEW USER ", newusersId)
    console.log("ONLINE USER BEFORE", onlineUsers)


    if (!onlineUsers.some((user) => user.userId === newusersId)) {
      onlineUsers.push({ userId: newusersId, socketId: socket.id })
    }
    // onlineUsers[socket.id] = userI
    console.log("onlineusers ", onlineUsers)
    // send to all user ,list of online users
    io.emit("get-online-users", onlineUsers)
  });

  socket.on('disconnect', (abcd) => {
    // remove  user from online users after logout
    console.log("Disconnected Type ", abcd, socket.id)
    onlineUsers = onlineUsers.filter((data) => onlineUserarr(socket, data))
    console.log('Now online Users ', onlineUsers);
    io.emit("get-online-users", onlineUsers)
  });

  socket.on('offline', (abcd) => {
    console.log('user offline', onlineUsers);
  });

  socket.on('error', (error) => {
    console.log('socket error', error);
  });

  socket.on('reconnect', (attempt) => {
    console.log('socket reconnect', attempt);
  });
  socket.on('reconnect_attempt', (attempt) => {
    console.log('reconnect_attempt', attempt);
  });
  socket.on('ping', (attempt) => {
    console.log('ping', attempt);
  });

  socket.on("typing", (data) => {
    const user = onlineUsers.find((user) => user.userId === data.whom)
    if (user) {
      io.to(user.socketId).emit('get-typing', data.status)
    }
  })
  socket.on("chatOpend", (data) => {
    const user = onlineUsers.find((user) => user.userId === data.whom)
    if (user) {
      io.to(user.socketId).emit('someOne_open_yourchat', data)
    }
  })


  socket.on("send-msg", (data) => {
    console.log("data to sendmessage", data)
    const user = onlineUsers.find((user) => user.userId === data.to);

    if (user) {
      data.status = "delivered"
      saveMsg(data)
      socket.to(user.socketId).emit("msg-recieve", data);
    }
    else {
      data.status = "sent"
      saveMsg(data)
    }

  });
});



