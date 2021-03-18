import {createServer} from "miragejs";
import {API_BASE_URI, BASE_URI} from "@/services/services.js";

const products = [
    {
        id: "1",
        picture: `${BASE_URI}/images/product1.jpg`,
        title: "Screen",
        price: 1300,
        rating: 5
    },
    {
        id: "2",
        picture: `${BASE_URI}/images/product2.jpg`,
        title: "Headset",
        price: 110,
        rating: 4
    },
    {
        id: "3",
        picture: `${BASE_URI}/images/product3.jpg`,
        title: "Shampoo",
        price: 15,
        rating: 3
    },
    {
        id: "4",
        picture: `${BASE_URI}/images/product1.jpg`,
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
        profilePicture: `${BASE_URI}/images/logo.jpg`
    },
    {
        email: "admin",
        username: "admin",
        password: "admin"
    }
];
export function makeServer() {
    return createServer({
        routes() {
            this.get(`${API_BASE_URI}/users`, () => users);
            this.get(`${API_BASE_URI}/user`, (schema, request) => {
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
            this.post(`${API_BASE_URI}/register`, (schema, request) => {
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
            this.get(`${API_BASE_URI}/products`, () => products);
            this.get(`${API_BASE_URI}/product`, (schema, request) => {
                const {id} = request.queryParams;
                const product = products.find(product => product.id === id);
                if (!product) {
                    return {
                        error: "product doesn't exists"
                    };
                }
                return product;
            });
        }
    });
}
