<template>
    <div class="checkout-window-container">
        <div>Subtotal ({{ itemsCount }} items) : {{ priceSum }}$</div>
        <b-btn :disabled="itemsCount === 0">Proceed to checkout</b-btn>
    </div>
</template>

<script>
    export default {
        name: "CheckoutWindow",
        props: {
            itemsCount: {
                required: false,
                type: Number,
                default: 0
            },
            priceSum: {
                required: false,
                type: Number,
                default: 0
            }
        }
    };
</script>

<style scoped>
    .checkout-window-container {
        display: flex;
        padding: 10px;
        flex-direction: column;
        align-items: center;
    }
</style>
