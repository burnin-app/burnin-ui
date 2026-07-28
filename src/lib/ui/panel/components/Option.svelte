<script lang="ts">
    import type { Snippet } from "svelte";
    import { getPanelContext, type PanelContextProps } from "../context";

    interface PanelProps {
        children: Snippet;
        id: string;
        onclick?: (() => void) | undefined;
    }

    let { children, id , onclick}: PanelProps = $props();

    let context: PanelContextProps = getPanelContext();

    function handleItemClick() {
        context.selected_id = id;
        onclick?.();
    }
</script>

<button class="panel-option"
    onclick={handleItemClick}
    class:selected={context.selected_id === id}
>
    {@render children()}
</button>

<style lang="scss">
    .panel-option {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: var(--border-radius);
        user-select: none;
        transition: background-color .15s;
        height: 24px;
        padding: 0 10px;
        border: none;
        background-color: var(--list-bg-color);
        color: var(--text-color);


        &:hover{
            background-color: var(--list-bg-hover);
        }

        &.selected {
            background-color: var(--list-bg-selected);
        }
    }
</style>
