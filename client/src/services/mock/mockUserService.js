import {users} from "@/services/mock/mockData";
export default function userRoutes() {
    this.get(`${this.config.baseURL}/users`, () => {
        return {
            users
        };
    });
    this.get(`${this.config.baseURL}/user`, (schema, request) => {
        const {email, password} = request.queryParams;
        const user = users.find(
            user => user.email === email && user.password === password
        );
        if (!user) {
            return {
                error: "invalid email and/or password"
            };
        }
        return {
            user
        };
    });
    this.post(`${this.config.baseURL}/register`, (schema, request) => {
        let newUser = JSON.parse(request.requestBody);
        const isEmailTaken =
            users.find(user => user.email === newUser.email) !== undefined;
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
