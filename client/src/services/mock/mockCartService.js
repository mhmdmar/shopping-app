import {products, users} from "@/services/mock/mockData";
import {isNumber, isUndefined} from "utilly";

export default function cartRoutes() {
    this.get(`${this.config.baseURL}/cart`, (schema, request) => {
        const {email, password} = request.queryParams;
        const user = users.find(
            user => user.email === email && user.password === password
        );
        if (!user) {
            return {
                error: "invalid email and/or password"
            };
        }
        const items = user.cart?.items?.map(curItem => {
            const product = products.find(item => item.id === curItem.id);
            return {...product, quantity: curItem.quantity};
        });
        return {items};
    });
    this.post(`${this.config.baseURL}/cart`, (schema, request) => {
        let {email, password, productId, quantity} = JSON.parse(
            request.requestBody
        );

        quantity = Number(quantity);
        if (!isNumber(quantity)) {
            return {
                error: "quantity must be a valid number"
            };
        }

        if (isUndefined(email) || isUndefined(password)) {
            return {
                error: "please provide an email/password"
            };
        }

        const user = users.find(
            user => user.email === email && user.password === password
        );
        if (!user) {
            return {
                error: "invalid email and/or password"
            };
        }
        if (user.cart === undefined) {
            user.cart = {
                items: []
            };
        }
        const productIndex = user.cart.items.findIndex(
            item => item.id === productId
        );

        if (productIndex === -1) {
            user.cart.items.push({
                id: productId,
                quantity
            });
        } else {
            user.cart.items[productIndex].quantity += quantity;
        }
        return {
            message: "Added item to cart successfully"
        };
    });
}
