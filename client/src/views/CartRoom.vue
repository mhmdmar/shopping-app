<template>
    <div class="cart-room-container">
        <div class="cart-room-inner-container" v-if="loaded">
            <div class="cart-room-header-container">
                <b-check
                    :checked="allItemsSelected"
                    @change="selectAllChecked"
                ></b-check>
                <h2 class="title">Shopping Cart</h2>
            </div>
            <div class="dropdown-divider"></div>
            <ShoppingList
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
            ...mapMutations(["setIsLoading"]),
            selectAllChecked(isSelected) {
                this.items.forEach(item => {
                    item.selected = isSelected;
                });
            }
        },
        computed: {
            ...mapGetters(["cartItems", "cartSize"]),
            allItemsSelected() {
                return this.items.every(item => item.selected);
            },
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
    .title {
        text-align: center;
    }
    .cart-room-container {
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
    }
    .cart-room-header-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
</style>
