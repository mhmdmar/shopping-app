<template>
    <div class="product-page-container">
        <Product
            v-if="product !== null"
            :title="product.title"
            :id="id"
            :picture="product.picture"
            :price="product.price"
            :rating="product.rating"
            :addToCartVisible="isLoggedIn"
            @productAdded="addProductToCart"
        >
        </Product>
        <div v-else-if="!isLoading">
            <h3>Product with id {{ this.id }} is not found on the server</h3>
        </div>
    </div>
</template>

<script>
    import Product from "@/views/Product";
    import {productsService} from "@/services/productsService";
    import {mapGetters, mapMutations} from "vuex";
    import {cartService} from "@/services/cartService";
    import {isNil} from "utilly";
    import {routesPaths} from "@/router/routes";
    import {cartMixin} from "@/mixin/cart";

    export default {
        name: "ProductPage",
        components: {Product},
        mixins: [cartMixin],
        data() {
            return {
                product: null,
                id: this.$route.params.id,
                productRoute: routesPaths.product
            };
        },
        methods: {
            ...mapMutations(["setIsLoading"]),
            addProductToCart(productId, quantity) {
                if (isNil(this.user)) {
                    return;
                }
                if (!this.cartId) {
                    console.error("cartId is missing");
                }
                if (quantity < -1) {
                    quantity = 1;
                }
                this.setIsLoading(true);
                cartService
                    .addToCart(productId, quantity, this.cartId)
                    .then(() => {
                        this.updateCart();
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.setIsLoading(false);
                    });
            },
            setProduct() {
                this.setIsLoading(true);
                productsService
                    .getProduct(this.id)
                    .then(product => {
                        if (product !== null) {
                            this.product = product;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.setIsLoading(false);
                    });
            }
        },

        mounted() {
            this.setProduct();
        },
        watch: {
            "$route.params.id"(newVal) {
                this.id = newVal;
                this.setProduct();
            }
        },
        computed: {
            ...mapGetters(["user", "isLoggedIn", "isLoading", "cartId"])
        }
    };
</script>

<style scoped>
    .product-page-container {
        display: block;
        width: 50%;
        margin: 10% auto;
    }

    @media only screen and (max-width: 600px) {
        .product-page-container {
            width: 100%;
        }
    }
</style>
