<script lang="ts">
    import type { Snippet } from "svelte";
    import { getListContext } from "../../../context";
    import type { ListContextProps } from "../../../types";

    interface ItemProps {
        children: Snippet;
        id: string;
        classStyle?: string;
    }

    let { children, id , classStyle = ""}: ItemProps = $props();

    let context: ListContextProps = getListContext();

    function handleItemClick() {
        context.selected_id = id;
    }
</script>

<button
    class="item-wrapper"
    style={classStyle}
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
        background-color: var(--list-bg-color);

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        &:hover {
            background-color: var(--list-bg-hover);
        }
        &.selected {
            background-color: var(--list-bg-selected);
        }
    }

    .item-wrapper:nth-child(odd) {
        background-color: var(--list-nth-bg-color);
        &:hover {
            background-color: var(--list-nth-bg-hover);
        }

        &.selected {
            background-color: var(--list-bg-selected);
        }
    }

</style>
