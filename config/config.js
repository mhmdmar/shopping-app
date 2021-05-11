let config;
if (process.env.NODE_ENV === "development") {
  config = require("./development.json");
} else {
  config = require("./production.json");
}

module.exports = config;
