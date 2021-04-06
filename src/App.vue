<template>
    <div id="app">
        <SvgSprite />
        <topbar></topbar>
        <Spinner :is-loading="isLoading"></Spinner>
        <router-view />
    </div>
</template>

<script>
    import SvgSprite from "@/components/SvgSprite.vue";
    import Topbar from "@/components/Topbar.vue";
    import Spinner from "@/components/Spinner";
    import {mapGetters} from "vuex";
    import localStorage from "@/services/localStorage.js";
    import {utillyMixin} from "@/mixin/utilly.js";
    import {userMixin} from "@/mixin/user";

    export default {
        name: "App",
        components: {
            Topbar,
            Spinner,
            SvgSprite
        },
        mixins: [utillyMixin, userMixin],
        mounted() {
            const user = localStorage.getValue("user");
            if (!this.isNil(user)) {
                this.loginUser(user.email, user.password);
            }
        },
        computed: {
            ...mapGetters(["isLoading"])
        }
    };
</script>

<style lang="scss">
    .ellipses {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
