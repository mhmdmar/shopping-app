import {BASE_URI} from "@/services/services";

export const products = [
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
export const users = [
    {
        email: "mhmdmar@gmail.com",
        username: "mhmdmar",
        password: "123456",
        profilePicture: `images/logo.png`,
        cart: {
            items: [{id: "1", quantity: 5}]
        }
    },
    {
        email: "admin",
        username: "admin",
        password: "admin",
        cart: {
            items: [
                {
                    id: "2",
                    quantity: 3
                },
                {
                    id: "3",
                    quantity: 2
                }
            ]
        }
    }
];
