const fs = require("fs");

const database = {
  read: () => JSON.parse(fs.readFileSync("./topic.json", "utf8")),
  write: (data) =>
    new Promise((resolve, reject) => {
      fs.writeFile("./topic.json", data, function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    }),
};

module.exports = database;
