<script lang="ts">
    import {type Snippet, getContext, onDestroy, onMount, tick} from "svelte";
    import { globalUIState } from "../../../globalState.svelte";
    import { updateContextMenuPosition } from "../../../utils";

    interface RootProps{
      children: Snippet;
      style?: string;
      ondestory?: () => void;
      onupdate?: () => void;
    }

    let componentId = getContext<string>("componentId");

    let {children, style, ondestory, onupdate}: RootProps = $props();

    let contentElement = $state<HTMLDivElement | null>(null);

    function handleOutsideClick(e: MouseEvent) {
        if (contentElement && !contentElement.contains(e.target as Node)) {
            closeMenu();
        }
    }

    function closeMenu() {
        if (componentId === globalUIState.activeMenuId) {
            globalUIState.activeMenuId = null;
        }
    }

    function updatePosition(): (() => void) | undefined {
        if (!contentElement) return;
        return updateContextMenuPosition(globalUIState.menuPosition.x, globalUIState.menuPosition.y, contentElement);

    }

    let updatePositionFn = $state<(() => void) | undefined>(undefined);

    onMount(() => {
        if (globalUIState.activeMenuId === componentId && contentElement) {
            tick().then(() => {
                updatePositionFn = updatePosition();
            });

            document.addEventListener("click", handleOutsideClick);
            // document.addEventListener("keydown", handleKeyDown);

            return () => {
                ondestory?.();
                document.removeEventListener("click", handleOutsideClick);
                // document.removeEventListener("keydown", handleKeyDown);
            };
        }
    });

    onDestroy(() => {
        ondestory?.();
        document.removeEventListener("click", handleOutsideClick);
        // document.removeEventListener("keydown", handleKeyDown);
        updatePositionFn?.();
        updatePositionFn = undefined;
    });

    // Re-run whenever menu position changes
    $effect(() => {
        const activeMenuId = globalUIState.activeMenuId;
        const x = globalUIState.menuPosition.x;
        const y = globalUIState.menuPosition.y;

        if (activeMenuId !== componentId || !contentElement) {
            return;
        }
        onupdate?.();

        tick().then(() => {
            if (
                globalUIState.activeMenuId === componentId &&
                contentElement
            ) {
                updateContextMenuPosition(x, y, contentElement);
            }
        });
    });

</script>
<div class="menu-root" style={style} bind:this={contentElement}>
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
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        z-index: var(--menu-z-index);
        min-width: var(--menu-min-width);
        max-height: min(320px, calc(100vh - 16px));
            overflow-y: auto;
    }
</style>
