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
    import {mapGetters, mapMutations} from "vuex";
    import localStorage from "@/services/localStorage";
    import {utillyMixin} from "@/mixin/utilly";
    export default {
        name: "App",
        components: {
            Topbar,
            Spinner
        },
        mixins: [utillyMixin],
        mounted() {
            const user = localStorage.getValue("user");
            if (!this.isNil(user)) {
                this.loginUser(user);
            }
        },
        methods: {
            ...mapMutations(["loginUser"])
        },
        computed: {
            ...mapGetters(["isLoading"])
        }
    };
</script>

<style scoped lang="scss"></style>
