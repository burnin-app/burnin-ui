<script lang="ts">
    import type { Snippet } from "svelte";
    import { getMenuContext } from "$burnin_ui/context";

    export interface MenuItemProps {
        children: Snippet;
        onclick?: () => void;
        closeOnClick?: boolean;
        shortcut?: string;
    }

    let {
        children,
        onclick,
        shortcut,
        closeOnClick = true,
    }: MenuItemProps = $props();

    let context = getMenuContext();

    function onClick() {
        onclick?.();
        // close menu
        if (closeOnClick) {
            context.close?.();
        }
    }
</script>

<div class="menu-item-wrapper">
    <button class="menu-item-btn" onclick={onClick}>
        <div class="menu-item-ctn">
            {@render children()}
        </div>
        {#if shortcut}
            <div class="menu-item-ctn">
                {shortcut}
            </div>
        {/if}
    </button>
</div>

<style lang="scss">
    .menu-item-wrapper {
        display: flex;
        width: 100%;
    }
    .menu-item-btn {
        border: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: transparent;
        color: var(--text-color);
        height: var(--menu-item-height);
        padding: var(--menu-item-padding);

        &:hover {
            background-color: var(--tab-hover-bg);
        }
    }
</style>
