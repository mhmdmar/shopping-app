<template>
    <div class="cart-room-container">
        <div class="cart-room-inner-container">
            <h2>Shopping Cart</h2>
            <div class="dropdown-divider"></div>
            <ShoppingList
                v-if="loaded"
                :items="items"
                @itemSelectionChange="
                    (item, isSelected) => (item.selected = isSelected)
                "
            ></ShoppingList>
            <CheckoutWindow
                :itemsCount="itemsCount"
                :priceSum="priceSum"
            ></CheckoutWindow>
        </div>
    </div>
</template>

<script>
    import ShoppingList from "@/components/ShoppingList";
    import {mapGetters, mapMutations} from "vuex";
    import {productsService} from "@/services/productsService";
    import CheckoutWindow from "@/components/CheckoutWindow";

    export default {
        name: "CartRoom",
        components: {CheckoutWindow, ShoppingList},
        data() {
            return {
                loaded: false,
                items: []
            };
        },
        mounted() {
            if (this.cartItemsId?.length > 0) {
                this.setIsLoading(true);
                productsService
                    .getProducts(this.cartItemsId)
                    .then(res => {
                        if (res !== null) {
                            this.items = res.map(item => {
                                const {quantity} = this.cartItems.find(
                                    item => item.id === item.id
                                );
                                this.$set(item, "quantity", quantity);
                                this.$set(item, "selected", true);
                                return item;
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.setIsLoading(false);
                        this.loaded = true;
                    });
            } else {
                this.loaded = true;
            }
        },
        methods: {
            ...mapMutations(["setIsLoading"])
        },
        computed: {
            ...mapGetters(["cartItemsId", "cartItems"]),
            itemsCount() {
                return this.items.reduce((accumulator, item) => {
                    if (item.selected) {
                        accumulator += item.quantity;
                    }
                    return accumulator;
                }, 0);
            },
            priceSum() {
                return this.items.reduce((accumulator, item) => {
                    if (item.selected) {
                        accumulator += item.quantity * item.price;
                    }
                    return accumulator;
                }, 0);
            }
        }
    };
</script>

<style scoped>
    .cart-room-container {
        padding: 20px;
    }
</style>
