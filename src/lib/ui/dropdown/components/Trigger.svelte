<script lang="ts">
    import { type Snippet, onMount, getContext } from "svelte";
    import { getMenuContext } from "../../../context";
    import { globalUIState } from "../../../globalState.svelte";

    interface TriggerProps {
        children: Snippet;
    }

    let contentElement = $state<HTMLDivElement | null>(null);
    let componentId = getContext<string>("componentId");

    let { children }: TriggerProps = $props();
    let context = getMenuContext();

    function handleClick(e: MouseEvent) {
        e.stopPropagation(); // Prevent bubbling to document
        openMenu();
    }

    function openMenu() {
        globalUIState.activeMenuId = componentId;
        globalUIState.isOpen = true;
    }

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
        globalUIState.menuPosition.x = e.clientX;
        globalUIState.menuPosition.y = e.clientY;
        openMenu();
    }

    onMount(() => {
        context.triggerElement = contentElement;
    });
</script>

<div class="trigger-wrapper" bind:this={contentElement}>
    <button class="trigger" onclick={handleClick} oncontextmenu={handleContextMenu}>
        {@render children()}
    </button>
</div>

<style>
    .trigger {
        background-color: transparent;
        border: none;
        width: 100%;
    }
</style>
