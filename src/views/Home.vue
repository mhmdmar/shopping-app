<template>
    <div class="home">
        <ProductsTable></ProductsTable>
    </div>
</template>

<script>
    import ProductsTable from "@/views/ProductsTable";
    export default {
        name: "Home",
        components: {
            ProductsTable
        }
    };
</script>
<style></style>
