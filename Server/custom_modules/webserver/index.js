const express = require("express");
const app = express();
const server = require("http").createServer(app);

global.io = require("socket.io")(server);

/* Seed */
const seed = Math.round(Math.random() * Math.pow(20, 20));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/");
});
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  socket.emit("seed", { seed });

  socket.on("authenticate", (payload) => {
    if (payload.password == password) {
      socket.isAdmin = true;
      socket.emit("authenticate", { response: false });
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
