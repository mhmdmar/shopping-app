<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template">
                    <h1>
                        Oops!
                    </h1>
                    <h2>
                        404 Not Found
                    </h2>
                    <div class="error-details">
                        Sorry, an error has occurred, Requested page not found!
                    </div>
                    <div class="error-actions">
                        <router-link
                            :to="homePath"
                            class="btn btn-primary btn-lg"
                        >
                            <span class="glyphicon glyphicon-home">
                                Take Me Home
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {routesPaths} from "@/router/routes";

    export default {
        name: "AccountBar",
        data() {
            return {
                homePath: routesPaths.home
            };
        }
    };
</script>
<style>
    .error-template {
        padding: 40px 15px;
        text-align: center;
    }
    .error-actions {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .error-actions .btn {
        margin-right: 10px;
    }
</style>
