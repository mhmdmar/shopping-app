const compression = require("compression");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const initRoutes = require("./routes/index");
const path = require("path");
const staticFileMiddleware = express.static("dist");
const app = express();

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`C:\\Projects\\shopping-app\\server\\public`));
app.use(express.static(`C:\\Projects\\shopping-app\\server\\public\\images`));
app.use(cors());

app.use("/", initRoutes());

app.use(staticFileMiddleware);

app.all("*", (_req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

module.exports = app;
