const modifiersApplied = (event, shortcut) => {
    if (!event || !shortcut) {
        return false;
    }
    const modifiers = shortcut.modifiers;
    let len = modifiers?.length || 0;
    let applied = true;
    for (let i = 0; i < len; i++) {
        const curModifier = modifiers[i];
        if (!event[curModifier]) {
            applied = false;
        }
    }
    return applied;
};

const validateBinding = (el, shortcutsArray) => {
    let error = "";
    if (shortcutsArray === undefined) {
        error = "undefined shortcuts array";
    } else if (!Array.isArray(shortcutsArray)) {
        error = "shortcuts binding is not a valid array";
    } else if (shortcutsArray.length === 0) {
        error = "cannot bind empty shortcuts array";
    }
    if (error !== "") {
        throw new Error(`keyboard-shortcuts binding error: "${error}"`);
    } else {
        shortcutsArray.forEach(shortcut => {
            if (typeof shortcut.modifiers === "string") {
                shortcut.modifiers = [shortcut.modifiers];
            }
        });
    }
};

const isEnabled = bindingEnabled => {
    let enabled;
    switch (typeof bindingEnabled) {
        case "boolean":
            enabled = bindingEnabled;
            break;
        case "function":
            enabled = bindingEnabled();
            break;
        case "undefined":
        default:
            enabled = true;
            break;
    }
    return enabled;
};
const activateShortcut = (shortcut, event) => {
    if (shortcut && !shortcut.isDisabled?.()) {
        shortcut.callback?.();
        shortcut.preventDefault && event.preventDefault();
        shortcut.stopPropagation && event.stopPropagation();
    }
};

const getModifiersLength = shortcut => shortcut?.modifiers?.length || 0;

const getShortcut = (shortcuts, event) => {
    return shortcuts
        .filter(shortcut => event.keyCode === shortcut.key)
        .sort(
            (shortcut1, shortcut2) =>
                getModifiersLength(shortcut2) - getModifiersLength(shortcut1)
        )
        .find(shortcut => modifiersApplied(event, shortcut));
};

const shortcuts = {
    bind(el, binding) {
        const {shortcutsArray, bindingEnabled, stopPropagation} = binding.value;
        validateBinding(el, shortcutsArray);
        el.keydownCallback = event => {
            if (isEnabled(bindingEnabled)) {
                stopPropagation && event.stopPropagation();
                const shortcut = getShortcut(shortcutsArray, event);
                activateShortcut(shortcut, event);
            }
        };

        el.addEventListener("keydown", el.keydownCallback);
    },

    unbind(el) {
        el.removeEventListener("keydown", el.keydownCallback);
    }
};

export default shortcuts;
