import {mapActions, mapMutations} from "vuex";
import {cartService} from "@/services/cartService";
import {productsService} from "@/services/productsService";

export const cartMixin = {
    methods: {
        ...mapMutations(["setIsLoading"]),
        ...mapActions(["updateCartItems"]),
        updateCart() {
            this.setIsLoading(true);
            cartService
                .getCartItems(this.cartId)
                .then(items => {
                    this.updateCartItems(items);
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    this.setIsLoading(false);
                });
        },
        updateItems() {
            if (this.cartItems.length > 0) {
                this.setIsLoading(true);
                productsService
                    .getProductsFromList(this.cartItems)
                    .then(items => {
                        this.items =
                            items?.map(item => {
                                return {
                                    ...item,
                                    selected: true
                                };
                            }) || [];
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.setIsLoading(false);
                    });
            } else {
                this.items = [];
            }
        }
    }
};
