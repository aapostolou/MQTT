/* WEBSERVER */
global.port = 1994;

global.password = 3164975;

/* MQTT */
global.broker = "mqtt://192.168.1.202:1883";

/* Topics */

global.topics = [
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
