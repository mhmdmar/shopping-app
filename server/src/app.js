import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import path from "path";
import initRoutes from "./routes/index.js";

const staticFileMiddleware = express.static("public");
const app = express();
app.use(staticFileMiddleware);
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static(path.join("src", "assets")));
app.use(cors())
app.use(initRoutes());

export default app;
