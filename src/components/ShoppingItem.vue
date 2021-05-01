<template>
    <div class="item-container">
        <b-check :checked="selected" @change="selectedClicked"></b-check>
        <img :src="picture" :alt="title" />
        <div class="item-properties-container">
            <div class="product-title">
                {{ title }}
            </div>
            <div>Price: {{ price }}$</div>
            <div>Qty: {{ quantity }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShoppingItem",
        data() {
            return {};
        },
        props: {
            selected: {
                required: false,
                type: Boolean,
                default: true
            },
            title: {
                required: true,
                type: String
            },
            picture: {
                required: true,
                type: String
            },
            price: {
                required: true,
                type: Number
            },
            quantity: {
                required: true,
                type: Number
            }
        },
        methods: {
            selectedClicked(isSelected) {
                this.$emit("itemSelectionChange", isSelected);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/styles/ellipsis";

    .item-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .item-properties-container {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }
    img {
        height: 180px;
        width: 250px;
    }
    .product-title {
        @include ellipsis;
    }
</style>
