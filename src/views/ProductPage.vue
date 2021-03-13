<template>
    <div class="product-page-container">
        <Product
            :title="title"
            :id="id"
            :picture="picture"
            :price="price"
            :rating="rating"
        >
        </Product>
    </div>
</template>

<script>
    import Product from "@/views/Product";
    import {productsService} from "@/services/productsService";
    export default {
        name: "ProductPage",
        components: {Product},
        data() {
            return {
                id: this.$route.params.id,
                picture: "",
                title: "",
                price: 0,
                rating: 0
            };
        },
        async beforeMount() {
            const curProduct = await productsService.getProduct(this.id);
            this.picture = curProduct.picture;
            this.title = curProduct.title;
            this.price = curProduct.price;
            this.rating = curProduct.rating;
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
