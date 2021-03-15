<template>
    <div class="products-table-container">
        <div v-if="products !== null">
            <div
                class="products-row"
                v-for="(productsRow, i) in productsRows"
                :key="i"
            >
                <div
                    class="product-column"
                    v-for="product in productsRow"
                    :key="product.id"
                >
                    <router-link :to="'product/' + product.id">
                        <Product
                            :id="product.id"
                            :picture="product.picture"
                            :title="product.title"
                            :price="product.price"
                            :rating="product.rating"
                        ></Product>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Product from "@/views/Product";
    import {productsService} from "@/services/productsService.js";
    import {mapMutations} from "vuex";
    export default {
        name: "ProductsTable",
        components: {
            Product
        },
        computed: {
            productsRows() {
                let rows = [];
                for (
                    let i = 0;
                    i < this.products.length;
                    i += this.productPerRow
                ) {
                    let row = [];
                    for (let j = 0; j < this.productPerRow; j++) {
                        if (this.products[i + j]) {
                            row.push(this.products[i + j]);
                        }
                    }
                    rows.push(row);
                }
                return rows;
            }
        },
        data() {
            return {
                productPerRow: 3,
                products: null
            };
        },
        methods: {
            ...mapMutations(["setIsLoading"])
        },
        mounted() {
            this.setIsLoading(true);
            productsService
                .getProducts()
                .then(products => {
                    this.products = products;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.setIsLoading(false);
                });
        }
    };
</script>

<style scoped>
    .products-table-container {
    }
    .products-row {
        display: flex;
        border-bottom: 2px solid #ddd;
        margin-bottom: 16px;
    }
    .product-column {
        height: 100%;
        padding: 10px;
        margin-right: 2%;
        float: left;
        min-height: 1px;
        overflow: visible;
        width: 31.33%;
    }
    @media only screen and (max-width: 600px) {
        .products-table-container {
            overflow: scroll;
        }
        .product-column {
            width: inherit;
        }
    }
</style>
