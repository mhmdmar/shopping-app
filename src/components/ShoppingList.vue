<template>
    <div>
        <div v-for="(item, index) in items" :key="index">
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShoppingList",
        components: {},
        props: {
            items: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                selectedQuantity: 1
            };
        },
        methods: {}
    };
</script>

<style scoped></style>
