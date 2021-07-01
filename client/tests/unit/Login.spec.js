import wrapComponent from "./shared/wrapper";
import Login from "@/views/Forms/Login.vue";

describe("Login.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = wrapComponent(Login);
    });

    it("sanity test", () => {
        expect(wrapper.text()).toMatch("");
    });
});
