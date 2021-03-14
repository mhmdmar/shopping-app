import {createServer} from "miragejs";
import {BASE_URI} from "@/services/services.js";

const users = [
    {
        email: "mhmdmar@gmail.com",
        username: "mhmdmar",
        password: "123456",
        profilePicture: "logo.png"
    },
    {
        email: "admin@",
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
            this.get(`${BASE_URI}/user`, (schema, request) => {
                const {username, password} = request.queryParams;
                const user = users.find(
                    user =>
                        user.username === username && user.password === password
                );
                if (!user) {
                    return {
                        error: "invalid username and/or password"
                    };
                }
                return {
                    user
                };
            });
            this.post(`${BASE_URI}/register`, (schema, request) => {
                let newUser = JSON.parse(request.requestBody);
                const isEmailTaken =
                    users.find(user => user.email === newUser.email) !==
                    undefined;
                if (isEmailTaken) {
                    return {
                        error: "email already exists"
                    };
                } else {
                    users.push(newUser);
                    return {
                        user: newUser
                    };
                }
            });
        }
    });
}
