<template>
    <div class="product-cart-container">
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="quantity">Quantity</span>
            </div>
            <input
                type="number"
                class="form-control"
                aria-label="Small"
                value="1"
                min="1"
                v-model.number="selectedQuantity"
                aria-describedby="quantity"
            />
        </div>
        <div class="cart-controller">
            <button class="btn btn-primary" @click="addToCart">
                <SvgIcon class="cart" icon="cart"></SvgIcon>
                <span>Add to cart</span>
            </button>
        </div>
    </div>
</template>

<script>
    import SvgIcon from "@/components/SvgIcon";
    export default {
        name: "ProductCart",
        components: {SvgIcon},
        data() {
            return {
                selectedQuantity: 1
            };
        },
        methods: {
            addToCart() {
                this.$emit("addToCartClicked", this.selectedQuantity);
            }
        }
    };
</script>

<style scoped lang="scss">
    .product-cart-container {
    }
    .btn {
        background-color: #ff9800;
        border: none;
        color: white;
        padding: 12px 16px;
        font-size: 16px;
        cursor: pointer;
    }
    .cart {
        &:hover {
            background-color: inherit;
        }
    }
    .cart-controller .btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .cart-controller svg,
    .cart-controller span {
        display: inline-block;
        vertical-align: middle;
        fill: white;
    }
</style>
