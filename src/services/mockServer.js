import {createServer} from "miragejs";
import {host} from "@/services/server.json";

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
            this.get(`${host}/api/users`, () => ({
                users
            }));
            this.get(`${host}/api/user`, () => ({
                username: users[0].username,
                password: users[0].password
            }));
        }
    });
}
