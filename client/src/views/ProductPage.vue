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
    </div>
</template>

<script>
    import Product from "@/views/Product";
    import {productsService} from "@/services/productsService";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {cartService} from "@/services/cartService";
    import {isNil} from "utilly";
    import {routesPaths} from "@/router/routes";
    export default {
        name: "ProductPage",
        components: {Product},
        data() {
            return {
                product: null,
                id: this.$route.params.id,
                productRoute: routesPaths.product
            };
        },
        methods: {
            ...mapMutations(["setIsLoading"]),
            ...mapActions(["addItemToCart"]),
            setProduct() {
                this.setIsLoading(true);
                productsService
                    .getProduct(this.id)
                    .then(product => {
                        this.product = product;
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.setIsLoading(false);
                    });
            },
            addProductToCart(id, quantity) {
                if (isNil(this.user)) {
                    return;
                }

                if (quantity < -1) {
                    quantity = 1;
                }

                this.setIsLoading(true);
                cartService
                    .addToCart(id, quantity)
                    .then((/* cart */) => {
                        this.addItemToCart({
                            id,
                            quantity
                        });
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
            ...mapGetters(["user", "isLoggedIn"])
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
