<template>
    <div class="product-page-container">
        <Product
            v-if="product !== null"
            :title="product.title"
            :id="id"
            :picture="product.picture"
            :price="product.price"
            :rating="product.rating"
        >
        </Product>
    </div>
</template>

<script>
    import Product from "@/views/Product";
    import {productsService} from "@/services/productsService";
    import {mapMutations} from "vuex";
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
            ...mapMutations(["setIsLoading"])
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
