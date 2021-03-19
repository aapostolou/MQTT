var express = require("express");
var app = express();
var serv = require("http").Server(app);
var path = require("path");
var ip = require("ip");

var fs = require("fs");

var port = 3000;

const password = "apostolou";
var admin = false;

// ====================
// =    Web Server    =
// ====================
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public_html/");
});

app.use("/public_html", express.static(__dirname + "/public_html"));
app.use(express.static(path.join(__dirname, "public_html")));

// ====================
// =     Socket.IO    =
// ====================
var io = require("socket.io")(serv, {});
io.sockets.on("connection", function (socket) {
  console.log("Socket " + socket.id + " connected.");

  // MQTT Status & Topics
  socket.emit("init", {
    status: client.connected,
    topics: topics,
  });

  // Login
  socket.on("login", function (data) {
    if (data.password == password) {
      admin = socket.id;

      socket.emit("login", { status: true });
    } else {
      socket.emit("login", { status: false });
    }
  });

  // Subscribe
  socket.on("subscribe", function (data) {
    if (admin == socket.id || true) {
      if (client.connected) {
        // Add to database
        // -->  <--
        if (
          topics.filter((t) => t.name == data.name && t.type == data.type)
            .length == 0
        ) {
          client.subscribe(data.name, function (err) {
            if (!err) {
              console.log("Subscribed to topic " + data.name + ".");

              let t = new Topic(data.name, data.description, data.type);
              saveTopics();

              io.emit("topic", {
                topic: t,
              });
            } else {
              console.log("An error occurred while connecting.");
              socket.emit("error", {
                error: "An error occurred while connecting !",
              });
            }
          });
        } else {
          console.log("Topic exists !");
          socket.emit("error", { error: "Topic exists !" });
        }
      } else {
        console.log("Broker Error");
        socket.emit("error", { error: "Broker Error !" });
      }
    } else {
      console.log("Unauthorized Subscribition");
      socket.emit("error", { error: "Unauthorized Subscribition !" });
    }
  });

  // Unsubscribe
  socket.on("unsubscribe", function (data) {
    if (
      topics.findIndex((t) => t.name == data.name && t.type == data.type) != -1
    ) {
      topics.splice(
        topics.findIndex((t) => t.name == data.name && t.type == data.type),
        1
      );

      saveTopics();
    } else {
      console.log("Broker Error");
      socket.emit("error", { error: "Topic doesn't exists !" });
    }
  });

  // Publish
  socket.on("publish", function (data) {
    if (admin == socket.id || true) {
      if (client.connected) {
        client.publish(data.name, data.message);

        console.log("PUBLISH");
      } else {
        socket.emit("publish", { result: "Broker Error" });
      }
    } else {
      socket.emit("publish", { result: "Unauthorized Publish" });
    }
  });

  // Disconnect
  socket.on("disconnect", function () {
    console.log("Socket " + socket.id + " disconnected.");
  });
});

io.sendData = (data) => {
  io.emit("data", data);
};
io.sendStatus = () => {
  io.emit("status", {
    status: client.connected,
  });
};

// =====================
// =      Database     =
// =====================

var topics = [];

const loadTopics = new Promise((resolve, reject) => {
  fs.readFile("data/topics.json", "utf8", (err, data) => {
    if (err) return console.log(err);
    topics = JSON.parse(data);

    console.log("Topics loaded !");

    resolve("Success");
  });
});
function saveTopics() {
  fs.writeFile("data/topics.json", JSON.stringify(topics), (err) => {
    if (err) return console.log(err);

    console.log("Topics saved !");
  });
}

function Topic(name, description, type) {
  this.name = name;
  this.description = description;
  this.type = type;

  if (this.type == "image") {
    this.data = { src: "img/image_preload.gif" };
  } else if (this.type == "thermometer") {
    this.data = {
      min: -20,
      max: 50,
      temperature: 17,
    };
  }

  topics.push(this);
}

// =      SQL Lite     =

var sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.serialize(function () {
  db.run(
    "CREATE TABLE temperature (value TEXT,Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
});

function INSERT(query) {
  db.prepare(query).run().finalize();
}

function SELECT(query, callback) {
  db.all(query, [], (err, rows) => {
    callback(rows);
  });
}

// ====================
//  =      MQTT       =
// ====================
var mqtt = require("mqtt");

// var client  = mqtt.connect('mqtt://test.mosquitto.org');
// var client = mqtt.connect("mqtt://raspberrypi:1883");
var client = mqtt.connect("mqtt://192.168.1.202:1883");

client.on("connect", function () {
  io.sendStatus();

  loadTopics.then((value) => {
    topics.forEach((t) => {
      client.subscribe(t.name, function (err) {
        if (!err) {
          console.log("Subscribed to topic " + t.name + ".");
        } else {
          console.log("An error occurred while connecting.");
        }
      });
    });
  });
});
client.on("reconnect", function () {
  io.sendStatus();
});
client.on("disconnect", function () {
  io.sendStatus();
});

client.on("message", function (topic, message) {
  // Echo message
  console.log(topic + ": " + message.toString());
  io.sendData({
    topic: topic,
    message: message.toString(),
  });
});

// ====================
// =   Start Server   =
// ====================
serv.listen(port, function () {
  console.log("=========================");
  console.log("Server Started...");
  console.log(" Port : " + port);
  console.log(" IP : " + ip.address());
  console.log("=========================");
});

// =====================
// =  Everything else  =
// =====================

// Temperature Anomaly Service

client.on("message", function (topic, message) {
  if (topic == "temperature") {
    if (!isNaN(JSON.parse(message).temperature)) {
      INSERT(
        "INSERT INTO temperature VALUES (" +
          JSON.parse(message).temperature +
          ", julianday('now'))"
      );

      SELECT(
        "SELECT value, (julianday('now') - julianday(Timestamp)) * 24 * 60 * 60 AS time FROM temperature WHERE time < 60",
        (rows) => {
          var temp_avg_now = rows
            .filter((r) => {
              return r.time < 30;
            })
            .map((r) => r.value)
            .reduce((total, num) => {
              return (parseFloat(total) + parseFloat(num)) / 2;
            });

          var temp_avg_old = null;
          try {
            temp_avg_old = rows
              .filter((r) => {
                return r.time >= 30;
              })
              .map((r) => r.value)
              .reduce((total, num) => {
                return (parseFloat(total) + parseFloat(num)) / 2;
              });
          } catch (err) {
            temp_avg_old = temp_avg_now;
          }

          // - Debug -
          // console.log({
          //   start: rows[0],
          //   temp_avg_now: temp_avg_now,
          //   temp_avg_old: temp_avg_old,
          //   result: temp_avg_now - temp_avg_old,
          // });

          if (Math.abs(temp_avg_now - temp_avg_old) > 5) {
            console.log("alert");
            io.emit("alert", { message: "Temperature Anomaly Detected" });
          }
        }
      );
    }
  }
});
