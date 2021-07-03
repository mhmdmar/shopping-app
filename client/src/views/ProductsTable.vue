<template>
    <div class="products-table-container">
        <div v-if="numberOfProducts > 0">
            <div class="products-container">
                <div
                    v-for="(product, i) in productsByPageNumber"
                    :key="i"
                    class="product-item"
                >
                    <router-link :to="productPath + '/' + product.id">
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
            <b-pagination
                v-if="numberOfProducts > perPage"
                v-model="currentPage"
                :total-rows="numberOfProducts"
                :per-page="perPage"
                :disabled="totalPages <= 1"
                align="center"
                first-text="⏮"
                prev-text="⏪"
                next-text="⏩"
                last-text="⏭"
                class="mt-4 pagination-wrapper"
                @change="changePageNumber"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
    import Product from "@/views/Product";
    import {routesPaths} from "@/router/routes";
    import {productsService} from "@/services/productsService.js";
    import {mapGetters, mapMutations} from "vuex";
    export default {
        name: "ProductsTable",
        components: {
            Product
        },
        computed: {
            ...mapGetters(["products"]),
            totalPages() {
                return Math.ceil(this.numberOfProducts / this.perPage);
            },
            productsByPageNumber() {
                let products = [];
                let startIndex = (this.currentPage - 1) * this.perPage;
                let endIndex = this.currentPage * this.perPage;
                for (
                    let i = startIndex;
                    i < endIndex && i < this.numberOfProducts;
                    i++
                ) {
                    products.push(this.products[i]);
                }
                return products;
            },
            numberOfProducts() {
                return this.products?.length || 0;
            }
        },
        data() {
            return {
                productPath: routesPaths.product,
                perPage: 11,
                currentPage: 1
            };
        },
        methods: {
            ...mapMutations(["setIsLoading", "setProducts"]),
            changePageNumber(newPageNumber) {
                this.currentPage = newPageNumber;
            }
        },
        mounted() {
            this.setIsLoading(true);
            productsService
                .getProducts()
                .then(products => {
                    if (Array.isArray(products)) {
                        this.setProducts(products);
                    }
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
    .products-table-container {
        display: flex;
        flex-direction: column;
    }
    .products-container {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        height: 85%;
        position: fixed;
        overflow: auto;
        gap: 2px;
        justify-content: center;
    }
    .product-item {
        list-style: none;
        flex: 0 0 32.333333%;
        max-height: 400px;
    }
    .pagination-wrapper {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    @media only screen and (max-width: 600px) {
        .products-table-container {
            overflow: scroll;
        }
        .products-container {
            height: 80%;
        }
        .product-item {
            width: inherit;
        }
    }
</style>
