<template>
    <div class="product-page-container">
        <Product
            v-if="product !== null"
            :title="product.title"
            :id="id"
            :picture="product.picture"
            :price="product.price"
            :rating="product.rating"
            :addToCartVisible="true"
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
    export default {
        name: "ProductPage",
        components: {Product},
        data() {
            return {
                product: null,
                id: this.$route.params.id
            };
        },
        methods: {
            ...mapMutations(["setIsLoading"]),
            ...mapActions(["addItemToCart"]),
            addProductToCart(id, quantity) {
                if (quantity < -1) {
                    quantity = 1;
                }

                if (isNil(this.user)) {
                    return;
                }

                this.setIsLoading(true);
                cartService
                    .addToCart(
                        this.user.email,
                        this.user.password,
                        id,
                        quantity
                    )
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
        computed: {
            ...mapGetters(["user"])
        }
    };
</script>

<style scoped>
    .product-page-container {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
</style>
