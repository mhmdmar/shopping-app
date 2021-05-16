import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import global from "@/store/modules/global.js";
import cart from "@/store/modules/cart";
import appStorage from "@/services/appStorage";
import {userService} from "@/services/userService";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        global,
        cart
    }
});

const storedUserToken = appStorage.getValue("user-token");
if (storedUserToken) {
    userService.restoreSession(storedUserToken).then(payload => {
        if (payload.user) {
            store.dispatch("setUserSession", payload);
        }
    });
}
export default store;
