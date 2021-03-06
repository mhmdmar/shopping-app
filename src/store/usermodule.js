export default {
    state: {
        _user: null
    },
    mutations: {
        setUser(state, user) {
            state._user = user;
        },
        logoutUser(state) {
            state._user = null;
        }
    },
    actions: {},
    getters: {
        user(state) {
            return state._user;
        }
    }
};
