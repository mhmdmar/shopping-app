<template>
    <div>
        <div v-if="items.length && items.length > 0">
            <div v-for="(item, index) in items" :key="index">
                <ShoppingItem
                    :price="item.price"
                    :picture="item.picture"
                    :title="item.title"
                    :quantity="item.quantity"
                    :selected="item.selected"
                    @itemSelectionChange="
                        isSelected =>
                            $emit('itemSelectionChange', item, isSelected)
                    "
                ></ShoppingItem>
                <div class="dropdown-divider"></div>
            </div>
        </div>
        <div v-else>
            <span>Cart is empty</span>
        </div>
    </div>
</template>

<script>
    import ShoppingItem from "@/components/ShoppingItem";
    export default {
        name: "ShoppingList",
        components: {ShoppingItem},
        props: {
            items: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {};
        }
    };
</script>

<style scoped></style>
