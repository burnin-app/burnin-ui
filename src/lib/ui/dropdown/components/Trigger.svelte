<script lang="ts">
    import { type Snippet, onMount } from "svelte";
    import { getMenuContext } from "../../../context";
    import { globalUIState } from "../../../globalState.svelte";

    interface TriggerProps {
        children: Snippet;
    }

    let contentElement = $state<HTMLDivElement | null>(null);

    let { children }: TriggerProps = $props();
    let context = getMenuContext();

    function handleClick(e: MouseEvent) {
        e.stopPropagation(); // Prevent bubbling to document
        globalUIState.activeMenuId = context.id;
        context.isOpen = true;
    }

    onMount(() => {
        context.triggerElement = contentElement;
    });
</script>

<div class="trigger-wrapper" bind:this={contentElement}>
    <button class="trigger" onclick={handleClick}>
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
