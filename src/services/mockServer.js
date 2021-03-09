import {createServer} from "miragejs";
import {BASE_URI} from "@/services/services.js";

const users = [
    {
        username: "mhmdmar",
        password: "123456",
        profilePicture: "logo.png"
    },
    {
        username: "admin",
        password: "admin"
    }
];
export function makeServer() {
    return createServer({
        routes() {
            this.get(`${BASE_URI}/users`, () => ({
                users
            }));
            this.get(`${BASE_URI}/user`, () => users[0]);
        }
    });
}
