<template>
    <div class="cart-container">
        <span v-if="cartSize > 0">{{ cartSizeVisual }}</span>
        <SvgIcon
            icon="cart"
            class="cart-icon"
            @click="navigateToRoute(cartRoom)"
        ></SvgIcon>
    </div>
</template>

<script>
    import SvgIcon from "@/components/SvgIcon";
    import {routerUtil} from "@/mixin/routerUtil";
    const cartRoom = "/cartRoom";
    export default {
        name: "CartHeader",
        components: {SvgIcon},
        mixins: [routerUtil],
        props: {
            cartSize: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                cartRoom
            };
        },
        computed: {
            cartSizeVisual() {
                if (this.cartSize > 99) {
                    return "99+";
                } else {
                    return this.cartSize;
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "../styles/sharedStyles";
    .cart-container {
        @include clickable-container;
        &:hover {
            > .cart-icon {
                background: inherit;
            }
        }
        & > .cart-icon {
            height: 38px;
            width: 38px;
            fill: white;
        }
    }
</style>
