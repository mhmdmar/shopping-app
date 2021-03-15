<template>
    <loading
        :active.sync="isLoading"
        :can-cancel="canCancel"
        :is-full-page="fullPage"
        :on-cancel="onCancel"
    ></loading>
</template>

<script>
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    export default {
        name: "Spinner",
        components: {
            Loading
        },
        props: {
            isLoading: {
                type: Boolean
            },
            canCancel: {
                type: Boolean
            },
            fullPage: {
                type: Boolean
            },
            onCancel: {
                type: Function,
                default: () => {}
            }
        }
    };
</script>

<style scoped></style>
