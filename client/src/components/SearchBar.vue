<template>
    <div style="position:relative" ref="search-bar-container">
        <input
            class="form-control"
            type="search"
            v-model="searchQuery"
            @keydown.enter="enter"
            @keydown.down="down"
            @keydown.up="up"
            @input="change"
            @focus="change"
            @blur="onBlur($event)"
        />
        <ul
            v-if="autoCompleteEnabled"
            class="dropdown-menu"
            v-bind:class="{closed: !openSuggestion}"
        >
            <li
                class="suggestion-item"
                v-for="(suggestion, index) in matches"
                :key="index"
                :ref="isActive(index) ? 'selected-item' : ''"
                v-bind:class="{active: isActive(index)}"
                @click="suggestionClick(index)"
            >
                <span>{{ suggestion.text }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        props: {
            autoCompleteEnabled: {
                type: Boolean,
                default: true
            },
            suggestions: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                searchQuery: "",
                open: false,
                current: 0
            };
        },
        computed: {
            matches() {
                const filteredMatches = [];
                for (let i = 0, len = this.suggestions.length; i < len; i++) {
                    const curSuggestion = this.suggestions[i];
                    if (
                        curSuggestion
                            .toLowerCase()
                            .indexOf(this.searchQuery.toLowerCase()) >= 0
                    ) {
                        filteredMatches.push({
                            text: curSuggestion,
                            index: i
                        });
                    }
                }
                return filteredMatches;
            },
            openSuggestion() {
                return (
                    this.searchQuery !== "" &&
                    this.matches.length !== 0 &&
                    this.open === true
                );
            }
        },
        methods: {
            onBlur() {
                // TODO remove setTimeout and handle closing the list in a better
                setTimeout(() => {
                    this.open = false;
                }, 100);
            },
            enter() {
                if (this.autoCompleteEnabled && this.open) {
                    this.suggestionChosen();
                } else {
                    // TODO implement searchClicked listener
                    this.$emit("searchClicked", this.searchQuery);
                }
            },
            suggestionChosen(index = this.current) {
                if (this.autoCompleteEnabled) {
                    this.open = false;
                    const selectedItem = this.matches[index];
                    this.$emit("suggestionChosen", selectedItem.index);
                }
            },
            scrollIntoView() {
                this.$nextTick(() => {
                    const el = this.$refs["selected-item"]?.[0]; // get first active element
                    if (el) {
                        el?.scrollIntoViewIfNeeded(false);
                    }
                });
            },
            up() {
                if (this.autoCompleteEnabled && this.current > 0) {
                    this.current--;
                    this.scrollIntoView();
                }
            },

            down() {
                if (
                    this.autoCompleteEnabled &&
                    this.current < this.matches.length - 1
                ) {
                    this.current++;
                    this.scrollIntoView();
                }
            },
            isActive(index) {
                return index === this.current;
            },
            change() {
                if (this.autoCompleteEnabled) {
                    if (this.open === false) {
                        if (this.matches.length > 0) {
                            this.open = true;
                            this.current = 0;
                        }
                    } else if (this.matches.length === 0 && this.open) {
                        this.open = false;
                    }
                }
            },
            suggestionClick(index) {
                this.suggestionChosen(index);
            }
        }
    };
</script>

<style scoped>
    .dropdown-menu {
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 200px;
        width: 100%;
        gap: 3px;
    }
    .closed {
        display: none;
    }
    .active {
        background-color: #4caf50;
    }
    .suggestion-item {
        color: dodgerblue;
        cursor: pointer;
    }
</style>
