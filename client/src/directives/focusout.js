const focusout = {
    bind(el, binding) {
        el.onFocusout = function(event) {
            const relatedTarget = event.relatedTarget;
            const isRelated = el === relatedTarget;
            const isContained = el.contains(relatedTarget);
            if (!isRelated && !isContained) {
                binding.value?.();
            }
        };
        el.addEventListener("focusout", el.onFocusout);
    },
    unbind(el) {
        el.removeEventListener("focusout", el.onFocusout);
    }
};

export default focusout;
