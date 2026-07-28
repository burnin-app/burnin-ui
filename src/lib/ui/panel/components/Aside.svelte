<script lang="ts">
    import type { Snippet } from "svelte";

    interface PanelProps {
        children: Snippet;
    }

    let { children }: PanelProps = $props();
</script>

<div class="aside-wrapper">
    {@render children()}
</div>

<style lang="scss">
    .aside-wrapper {
        flex: 0 0 220px;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        border-right: 1px solid var(--border-color);
        padding: 10px;
        box-sizing: border-box;
    }
</style>
