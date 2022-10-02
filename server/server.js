const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");
const cors = require("cors");
//load environment variables
require("dotenv").config();

//CORS policy middleware
app.use(cors());
//JSON parser
app.use(express.json());

//API routes.
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Conneted successfully : ", process.env.MONGO_URL);
  })
  .catch((err) => {
    console.log(err.message);
  });
//Start the server
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
//Sockets
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

//online clients
global.onlineUsers = new Map();
global.onlineCust = new Map();
global.onlineAgents = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("add-user", (userId) => {
    console.log("user connected", userId);
    onlineUsers.set(userId, socket.id);
  });

  //send msg to the user passed in data
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });

  socket.on("cust_online", (custId) => {
    onlineCust.set(custId, socket.id);
  });

  socket.on("agent_online", (agentId) => {
    onlineAgents.set(agentId, socket.id);
  });
});
