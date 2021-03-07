import {createServer} from "miragejs";
import {BASE_URI} from "@/services/services.js";

const users = [
    {
        username: "mhmdmar",
        password: "123456",
        profilePicture: ""
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
            this.get(`${BASE_URI}/user`, () => ({
                username: users[0].username,
                password: users[0].password
            }));
        }
    });
}
