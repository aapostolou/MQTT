const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 1994;

// Web Server
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/build");
});
app.use(express.static("public"));

// Socket.io
const handleSocket = require("./custom_modules/socket.io");
io.on("connection", (socket) => {
  handleSocket(socket, io);
});

server.listen(port, () => {
  console.log("Server started at port: " + port);
});
