<template>
    <div class="item-container">
        <b-check :checked="selected" @change="selectedClicked"></b-check>
        <img :src="picture" :alt="title" />
        <div class="item-properties-container">
            <div class="product-title">
                <div v-if="id">
                    <router-link
                        class="route-item"
                        :to="productPath + '/' + id"
                    >
                        {{ title }}
                    </router-link>
                </div>
                <div v-else>
                    {{ title }}
                </div>
            </div>
            <div class="price-container">Price: {{ price }}$</div>
            <div class="quantity-container">
                Quantity:
                <EditableItem
                    :value="quantity"
                    @valueChanged="updateQuantity"
                ></EditableItem>
            </div>
        </div>
    </div>
</template>

<script>
    import {routesPaths} from "@/router/routes";
    import EditableItem from "@/components/EditableItem";

    export default {
        name: "ShoppingItem",
        components: {EditableItem},
        data() {
            return {
                productPath: routesPaths.product
            };
        },
        props: {
            id: {
                default: null
            },
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
            },
            updateQuantity(newQuantity) {
                this.$emit("quantityUpdated", newQuantity);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../styles/sharedStyles";

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
    .quantity-container {
        display: flex;
        flex-direction: row;
        gap: 2px;
    }
    div {
        cursor: default;
    }
</style>
