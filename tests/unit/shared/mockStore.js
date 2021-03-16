export const mockStore = Object.freeze({
    state: {},
    actions: {},
    mutations: {
        loginUser: jest.fn(),
        logoutUser: jest.fn(),
        isLoading: jest.fn()
    },
    getters: {
        user: jest.fn(() => null)
    }
});
