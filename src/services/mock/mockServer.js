import {createServer} from "miragejs";
import userRoutes from "@/services/mock/mockUserService";
import productsRoutes from "@/services/mock/mockProductsService";
import cartRoutes from "@/services/mock/mockCartService";

export function makeServer() {
    return createServer({
        routes() {
            userRoutes.call(this);
            productsRoutes.call(this);
            cartRoutes.call(this);
        }
    });
}
