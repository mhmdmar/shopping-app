<template>
    <div id="app">
        <topbar></topbar>
        <router-view />
    </div>
</template>

<script>
    import Topbar from "@/components/Topbar.vue";

    export default {
        name: "App",
        components: {
            Topbar
        }
    };
</script>

<style lang="scss"></style>
