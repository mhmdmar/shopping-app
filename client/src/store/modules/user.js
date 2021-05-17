import API from "@/services/API";

export default {
    state: {
        _userToken: null,
        _user: null
    },
    mutations: {
        setUser(state, user) {
            state._user = user;
        },
        setUserToken(state, userToken) {
            state._userToken = userToken;
        }
    },
    actions: {
        setUserSession({state, commit}, payload) {
            const {token, user} = payload;
            if (!user) {
                return;
            }
            commit("setUser", user);
            commit("setCartItems", user?.cart?.items);
            if (token) {
                commit("setUserToken", token);
            }
            API.defaults.headers.common[
                "authorization"
            ] = `Bearer ${state._userToken}`;
        },
        removeUserSession({commit}) {
            commit("setUserToken", null);
            commit("setUser", null);
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
