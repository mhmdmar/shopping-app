<template>
    <div id="app">
        <topbar></topbar>
        <Spinner :is-loading="isLoading"></Spinner>
        <router-view />
    </div>
</template>

<script>
    import Topbar from "@/components/Topbar.vue";
    import Spinner from "@/components/Spinner";
    import {mapGetters} from "vuex";
    export default {
        name: "App",
        components: {
            Topbar,
            Spinner
        },
        computed: {
            ...mapGetters(["isLoading"])
        }
    };
</script>

<style scoped lang="scss"></style>
