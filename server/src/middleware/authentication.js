import {validateToken} from "../utils/jsonTokenHandler.js";
export default function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.includes("Bearer")
            ? authHeader.split(" ")[1]
            : authHeader;
        validateToken(token, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.userEmail = user.email;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
