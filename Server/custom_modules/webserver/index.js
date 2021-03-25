const express = require("express");
const app = express();
const server = require("http").createServer(app);

global.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

/* Seed */
const seed = Math.round(Math.random() * Math.pow(20, 20));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/");
});
app.use(express.static(__dirname + "/build"));

io.on("connection", (socket) => {
  socket.emit("seed", { seed });

  socket.on("authenticate", (payload) => {
    if (payload.password == password) {
      socket.isAdmin = true;
      socket.emit("HANDLE_DISPATCH_ACTION", {
        type: "HANDLE_AUTHENTICATE_USER",
      });

      admins.push(socket);
    }
  });
});

global.admins = [];

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
