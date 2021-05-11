import wrapComponent from "./shared/wrapper";
import NotFound from "@/views/NotFound.vue";

describe("NotFound.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = wrapComponent(NotFound);
    });

    it("sanity test", () => {
        expect(wrapper.text()).toMatch("");
    });
});
