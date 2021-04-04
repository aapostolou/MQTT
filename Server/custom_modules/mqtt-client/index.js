const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://192.168.1.202:1883");

client.on("connect", function () {
  io.emit("HANDLE_DISPATCH_ACTION", {
    type: "HANDLE_MQTT_CONNECTED",
  });

  /* Subscribe to Database Topics */
  let topics = ["text", "json", "switch", "temperature", "button"];
  if (topics.length) {
    client.subscribe(topics, (err) => {
      if (err) console.log(err);
    });
  }
});

client.on("reconnect", function () {
  io.emit("HANDLE_DISPATCH_ACTION", {
    type: "HANDLE_MQTT_CONNECTED",
  });
});

client.on("disconnect", function () {
  io.emit("HANDLE_DISPATCH_ACTION", {
    type: "HANDLE_MQTT_DISCONNECTED",
  });
});

client.on("message", function (topic, message) {
  console.log({
    topic,
    message: message.toString(),
  });

  io.admins.forEach((admin) => {
    admin.emit("HANDLE_DISPATCH_ACTION", {
      type: "HANDLE_TOPIC_UPDATE",
      payload: { name: topic, value: message.toString() },
    });
  });
});

io.on("connection", (socket) => {
  if (client.connected) {
    socket.emit("HANDLE_DISPATCH_ACTION", {
      type: "HANDLE_MQTT_CONNECTED",
    });
  }

  /* Publish */
  socket.on("HANDLE_PUBLISH_TOPIC", (payload) => {
    if (!socket.isAdmin) return;
    if (!client.connected) return;

    console.log(payload);

    const { topic, message } = payload;
    client.publish(topic, message);
  });

  /* Subscribe */
  socket.on("HANDLE_CREATE_TOPIC", (payload) => {
    if (!socket.isAdmin) return;
    if (!client.connected) return;

    if (
      topics.every(
        (topic) => topic.name != payload.name || topic.type != payload.type
      )
    ) {
      if (topics.findIndex((topic) => topic.name == payload.name) == -1) {
        io.admins.forEach((admin) => {
          admin.emit("HANDLE_DISPATCH_ACTION", {
            type: "HANDLE_TOPIC_ADD",
            payload,
          });
        });
      } else {
        client.subscribe(payload.topic, (err) => {
          if (!err) {
            console.log(`Subscribed to topic '${payload.topic}'.`);

            io.admins.forEach((admin) => {
              admin.emit("HANDLE_DISPATCH_ACTION", {
                type: "HANDLE_TOPIC_ADD",
                payload,
              });
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
      }

      topics.push(payload);
      database.write(JSON.stringify(topics));
    } else {
      socket.emit("HANDLE_DISPATCH_ACTION", {
        type: "ABORT_TOPIC_ADD",
        payload: { response: "Topic already exists." },
      });
    }
  });

  socket.on("HANDLE_DELETE_TOPIC", (payload) => {
    if (!socket.isAdmin) return;
    if (!client.connected) return;

    console.log(payload);

    topics = topics.filter(
      (topic) =>
        !(topic.name === payload.name && payload.type
          ? topic.type === payload.type
          : false)
    );

    database.write(JSON.stringify(topics));

    socket.emit("HANDLE_DISPATCH_ACTION", {
      type: "HANDLE_TOPIC_REMOVE",
      payload,
    });
  });

  /* Unsubscribe */
  socket.on("unsubscribe", function (data) {});
});
