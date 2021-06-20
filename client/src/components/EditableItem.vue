<template>
    <div
        class="editable-container"
        @click="editItem"
        tabindex="0"
        :class="[{'text-container-editMode': isItemEditingEnabled}]"
    >
        <span class="text-span blue-edit" v-if="editMode === false">{{
            valueLocal
        }}</span>
        <div v-else class="editable-input-container">
            <input
                v-bind:ref="'input'"
                :maxlength="maxLength"
                v-model="valueLocal"
                v-focusout="saveValue"
                v-keyboard-shortcuts="{
                    shortcutsArray: getKeyboardShortcuts(),
                    bindingEnabled: () => this.editMode,
                    stopPropagation: true
                }"
                @paste.prevent
            />
        </div>
    </div>
</template>

<script>
    import focusout from "@/directives/focusout";
    import keyboardShortcuts from "@/directives/keyboardShortcuts";
    import keyboardKeys from "@/utils/consts/keyboardKeys.json";
    export default {
        name: "EditableItem",
        directives: {focusout, keyboardShortcuts},
        props: {
            value: {
                type: [String, Number],
                default: ""
            },
            maxLength: {
                type: Number,
                default: 3
            },
            allowEditing: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                editMode: false,
                valueLocal: this.value,
                commonKeyboardShortcuts: [
                    {
                        key: keyboardKeys.tab,
                        preventDefault: true,
                        stopPropagation: true,
                        callback: () => {
                            this.exitEditMode();
                        }
                    },
                    {
                        key: keyboardKeys.enter,
                        preventDefault: true,
                        stopPropagation: true,
                        callback: () => {
                            this.exitEditMode();
                        }
                    },
                    {
                        key: keyboardKeys.escape,
                        preventDefault: true,
                        stopPropagation: true,
                        callback: () => {
                            this.discardChange();
                        }
                    }
                ]
            };
        },
        watch: {
            value(newVal) {
                this.valueLocal = newVal;
            }
        },
        methods: {
            validateChar() {
                if (this.type === "number") {
                    this.valueLocal = this.valueLocal.replace(/[0-9]/);
                }
            },
            saveValue() {
                if (isNaN(this.valueLocal) || this.valueLocal < 0) {
                    this.valueLocal = this.value;
                } else {
                    this.$emit("valueChanged", Number(this.valueLocal));
                }
                this.editMode = false;
            },
            exitEditMode() {
                this.editMode = false;
            },
            discardChange() {
                this.editMode = false;
                this.valueLocal = this.value;
            },
            focusInput() {
                setTimeout(() => this.$refs["input"]?.focus(), 1);
            },
            editItem() {
                if (this.isItemEditingEnabled) {
                    this.editMode = true;
                    this.focusInput();
                }
            },
            getKeyboardShortcuts() {
                return [...this.commonKeyboardShortcuts];
            }
        },
        computed: {
            isItemEditingEnabled() {
                return this.allowEditing;
            }
        }
    };
</script>

<style scoped lang="scss">
    span,
    input,
    input:hover,
    input:focus {
        outline: none;
        padding: 0;
        font-family: inherit;
    }
    input {
        outline: none;
        border: 0 transparent;
        width: 100%;
        white-space: pre;
    }
    .editable-container {
        border-bottom: 1px solid transparent;
        width: 45px;
        height: 24px;
    }
    .editable-input-container {
        display: inline-flex;
        outline: none;
        background-color: transparent;
        border-bottom: 1px solid #0073ef;
        width: 100%;
    }

    .text-container-editMode .text-span {
        cursor: text;
    }
    .text-span:hover {
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    .blue-edit:hover {
        border-bottom-color: #0073e7;
    }
</style>
