import localStorage from "@/services/localStorage";
export default {
    state: {
        _user: null
    },
    mutations: {
        loginUser(state, user) {
            state._user = user;
            localStorage.setValue("user", user);
        },
        logoutUser(state) {
            state._user = null;
            localStorage.removeKey("user");
        }
    },
    actions: {},
    getters: {
        user(state) {
            return state._user;
        }
    }
};
