<script lang="ts">
    import type { Snippet } from "svelte";

    interface AppProps {
        children: Snippet;
    }

    let { children }: AppProps = $props();
</script>

<div class="status-bar-wrapper">
    {@render children()}
</div>

<style lang="scss">
    .status-bar-wrapper {
        background: var(--bg-color);
        flex: 0 0 30px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-top: 1px solid var(--border-color);

    }
</style>
