import API from "@/services/API";
import {BASE_URI} from "@/services/services";

export default {
    state: {
        _userToken: null,
        _user: null
    },
    mutations: {
        setUser(state, user) {
            state._user = user;
        },
        setUserField(state, {key, value}) {
            if (state._user) {
                state._user[key] = value;
            }
        },
        setUserToken(state, userToken) {
            state._userToken = userToken;
        }
    },
    actions: {
        setUserSession({state, commit, dispatch}, payload) {
            const {token, user, cart} = payload;
            if (!user) {
                return;
            }
            commit("setUser", user);
            commit("setUserToken", token);
            if (cart) {
                commit("setCartId", cart?.cartId);
                dispatch("updateCartItems", cart?.items);
            }
            API.defaults.headers.common[
                "authorization"
            ] = `Bearer ${state._userToken}`;
        },
        removeUserSession({commit, dispatch}) {
            commit("setUserToken", null);
            commit("setUser", null);
            commit("setCartId", null);
            dispatch("updateCartItems", []);
            delete API.defaults.headers.common["authorization"];
        }
    },
    getters: {
        userToken(state) {
            return state._userToken;
        },
        user(state) {
            return state._user;
        },
        isLoggedIn(state) {
            return !!state._userToken;
        }
    }
};
