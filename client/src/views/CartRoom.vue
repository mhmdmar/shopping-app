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
import CheckoutWindow from "@/components/CheckoutWindow";
import {cartService} from "@/services/cartService";

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
            if (this.cartSize) {
                this.setIsLoading(true);
                cartService
                    .getCart()
                    .then(res => {
                        const items = res.items;
                        if (items) {
                            items.map(item => {
                                this.$set(item, "selected", true);
                            });
                            this.items = items;
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
            ...mapGetters(["cartItems", "cartSize"]),
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
