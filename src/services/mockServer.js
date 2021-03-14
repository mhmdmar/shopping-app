import {createServer} from "miragejs";
import {BASE_URI} from "@/services/services.js";

const products = [
    {
        id: "1",
        picture: "/images/product1.jpg",
        title: "Screen",
        price: 1300,
        rating: 5
    },
    {
        id: "2",
        picture: "/images/product2.jpg",
        title: "Headset",
        price: 110,
        rating: 4
    },
    {
        id: "3",
        picture: "/images/product3.jpg",
        title: "Shampoo",
        price: 15,
        rating: 3
    },
    {
        id: "4",
        picture: "/images/product1.jpg",
        title: "Screen2",
        price: 1200,
        rating: 2
    },
    {
        id: "5",
        picture:
            "https://m.media-amazon.com/images/I/51bq-oNA--L._AC_SR160,160_.jpg",
        title: "Dress",
        price: 1500000,
        rating: 1
    }
];
const users = [
    {
        email: "mhmdmar@gmail.com",
        username: "mhmdmar",
        password: "123456",
        profilePicture: "/images/logo.png"
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
            this.get(`${BASE_URI}/users`, () => users);
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
            this.get(`${BASE_URI}/products`, () => products);
            this.get(`${BASE_URI}/product`, (schema, request) => {
                const {id} = request.queryParams;
                const product = products.find(product => product.id === id);
                if (!product) {
                    return {
                        error: "invalid username and/or password"
                    };
                }
                return product;
            });
        }
    });
}
