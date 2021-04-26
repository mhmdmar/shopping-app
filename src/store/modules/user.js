import localStorage from "@/services/localStorage";
import {isUndefined, isNil} from "utilly";
export default {
    state: {
        _user: null
    },
    mutations: {
        setUserSession(state, user) {
            state._user = user;
            localStorage.setValue("user", user);
            this.dispatch("setCartItems", user.cart);
        },
        removeUserSession(state) {
            state._user = null;
            localStorage.removeKey("user");
            this.dispatch("setCartItems", null);
        }
    },
    actions: {},
    getters: {
        user(state) {
            return state._user;
        },
        isLoggedIn(state) {
            return !isUndefined(state._user) && !isNil(state._user);
        }
    }
};
