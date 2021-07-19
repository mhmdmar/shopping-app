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
                    >Reset Password
                </router-link>
            </div>
            <div>
                <label>Select your profile picture:</label>
                <input
                    type="file"
                    accept="image/*"
                    @change="uploadImage($event)"
                    id="profilePicture"
                    name="profilePicture"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {routesPaths} from "@/router/routes";
    import {userService} from "@/services/userService";

    export default {
        name: "User.vue",
        data() {
            return {
                resetPasswordPath: routesPaths.resetPassword
            };
        },
        computed: {
            ...mapGetters(["user"])
        },
        methods: {
            ...mapMutations(["setIsLoading", "setUserField"]),
            uploadImage(event) {
                this.setIsLoading(true);
                userService
                    .uploadProfilePicture(
                        this.user.email,
                        event.target.files[0]
                    )
                    .then(({data, error}) => {
                        if (error) {
                            console.error(error);
                        } else {
                            this.setUserField({
                                key: "profilePicture",
                                value: data
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.setIsLoading(false);
                    });
            }
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
