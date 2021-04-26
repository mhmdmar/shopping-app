<template>
    <div>
        <ShoppingList :items="items"></ShoppingList>
    </div>
</template>

<script>
    import ShoppingList from "@/components/ShoppingList";
    import {mapGetters} from "vuex";
    export default {
        name: "CartRoom",
        components: {ShoppingList},
        data() {
            return {
                selectedQuantity: 1
            };
        },
        methods: {},
        computed: {
            ...mapGetters(["cartItems"]),
            items() {
                if (this.cartItems) {
                    for (let item in this.cartItems) {
                        console.log(item, this.cartItems[item]);
                    }
                }
                return [];
            }
        }
    };
</script>

<style scoped></style>
