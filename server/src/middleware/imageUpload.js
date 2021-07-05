import multer from "multer";
import path from "path";
import {imageFilter} from "../utils/helpers.js";

const storage = multer.diskStorage({
    destination: path.join("src", "assets", "uploads"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5000000
    }
});
const uploadSingleFile = upload.single("file");

export default uploadSingleFile;
