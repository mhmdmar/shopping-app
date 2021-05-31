<template>
    <div class="product-container">
        <div class="product-header">
            <img :src="picture" :alt="title" />
        </div>
        <div class="product-body">
            <div class="product-title">
                {{ title }}
            </div>
            <div>
                <star-rating
                    :star-size="20"
                    :rating="rating"
                    :read-only="true"
                    :show-rating="false"
                ></star-rating>
            </div>
            <div>
                <span class="price">{{ price }}$</span>
            </div>
            <ProductCart
                v-if="addToCartVisible"
                @addToCartClicked="
                    quantity => $emit('productAdded', id, quantity)
                "
            ></ProductCart>
        </div>
    </div>
</template>

<script>
    import StarRating from "vue-star-rating";
    import ProductCart from "@/components/ProductCart";
    export default {
        name: "Product",
        components: {StarRating, ProductCart},
        props: {
            id: {
                type: String,
                required: true
            },
            picture: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            addToCartVisible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {};
        }
    };
</script>

<style scoped lang="scss">
    @import "../styles/sharedStyles";
    .product-container {
        border: 1px solid darkgray;
        width: 100%;
        height: 100%;
    }
    .product-body,
    .product-header {
        align-items: center;
    }
    .product-body {
        display: flex;
        flex-direction: column;
        font-size: 22px;
    }
    .price {
        line-height: 1 !important;
        color: #cc1c39 !important;
    }
    img {
        height: 250px;
        width: 100%;
    }
    .product-title {
        @include ellipsis;
        text-align: center;
        width: 100%;
    }
</style>
