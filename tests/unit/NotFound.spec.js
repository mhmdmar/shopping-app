import {shallowMount} from "@vue/test-utils";
import NotFound from "@/views/NotFound.vue";

describe("NotFound.vue", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(NotFound, {
            stubs: ["router-link"]
        });
    });
    it("sanity test", () => {
        expect(wrapper.text()).toMatch(
            `Sorry, an error has occurred, Requested page not found!`
        );
    });
});
