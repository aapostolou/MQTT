require("./globals");

global.database = require("./custom_modules/database");

topics = database.read();

require("./custom_modules/webserver");

require("./custom_modules/mqtt-client");
