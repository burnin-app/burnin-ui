<script lang="ts">
    import type { Snippet } from "svelte";
    import { getListContext } from "../../../context";
    import type { ListContextProps } from "../../../types";

    interface ItemProps {
        children: Snippet;
        id: string;
    }

    let { children, id }: ItemProps = $props();

    let context: ListContextProps = getListContext();

    function handleItemClick() {
        context.selected_id = id;
    }
</script>

<button
    class="item-wrapper"
    class:selected={context.selected_id === id}
    onclick={handleItemClick}
>
    {@render children()}
</button>

<style lang="scss">
    .item-wrapper {
        border: none;
        color: var(--text-color);
        width: 100%;
        height: 24px;
        /* border-radius: var(--border-radius); */
        display: flex;
        align-items: center;
        padding: 0px 10px;
        background-color: #333333;

        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        &:hover {
            background-color: #555;
        }
        &.selected {
            background-color: #4d4d4d;
        }
    }

    .item-wrapper:nth-child(odd) {
        background-color: #383838;
        &:hover {
            background-color: #555;
        }

        &.selected {
            background-color: #4d4d4d;
        }
    }
    /*
    .item-wrapper {
        width: 100%;
        height: 24px;

        display: flex;
        align-items: center;

        padding: 0 10px;
        box-sizing: border-box;

        border: none;
        background: #333333;
        color: var(--text-color);

        cursor: pointer;
    }

    .item-wrapper:nth-child(odd) {
        background: #383838;
    }

    .item-wrapper:hover {
        background: #555;
    }

    .item-wrapper.selected {
        background: #4d4d4d;
    } */
</style>
