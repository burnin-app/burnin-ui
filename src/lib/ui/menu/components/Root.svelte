<script lang="ts">
    import { getMenuContext } from "../../../context";
    import { globalUIState } from "../../../globalState.svelte";
    import { onDestroy, onMount, type Snippet } from "svelte";
    import { tick } from "svelte";
    import { updateMenuPosition } from "../../../utils";

    interface MenuProps {
        children: Snippet;
        matchTriggerWidth?: boolean;
    }

    let { children, matchTriggerWidth = false }: MenuProps = $props();
    let context = getMenuContext();
    let contentElement = $state<HTMLDivElement | null>(null);

    function closeMenu() {
        if (context.id === globalUIState.activeMenuId) {
            globalUIState.activeMenuId = null;
            context.isOpen = false;
        }
    }

    function handleOutsideClick(e: MouseEvent) {
        if (contentElement && !contentElement.contains(e.target as Node)) {
            closeMenu();
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            closeMenu();
        }
    }


    function updatePosition(): (() => void) | undefined {
        if (context.triggerElement && contentElement) {
            return updateMenuPosition(context.triggerElement, contentElement, {matchTriggerWidth});
        }
    }

    let updatePositionFn = $state<(() => void) | undefined>(undefined);

    onMount(() => {
        if (context.isOpen && contentElement) {
            tick().then(() => {
                updatePositionFn = updatePosition();
            });

            document.addEventListener("click", handleOutsideClick);
            document.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("click", handleOutsideClick);
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    });

    onDestroy(() => {
        document.removeEventListener("click", handleOutsideClick);
        document.removeEventListener("keydown", handleKeyDown);
        updatePositionFn?.();
        updatePositionFn = undefined;
    });
</script>

<div class="menu-root" bind:this={contentElement}>
    {@render children()}
</div>

<style lang="scss">
    .menu-root {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        position: absolute;
        width: max-content;
        top: 0;
        left: 0;
        width: var(--menu-min-width);
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        z-index: var(--menu-z-index);
        min-width: var(--menu-min-width);
        max-height: min(320px, calc(100vh - 16px));
            overflow-y: auto;
    }
</style>
