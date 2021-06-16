import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import path from "path";
import initRoutes from "./routes/index.js";
import {message} from "./utils/constants.js";
import dbHelper from "./database/dbHelper.js";
try {
    await dbHelper.connect();
} catch (err) {
    // TODO handle db error
    throw err;
}
const staticFileMiddleware = express.static("public");
const app = express();
app.use(staticFileMiddleware);
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(`C:\\Projects\\shopping-app\\server\\public`));
app.use(express.static(`C:\\Projects\\shopping-app\\server\\public\\images`));
app.use(cors());
app.use("/images", express.static("./public/assets/images"));
app.use("/", initRoutes());

app.all("*", (_req, res) => {
    try {
        res.sendFile(path.join("../public/index.html"));
    } catch (error) {
        res.json({
            success: false,
            message: message.error.UNKNOWN_ERROR
        });
    }
});

export default app;
