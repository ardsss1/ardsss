const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");

  socket.on("video-action", (data) => {
    socket.broadcast.emit("video-action", data);
  });

  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı");
  });
});

server.listen(3000, () => {
  console.log("Sunucu çalışıyor: http://localhost:3000");
});
