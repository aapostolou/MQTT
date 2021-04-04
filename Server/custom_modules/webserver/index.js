const express = require("express");
const { Database } = require("tabler-icons-react");
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
  socket.emit("HANDLE_DISPATCH_ACTION", {
    type: "HANDLE_RESET",
  });
  socket.emit("HANDLE_DISPATCH_ACTION", {
    type: "HANDLE_SEED",
    payload: { seed },
  });

  socket.on("HANDLE_AUTHENTICATE_USER", (payload) => {
    if (payload.password == password) {
      socket.isAdmin = true;
      socket.emit("HANDLE_DISPATCH_ACTION", {
        type: "HANDLE_AUTHENTICATE_USER",
      });

      socket.emit("HANDLE_DISPATCH_ACTION", {
        type: "HANDLE_TOPIC_INIT",
        payload: topics,
      });

      io.admins.push(socket);
    }
  });
});

io.admins = [];

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

/* DEV */
let initTopics = [
  { name: "text", value: "text", type: "text" },
  { name: "json", value: { test: "test" }, type: "json" },
  {
    name: "switch",
    value: "0",
    type: "switch",
    attributes: { values: ["0", "1"] },
  },
  {
    name: "button",
    value: "test",
    type: "button",
    attributes: { value: "1" },
  },
  {
    name: "temperature",
    value: "10",
    type: "thermometer",
    attributes: { min: -20, max: 50 },
  },
];

// database.write(JSON.stringify(initTopics));
