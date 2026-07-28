<script lang="ts">
    import type { Snippet } from "svelte";
    import { getPanelContext, type PanelContextProps } from "../context";

    interface PanelProps {
        children: Snippet;
        id: string;
    }

    let { children , id}: PanelProps = $props();

    let context: PanelContextProps = getPanelContext();
</script>

{#if context.selected_id === id}
<div class="panel-content">
    {@render children()}
</div>
{/if}

<style lang="scss">
    .panel-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
    }
</style>
