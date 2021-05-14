export default {
    state: {
        _isLoading: false
    },
    mutations: {
        setIsLoading(state, isLoading) {
            state._isLoading = isLoading;
        }
    },
    actions: {},
    getters: {
        isLoading(state) {
            return state._isLoading;
        }
    }
};
