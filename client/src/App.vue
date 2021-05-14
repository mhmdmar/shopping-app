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
        computed: {
            ...mapGetters(["isLoading"])
        }
    };
</script>

<style lang="scss">
    @import "src/styles/ellipsis";
    .ellipses {
        @include ellipsis;
    }
    img {
        user-select: none;
    }
</style>
