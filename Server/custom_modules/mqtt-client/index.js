const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://192.168.1.202:1883");

client.on("connect", function () {
  emitMqttStatus();

  /* Subscribe to Database Topics */
  let topics = ["test", "temperature"];
  if (topics.length) {
    client.subscribe(topics, (err) => {
      if (err) console.log(err);
    });
  }
});

client.on("reconnect", function () {
  emitMqttStatus();
});

client.on("disconnect", function () {
  emitMqttStatus();
});

client.on("message", function (topic, message) {
  console.log({
    topic,
    message: message.toString(),
  });

  io.emit("HANLDE_TOPIC_UPDATE", {
    topic,
    message: message.toString(),
  });
});

const emitMqttStatus = () => {
  io.emit("mqtt", {
    status: client.connected,
  });
};

io.on("connection", (socket) => {
  /* Subscribe */
  socket.on("subscribe", (payload) => {
    if (!socket.isAdmin) return;
    if (!client.connected) return;

    /* Name - Type - Attributes */

    client.subscribe(payload.topic, (err) => {
      if (!err) {
        console.log(`Subscribed to topic '${payload.topic}'.`);

        io.emit("HANDLE_TOPIC_ADD", {
          ...payload,
        });

        /* Save to Database */
      } else {
        console.log(
          `An error occurred while subscribing to topic '${payload.topic}' !`
        );
        socket.emit("error", {
          error: `An error occurred while subscribing to topic '${payload.topic}' !`,
        });
      }
    });
  });

  /* Unsubscribe */
  socket.on("unsubscribe", function (data) {});
});
