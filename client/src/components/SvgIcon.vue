<template>
    <svg
        class="icon"
        :class="[iconClass, disabled ? 'disabled' : '']"
        @click="iconClicked"
    >
        <use :href="iconUrl" :xlink:href="iconUrl"></use>
    </svg>
</template>

<script>
    export default {
        name: "SvgIcon",
        props: {
            icon: {
                type: String,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            iconUrl: function() {
                return "#" + this.icon;
            },
            iconClass: function() {
                return `icon-${this.icon}`;
            }
        },
        methods: {
            iconClicked() {
                if (!this.disabled) {
                    this.$emit("click");
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    $disabled_color: grey;
    .icon {
        width: 16px;
        height: 16px;
        fill: black;
        cursor: pointer;
        &:hover {
            background-color: #e8f0fe;
            border: none;
            z-index: 1;
            &.disabled {
                background-color: inherit;
                border: none;
                border-radius: 4px;
                z-index: 1;
                fill: $disabled_color;
            }
        }
        &.disabled {
            cursor: default;
            fill: $disabled_color;
        }
    }
    .toolbar-icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
        fill: black;
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
            fill: black;
        }
        &:disabled,
        &[disabled] {
            box-shadow: none;
            background-color: inherit;
            cursor: inherit;
            fill: $disabled_color;
            &:hover {
                fill: $disabled_color;
            }
        }
    }
    .error-icon {
        fill: red;
        & > path {
            fill: white;
        }
        &:hover {
            fill: red;
        }
        &:disabled {
            box-shadow: none;
        }
    }
    .success-icon {
        fill: green;
        &:hover {
            fill: green;
        }
        &:disabled {
            box-shadow: none;
            fill: $disabled_color;
        }
    }
</style>
