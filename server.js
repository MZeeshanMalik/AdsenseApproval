const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const Chat = require("./Model/chatModel");
const { userId } = require("./controller/authenticationController");
const { ObjectId } = require('mongodb');
// const socketIo = require("socket.io");
// const express = require("express");
// const http = require("http");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE_LOCAL;
console.log(process.env.NODE_ENV);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("connection to database established");
  });
// server setup
const port = process.env.PORT;
console.log(port);
const serverWithSocket = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = require("socket.io")(serverWithSocket); //? invoking the func also something like func()
// Map to store user IDs and socket connections
const userSocketMap = new Map();
io.on("connection", async(socket) => {
  const token = socket.handshake.headers.cookie.substr(4);
  const userid = await userId(token)
  console.log(userSocketMap)
  console.log('User connected with ID:', userid._id);
  // console.log("a user connected", socket.id);
  if (userSocketMap.has(userid._id.toString())) {
    console.log('User already connected. Disconnecting duplicate connection.');
    socket.disconnect(true);
    return;
  }
  userSocketMap.set(userid._id.toString(),socket.id)
  console.log("a user connected", userSocketMap);
  // connectedUsers.set(socket.id, { role: 'user' });
  socket.on("message", async(receiverId,message) => {
    console.log("Message received from", socket.id, ":", message);
    console.log("message received From" , userid._id)
    //First Checking if message is comming from admin
    if(userid._id == '65ec202f1b07619a01af238b'){
      console.log('i am in admin statement')
      // Saving message to database
      const newChat = await Chat.create({
        sender: userid._id,
        receiver: receiverId,
        message: message
      });
      console.log(newChat)
      const userSocket =  userSocketMap.get(receiverId);
      io.to(userSocket).emit("message" , {sender: socket.id,message})
    }
    // If message is comming from user and now sending that message to admin
    else{
      const newChat = await Chat.create({
        sender: userid._id,
        receiver: '65ec202f1b07619a01af238b',
        message: message
      });
      console.log(newChat)
      const receiverSocket = userSocketMap.get(receiverId)
      io.to(receiverSocket).emit('message', {sender: socket.id,message,senderId:userid._id})
    }
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected");
    userSocketMap.delete(userid._id.toString())
    console.log(userSocketMap)
  });
});
