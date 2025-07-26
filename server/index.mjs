import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user is connection");
  console.log(socket.id);
  setTimeout(() => {
    socket.emit("send", "hello from server");
  }, 2000);
  socket.on("send", (data) => {
    console.log(data);
  });
});

app.get("/", (req, res, next) => {
  res.send("hello");
});

httpServer.listen(7000, (e) => {
  if (e) {
    console.log(e);
  }
  console.log("server started on 7000");
});
