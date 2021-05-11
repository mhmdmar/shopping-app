import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import global from "@/store/modules/global.js";
import cart from "@/store/modules/cart";
import localStorage from "@/services/localStorage";
import {isNil, isUndefined} from "utilly";
import {userService} from "@/services/userService";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        global,
        cart
    }
});

const curUser = localStorage.getValue("user");
if (!isNil(curUser) && !isUndefined(curUser)) {
    userService.getAccount(curUser.email, curUser.password).then(response => {
        const {user} = response;
        if (!isNil(user)) {
            store.commit("setUserSession", user);
        }
    });
    store.commit("setUserSession", curUser);
}

export default store;
