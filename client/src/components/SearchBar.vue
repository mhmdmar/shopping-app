<template>
    <div
        style="position:relative"
        ref="search-bar-container"
        tabindex="-1"
        v-focusout="onFocusOut"
    >
        <input
            class="form-control"
            type="search"
            v-model="searchQuery"
            @keydown.enter="enter"
            @keydown.down="down"
            @keydown.up="up"
            @input="change"
            @focus="change"
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
    import fuzzySearch from "fuzzysearch";
    import focusout from "@/directives/focusout";
    export default {
        name: "SearchBar",
        directives: {focusout},
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
                const searchQuery = this.searchQuery.toLowerCase();
                for (let i = 0, len = this.suggestions.length; i < len; i++) {
                    const curSuggestion = this.suggestions[i];
                    if (this.search(curSuggestion.toLowerCase(), searchQuery)) {
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
            search(word, source) {
                return fuzzySearch(source, word);
            },
            onFocusOut() {
                this.open = false;
            },
            enter() {
                if (this.autoCompleteEnabled && this.open) {
                    this.suggestionChosen();
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
