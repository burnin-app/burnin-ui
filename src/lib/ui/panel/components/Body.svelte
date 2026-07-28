<script lang="ts">
    import type { Snippet } from "svelte";

    interface PanelProps {
        children: Snippet;
    }

    let { children }: PanelProps = $props();
</script>

<div class="panel-body">
    {@render children()}
</div>

<style lang="scss">
    .panel-body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 2px;
        box-sizing: border-box;
    }
</style>
