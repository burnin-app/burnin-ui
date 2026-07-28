<script lang="ts">
    import type { Snippet } from "svelte";

    interface PanelProps {
        children: Snippet;
    }

    let { children }: PanelProps = $props();
</script>

<div class="panel-footer">
    {@render children()}
</div>

<style lang="scss">
    .panel-body {
        flex: 0 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        padding: 16px 20px;
        border-top: 1px solid var(--border-color);
        box-sizing: border-box;
    }
</style>
