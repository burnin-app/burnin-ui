<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";
    import { getMenuContext } from "../../../context";

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

    function normalizeShortcut(shortcut: string) {
         return shortcut
             .toLowerCase()
             .split("-")
             .map(s => s.trim())
             .sort()
             .join("+");
     }

     function normalizeEvent(event: KeyboardEvent) {
         const parts: string[] = [];

         if (event.ctrlKey) parts.push("ctrl");
         if (event.metaKey) parts.push("meta");
         if (event.altKey) parts.push("alt");
         if (event.shiftKey) parts.push("shift");

         parts.push(event.key.toLowerCase());

         return parts.sort().join("+");
     }

     function handleKeyDown(event: KeyboardEvent) {
         if (!shortcut) return;

         if (normalizeEvent(event) === normalizeShortcut(shortcut)) {
             event.preventDefault();
             onClick();
         }
     }

     onMount(() => {
         document.addEventListener("keydown", handleKeyDown);
     });

     onDestroy(() => {
         document.removeEventListener("keydown", handleKeyDown);
     });
</script>

<div class="menu-item-wrapper">
    <button class="menu-item-btn" onclick={onClick}>
        <div class="menu-item-ctn">
            {@render children()}
        </div>
        {#if shortcut}
            <div class="menu-item-ctn shortcut">
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

    .shortcut{
        color:#777;
        font-size: 12px;
    }
</style>
