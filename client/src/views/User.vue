<template>
    <div>
        <h1>User Settings</h1>
        <div class="settings">
            <div>
                <span class="info-title"> Email:</span>
                <span class="info-value">{{ this.user.email }} </span>
            </div>
            <div>
                <span class="info-title"> Username:</span>
                <span class="info-value">{{ this.user.username }} </span>
            </div>
            <div>
                <router-link :to="resetPasswordPath"
                    >Reset Password</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {routesPaths} from "@/router/routes";

    export default {
        name: "User.vue",
        data() {
            return {
                resetPasswordPath: routesPaths.resetPassword
            };
        },
        computed: {
            ...mapGetters(["user"])
        }
    };
</script>

<style scoped>
    .settings {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .info-title {
        font-weight: bold;
        margin-right: 5px;
    }
</style>
