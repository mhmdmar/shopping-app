import {createServer} from "miragejs";
import userRoutes from "@/services/mock/mockUserService";
import productsRoutes from "@/services/mock/mockProductsService";
import cartRoutes from "@/services/mock/mockCartService";
import config from "@/services/mock/config.js";
export function createMockServer() {
    return createServer({
        routes() {
            this.config = config;
            userRoutes.call(this);
            productsRoutes.call(this);
            cartRoutes.call(this);
        }
    });
}
