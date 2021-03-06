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
        },
        data() {
            return {};
        }
    };
</script>

<style scoped lang="scss"></style>
